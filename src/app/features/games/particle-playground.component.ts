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
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'normal' | 'fire' | 'sparkle' | 'nebula' | 'cosmic';
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  gravity: number;
  friction: number;
  hue: number;
  saturation: number;
  brightness: number;
}

export interface MousePoint {
  x: number;
  y: number;
  strength: number;
  timestamp: number;
}

@Component({
  selector: 'app-particle-playground',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './particle-playground.component.html',
  styleUrls: ['./particle-playground.component.scss'],
})
export class ParticlePlaygroundComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('particleCanvas', { static: false })
  particleCanvas!: ElementRef<HTMLCanvasElement>;

  isActive = false;
  isRunning = true;
  particleCount = 150;
  maxParticles = 500;
  mouseInteraction = true;
  autoSpawn = true;
  gravityEnabled = true;
  colorMode: 'rainbow' | 'fire' | 'ocean' | 'cosmic' | 'custom' = 'rainbow';
  particleType: 'normal' | 'fire' | 'sparkle' | 'nebula' | 'cosmic' = 'normal';
  speed = 1;
  size = 1;

  // Canvas properties
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private destroy$ = new Subject<void>();

  // Game state
  particles: Particle[] = [];
  mousePoints: MousePoint[] = [];
  mouseX = 0;
  mouseY = 0;
  isMouseDown = false;

  // Performance
  private lastTime = 0;
  private fps = 60;
  private frameInterval = 1000 / this.fps;

  // Color palettes
  private colorPalettes = {
    rainbow: [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEAA7',
      '#DDA0DD',
      '#98D8C8',
    ],
    fire: [
      '#FF4500',
      '#FF6347',
      '#FF7F50',
      '#FF8C00',
      '#FFA500',
      '#FFD700',
      '#FFFF00',
    ],
    ocean: [
      '#1E90FF',
      '#00BFFF',
      '#87CEEB',
      '#4682B4',
      '#4169E1',
      '#0000CD',
      '#000080',
    ],
    cosmic: [
      '#8A2BE2',
      '#9370DB',
      '#BA55D3',
      '#DA70D6',
      '#FF69B4',
      '#FF1493',
      '#C71585',
    ],
    custom: [
      '#00DC82',
      '#3B82F6',
      '#8B5CF6',
      '#EC4899',
      '#F97316',
      '#06B6D4',
      '#10B981',
    ],
  };

  constructor(
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 4;
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCanvas();
      this.initializeParticles();
      this.startAnimation();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAnimation();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeCanvas();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.mouseInteraction) return;

    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;

    if (this.isMouseDown) {
      this.addMousePoint(this.mouseX, this.mouseY, 1);
      this.spawnParticlesAtMouse(5);
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.mouseInteraction) return;

    this.isMouseDown = true;
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
    this.addMousePoint(this.mouseX, this.mouseY, 1);
    this.spawnParticlesAtMouse(10);
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isMouseDown = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.mouseInteraction) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.createExplosion(x, y, 20);
  }

  private initializeCanvas(): void {
    this.canvas = this.particleCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }
  }

  private initializeParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.spawnParticle();
    }
  }

  private spawnParticle(x?: number, y?: number): void {
    if (this.particles.length >= this.maxParticles) return;

    const colors = this.colorPalettes[this.colorMode];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const particle: Particle = {
      id: `particle-${Date.now()}-${Math.random()}`,
      x: x ?? Math.random() * this.canvas.width,
      y: y ?? Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 4 * this.speed,
      vy: (Math.random() - 0.5) * 4 * this.speed,
      size: (Math.random() * 3 + 1) * this.size,
      life: 1,
      maxLife: Math.random() * 0.5 + 0.5,
      color,
      type: this.particleType,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      gravity: this.gravityEnabled ? 0.1 : 0,
      friction: 0.98,
      hue: Math.random() * 360,
      saturation: Math.random() * 50 + 50,
      brightness: Math.random() * 30 + 70,
    };

    this.particles.push(particle);
  }

  private spawnParticlesAtMouse(count: number): void {
    for (let i = 0; i < count; i++) {
      this.spawnParticle(this.mouseX, this.mouseY);
    }
  }

  private createExplosion(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = Math.random() * 5 + 2;

      const particle: Particle = {
        id: `explosion-${Date.now()}-${i}`,
        x,
        y,
        vx: Math.cos(angle) * velocity * this.speed,
        vy: Math.sin(angle) * velocity * this.speed,
        size: (Math.random() * 4 + 2) * this.size,
        life: 1,
        maxLife: Math.random() * 0.3 + 0.7,
        color:
          this.colorPalettes[this.colorMode][
            Math.floor(
              Math.random() * this.colorPalettes[this.colorMode].length
            )
          ],
        type: 'sparkle',
        opacity: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        gravity: this.gravityEnabled ? 0.05 : 0,
        friction: 0.95,
        hue: Math.random() * 360,
        saturation: Math.random() * 50 + 50,
        brightness: Math.random() * 30 + 70,
      };

      this.particles.push(particle);
    }
  }

  private addMousePoint(x: number, y: number, strength: number): void {
    this.mousePoints.push({
      x,
      y,
      strength,
      timestamp: Date.now(),
    });

    // Keep only recent mouse points
    if (this.mousePoints.length > 50) {
      this.mousePoints.shift();
    }
  }

  private startAnimation(): void {
    if (this.animationId) return;
    this.gameLoop();
  }

  private stopAnimation(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
  }

  private gameLoop(): void {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    if (deltaTime >= this.frameInterval) {
      this.update(deltaTime);
      this.render();
      this.lastTime = currentTime;
    }

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(deltaTime: number): void {
    // Update particles
    this.particles = this.particles.filter((particle) => {
      // Update life
      particle.life -= deltaTime * 0.001;
      if (particle.life <= 0) return false;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply gravity
      particle.vy += particle.gravity;

      // Apply friction
      particle.vx *= particle.friction;
      particle.vy *= particle.friction;

      // Update rotation
      particle.rotation += particle.rotationSpeed;

      // Bounce off walls
      if (
        particle.x <= particle.size ||
        particle.x >= this.canvas.width - particle.size
      ) {
        particle.vx *= -0.8;
        particle.x = Math.max(
          particle.size,
          Math.min(this.canvas.width - particle.size, particle.x)
        );
      }
      if (
        particle.y <= particle.size ||
        particle.y >= this.canvas.height - particle.size
      ) {
        particle.vy *= -0.8;
        particle.y = Math.max(
          particle.size,
          Math.min(this.canvas.height - particle.size, particle.y)
        );
      }

      // Mouse interaction
      if (this.mouseInteraction && this.isMouseDown) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }
      }

      return true;
    });

    // Auto spawn particles
    if (this.autoSpawn && this.particles.length < this.particleCount) {
      this.spawnParticle();
    }

    // Clean up old mouse points
    this.mousePoints = this.mousePoints.filter(
      (point) => Date.now() - point.timestamp < 1000
    );
  }

  private render(): void {
    // Clear canvas with fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    this.particles.forEach((particle) => {
      this.drawParticle(particle);
    });

    // Draw mouse trail
    if (this.mouseInteraction) {
      this.drawMouseTrail();
    }
  }

  private drawParticle(particle: Particle): void {
    const alpha = (particle.life / particle.maxLife) * particle.opacity;

    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);

    switch (particle.type) {
      case 'normal':
        this.drawNormalParticle(particle);
        break;
      case 'fire':
        this.drawFireParticle(particle);
        break;
      case 'sparkle':
        this.drawSparkleParticle(particle);
        break;
      case 'nebula':
        this.drawNebulaParticle(particle);
        break;
      case 'cosmic':
        this.drawCosmicParticle(particle);
        break;
    }

    this.ctx.restore();
  }

  private drawNormalParticle(particle: Particle): void {
    // Create gradient
    const gradient = this.ctx.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      particle.size
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(1, 'transparent');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawFireParticle(particle: Particle): void {
    // Fire effect with multiple layers
    const layers = 3;
    for (let i = 0; i < layers; i++) {
      const size = particle.size * (1 - i * 0.3);
      const alpha = (1 - i * 0.3) * (particle.life / particle.maxLife);

      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = `hsl(${particle.hue + i * 20}, ${
        particle.saturation
      }%, ${particle.brightness}%)`;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawSparkleParticle(particle: Particle): void {
    // Sparkle effect
    this.ctx.strokeStyle = particle.color;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI * 2 * i) / 4;
      const x1 = Math.cos(angle) * particle.size;
      const y1 = Math.sin(angle) * particle.size;
      const x2 = Math.cos(angle) * (particle.size * 0.3);
      const y2 = Math.sin(angle) * (particle.size * 0.3);

      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }

    // Center dot
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.size * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private drawNebulaParticle(particle: Particle): void {
    // Nebula effect with multiple circles
    const circles = 5;
    for (let i = 0; i < circles; i++) {
      const size = particle.size * (0.5 + i * 0.3);
      const alpha = (1 - i * 0.2) * (particle.life / particle.maxLife) * 0.3;

      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = `hsla(${particle.hue + i * 30}, ${
        particle.saturation
      }%, ${particle.brightness}%, 0.5)`;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawCosmicParticle(particle: Particle): void {
    // Cosmic effect with stars and trails
    const time = Date.now() * 0.001;
    const pulse = Math.sin(time * 3 + particle.id.length) * 0.3 + 0.7;

    // Main particle
    this.ctx.fillStyle = `hsla(${particle.hue}, ${particle.saturation}%, ${particle.brightness}%, ${pulse})`;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, particle.size * pulse, 0, Math.PI * 2);
    this.ctx.fill();

    // Orbiting particles
    for (let i = 0; i < 3; i++) {
      const angle = time * 2 + (Math.PI * 2 * i) / 3;
      const orbitRadius = particle.size * 1.5;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;

      this.ctx.fillStyle = `hsla(${particle.hue + 120}, ${
        particle.saturation
      }%, ${particle.brightness}%, 0.6)`;
      this.ctx.beginPath();
      this.ctx.arc(x, y, particle.size * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawMouseTrail(): void {
    if (this.mousePoints.length < 2) return;

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(this.mousePoints[0].x, this.mousePoints[0].y);

    for (let i = 1; i < this.mousePoints.length; i++) {
      const point = this.mousePoints[i];
      const alpha = 1 - i / this.mousePoints.length;
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.stroke();
  }

  // Public methods for UI controls
  toggleAnimation(): void {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  clearParticles(): void {
    this.particles = [];
    this.mousePoints = [];
  }

  createRandomExplosion(): void {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    this.createExplosion(x, y, 30);
  }

  setParticleCount(count: number): void {
    this.particleCount = Math.max(10, Math.min(1000, count));
  }

  setSpeed(speed: number): void {
    this.speed = Math.max(0.1, Math.min(5, speed));
  }

  setSize(size: number): void {
    this.size = Math.max(0.1, Math.min(3, size));
  }

  setColorMode(mode: 'rainbow' | 'fire' | 'ocean' | 'cosmic' | 'custom'): void {
    this.colorMode = mode;
  }

  setParticleType(
    type: 'normal' | 'fire' | 'sparkle' | 'nebula' | 'cosmic'
  ): void {
    this.particleType = type;
  }

  toggleGravity(): void {
    this.gravityEnabled = !this.gravityEnabled;
  }

  toggleAutoSpawn(): void {
    this.autoSpawn = !this.autoSpawn;
  }

  toggleMouseInteraction(): void {
    this.mouseInteraction = !this.mouseInteraction;
  }

  getParticleStats(): {
    total: number;
    alive: number;
    types: Record<string, number>;
  } {
    const types = this.particles.reduce((acc, particle) => {
      acc[particle.type] = (acc[particle.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.particles.length,
      alive: this.particles.filter((p) => p.life > 0).length,
      types,
    };
  }
}
