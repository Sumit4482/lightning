import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';

export interface DrawingPoint {
  x: number;
  y: number;
  color: string;
  brushSize: number;
  userId: string;
  timestamp: number;
}

export interface DrawingStroke {
  points: DrawingPoint[];
  color: string;
  brushSize: number;
  userId: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  color: string;
  isDrawing: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private socket: Socket | null = null;
  private currentUser: User | null = null;

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  private drawingStrokesSubject = new BehaviorSubject<DrawingStroke[]>([]);
  public drawingStrokes$: Observable<DrawingStroke[]> =
    this.drawingStrokesSubject.asObservable();

  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  public isConnected$: Observable<boolean> =
    this.isConnectedSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  connect(userName: string, userColor: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Connect to the real WebSocket server
    const serverUrl = 'https://portfolio-production-5aea.up.railway.app'; // Railway deployment
    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to drawing server');
      this.isConnectedSubject.next(true);

      // Join the drawing room
      this.socket?.emit('join-room', {
        name: userName,
        color: userColor,
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from drawing server');
      this.isConnectedSubject.next(false);
    });

    this.socket.on('current-user', (user: User) => {
      this.currentUser = user;
    });

    this.socket.on('user-joined', (user: User) => {
      const currentUsers = this.usersSubject.value;
      if (!currentUsers.find((u) => u.id === user.id)) {
        this.usersSubject.next([...currentUsers, user]);
      }
    });

    this.socket.on('user-left', (userId: string) => {
      const currentUsers = this.usersSubject.value;
      this.usersSubject.next(currentUsers.filter((u) => u.id !== userId));
    });

    this.socket.on('users-update', (users: User[]) => {
      this.usersSubject.next(users);
    });

    this.socket.on('drawing-stroke', (stroke: DrawingStroke) => {
      const currentStrokes = this.drawingStrokesSubject.value;
      this.drawingStrokesSubject.next([...currentStrokes, stroke]);
    });

    this.socket.on('drawing-strokes', (strokes: DrawingStroke[]) => {
      this.drawingStrokesSubject.next(strokes);
    });

    this.socket.on('canvas-clear', () => {
      this.drawingStrokesSubject.next([]);
    });

    this.socket.on(
      'user-status-update',
      (update: { userId: string; isDrawing: boolean }) => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map((user) =>
          user.id === update.userId
            ? { ...user, isDrawing: update.isDrawing }
            : user
        );
        this.usersSubject.next(updatedUsers);
      }
    );

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnectedSubject.next(false);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.isConnectedSubject.next(false);
    this.usersSubject.next([]);
    this.drawingStrokesSubject.next([]);
    this.currentUser = null;
  }

  sendDrawingStroke(stroke: DrawingStroke): void {
    if (this.socket && this.isConnectedSubject.value) {
      this.socket.emit('drawing-stroke', stroke);
    }
  }

  clearCanvas(): void {
    if (this.socket && this.isConnectedSubject.value) {
      this.socket.emit('clear-canvas');
      this.drawingStrokesSubject.next([]);
    }
  }

  updateUserStatus(isDrawing: boolean): void {
    if (this.socket && this.isConnectedSubject.value) {
      this.socket.emit('user-status', { isDrawing });
    }
  }

  get currentUsers(): User[] {
    return this.usersSubject.value;
  }

  get currentDrawingStrokes(): DrawingStroke[] {
    return this.drawingStrokesSubject.value;
  }

  get isConnected(): boolean {
    return this.isConnectedSubject.value;
  }

  get user(): User | null {
    return this.currentUser;
  }
}
