import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../core/services/navigation.service';
import {
  DrawingService,
  DrawingPoint,
  DrawingStroke,
} from '../../core/services/drawing.service';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-drawing-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.scss'],
})
export class DrawingBoardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('drawingCanvas', { static: false })
  drawingCanvas!: ElementRef<HTMLCanvasElement>;

  isActive = false;
  isConnected = false;
  isConnecting = false;
  isDrawing = false;
  hasDrawn = false;

  // Drawing properties
  brushSize = 5;
  selectedColor = '#00dc82';
  userColor = '#00dc82';
  userName = '';

  // Canvas properties
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private currentStroke: DrawingPoint[] = [];

  // Color palette
  colors = [
    '#00dc82',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f97316',
    '#06b6d4',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#6366f1',
    '#84cc16',
    '#000000',
  ];

  // Users
  currentUsers: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private drawingService: DrawingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 4; // Drawing board is section 4
    });

    this.drawingService.isConnected$
      .pipe(takeUntil(this.destroy$))
      .subscribe((connected) => {
        this.isConnected = connected;
        this.isConnecting = false;
      });

    this.drawingService.users$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.currentUsers = users;
      });

    this.drawingService.drawingStrokes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((strokes) => {
        this.redrawCanvas(strokes);
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCanvas();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.drawingService.disconnect();
  }

  private initializeCanvas(): void {
    this.canvas = this.drawingCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    // Set canvas size
    this.resizeCanvas();

    // Set initial canvas properties
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.lineWidth = this.brushSize;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeCanvas();
      this.redrawCanvas(this.drawingService.currentDrawingStrokes);
    }
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;

    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }
  }

  private getMousePos(event: MouseEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private getTouchPos(event: TouchEvent): { x: number; y: number } {
    const rect = this.canvas.getBoundingClientRect();
    const touch = event.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  startDrawing(event: MouseEvent): void {
    if (!this.isConnected) return;

    this.isDrawing = true;
    this.hasDrawn = true;
    this.currentStroke = [];

    const pos = this.getMousePos(event);
    this.addPoint(pos.x, pos.y);

    this.drawingService.updateUserStatus(true);
  }

  draw(event: MouseEvent): void {
    if (!this.isDrawing || !this.isConnected) return;

    const pos = this.getMousePos(event);
    this.addPoint(pos.x, pos.y);
  }

  stopDrawing(): void {
    if (!this.isDrawing) return;

    this.isDrawing = false;

    if (this.currentStroke.length > 0) {
      const stroke: DrawingStroke = {
        points: [...this.currentStroke],
        color: this.selectedColor,
        brushSize: this.brushSize,
        userId: this.drawingService.user?.id || '',
        timestamp: Date.now(),
      };

      this.drawingService.sendDrawingStroke(stroke);
      this.currentStroke = [];
    }

    this.drawingService.updateUserStatus(false);
  }

  startDrawingTouch(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isConnected) return;

    this.isDrawing = true;
    this.hasDrawn = true;
    this.currentStroke = [];

    const pos = this.getTouchPos(event);
    this.addPoint(pos.x, pos.y);

    this.drawingService.updateUserStatus(true);
  }

  drawTouch(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isDrawing || !this.isConnected) return;

    const pos = this.getTouchPos(event);
    this.addPoint(pos.x, pos.y);
  }

  private addPoint(x: number, y: number): void {
    const point: DrawingPoint = {
      x,
      y,
      color: this.selectedColor,
      brushSize: this.brushSize,
      userId: this.drawingService.user?.id || '',
      timestamp: Date.now(),
    };

    this.currentStroke.push(point);
    this.drawPoint(point);
  }

  private drawPoint(point: DrawingPoint): void {
    if (!this.ctx) return;

    this.ctx.strokeStyle = point.color;
    this.ctx.lineWidth = point.brushSize;

    if (this.currentStroke.length === 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(point.x, point.y);
    } else {
      const prevPoint = this.currentStroke[this.currentStroke.length - 2];
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    }
  }

  private redrawCanvas(strokes: DrawingStroke[]): void {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    strokes.forEach((stroke) => {
      if (stroke.points.length === 0) return;

      this.ctx.strokeStyle = stroke.color;
      this.ctx.lineWidth = stroke.brushSize;
      this.ctx.beginPath();

      const firstPoint = stroke.points[0];
      this.ctx.moveTo(firstPoint.x, firstPoint.y);

      stroke.points.slice(1).forEach((point) => {
        this.ctx.lineTo(point.x, point.y);
      });

      this.ctx.stroke();
    });
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    if (this.ctx) {
      this.ctx.strokeStyle = color;
    }
  }

  selectUserColor(color: string): void {
    this.userColor = color;
  }

  connectToDrawing(): void {
    if (!this.userName.trim()) return;

    this.isConnecting = true;
    this.drawingService.connect(this.userName.trim(), this.userColor);
  }

  clearCanvas(): void {
    this.drawingService.clearCanvas();
    this.hasDrawn = false;
  }

  downloadCanvas(): void {
    if (!isPlatformBrowser(this.platformId) || !this.canvas) return;

    const link = document.createElement('a');
    link.download = `drawing-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}
