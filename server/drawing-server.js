const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // In production, specify your domain
    methods: ["GET", "POST"],
  },
});

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files (optional - for deployment)
app.use(express.static(path.join(__dirname, "../dist/lightning")));

// Store active users and drawing data
const activeUsers = new Map();
const drawingStrokes = [];

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining
  socket.on("join-room", (userData) => {
    const user = {
      id: socket.id,
      name: userData.name,
      color: userData.color,
      isDrawing: false,
    };

    activeUsers.set(socket.id, user);

    // Send current user info back
    socket.emit("current-user", user);

    // Broadcast user joined to all clients
    socket.broadcast.emit("user-joined", user);

    // Send current users list to new user
    socket.emit("users-update", Array.from(activeUsers.values()));

    // Send existing drawing strokes to new user
    socket.emit("drawing-strokes", drawingStrokes);

    console.log(`User ${user.name} joined the drawing room`);
  });

  // Handle drawing strokes
  socket.on("drawing-stroke", (stroke) => {
    // Add stroke to storage
    drawingStrokes.push(stroke);

    // Broadcast to all other clients
    socket.broadcast.emit("drawing-stroke", stroke);

    console.log(`Drawing stroke from ${stroke.userId}`);
  });

  // Handle canvas clear
  socket.on("clear-canvas", () => {
    // Clear all strokes
    drawingStrokes.length = 0;

    // Broadcast clear to all clients
    io.emit("canvas-clear");

    console.log("Canvas cleared by user");
  });

  // Handle user status updates
  socket.on("user-status", (status) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      user.isDrawing = status.isDrawing;

      // Broadcast status update to all clients
      socket.broadcast.emit("user-status-update", {
        userId: socket.id,
        isDrawing: status.isDrawing,
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      console.log(`User ${user.name} disconnected`);
      activeUsers.delete(socket.id);

      // Broadcast user left to all clients
      socket.broadcast.emit("user-left", socket.id);

      // Send updated users list
      io.emit("users-update", Array.from(activeUsers.values()));
    }
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// API endpoints for health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    users: activeUsers.size,
    strokes: drawingStrokes.length,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/users", (req, res) => {
  res.json(Array.from(activeUsers.values()));
});

// Serve Angular app for all other routes (for deployment)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/lightning/index.html"));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Drawing server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready for connections`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});
