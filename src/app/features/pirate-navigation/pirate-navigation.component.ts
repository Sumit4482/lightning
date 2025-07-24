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

export interface Island {
  id: number;
  name: string;
  description: string;
  x: number;
  y: number;
  size: number;
  isActive: boolean;
  isVisited: boolean;
  color: string;
  icon: string;
  type: 'start' | 'main' | 'special';
}

export interface Ship {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  angle: number;
  speed: number;
  isMoving: boolean;
}

export interface WaveParticle {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  opacity: number;
  speed: number;
}

export interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  opacity: number;
}

@Component({
  selector: 'app-pirate-navigation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pirate-navigation.component.html',
  styleUrls: ['./pirate-navigation.component.scss'],
})
export class PirateNavigationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('oceanCanvas', { static: false })
  oceanCanvas!: ElementRef<HTMLCanvasElement>;

  isActive = false;
  currentSection = 0;
  isNavigating = false;

  // Canvas properties
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private destroy$ = new Subject<void>();

  // Game objects
  ship: Ship = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    angle: 0,
    speed: 3,
    isMoving: false,
  };

  islands: Island[] = [
    {
      id: 0,
      name: 'Dawn Island',
      description: 'Where the adventure begins',
      x: 150,
      y: 300,
      size: 80,
      isActive: true,
      isVisited: true,
      color: '#8FBC8F',
      icon: '🏡',
      type: 'start',
    },
    {
      id: 1,
      name: 'Shell Town',
      description: 'Marine Base & Origins',
      x: 350,
      y: 200,
      size: 90,
      isActive: false,
      isVisited: false,
      color: '#DEB887',
      icon: '👤',
      type: 'main',
    },
    {
      id: 2,
      name: 'Baratie',
      description: 'The Floating Restaurant',
      x: 550,
      y: 350,
      size: 100,
      isActive: false,
      isVisited: false,
      color: '#CD853F',
      icon: '⚔️',
      type: 'main',
    },
    {
      id: 3,
      name: 'Arlong Park',
      description: 'Contact & Communications',
      x: 750,
      y: 250,
      size: 85,
      isActive: false,
      isVisited: false,
      color: '#4682B4',
      icon: '📧',
      type: 'main',
    },
  ];

  waves: WaveParticle[] = [];
  clouds: Cloud[] = [];

  // Animation properties
  private lastTime = 0;
  private waveTime = 0;
  private cloudTime = 0;

  constructor(
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 4; // Pirate Navigation is section 4
      if (this.isActive) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    });

    this.navigationService.currentSection$.subscribe((section) => {
      if (section !== this.currentSection && section < this.islands.length) {
        this.navigateToIsland(section);
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCanvas();
      this.initializeGameObjects();
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
      this.repositionIslands();
    }
  }

  @HostListener('click', ['$event'])
  onCanvasClick(event: MouseEvent): void {
    if (!this.canvas || this.isNavigating) return;

    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Check if clicked on an island
    this.islands.forEach((island) => {
      const distance = Math.sqrt(
        (clickX - island.x) ** 2 + (clickY - island.y) ** 2
      );
      if (distance < island.size / 2) {
        this.sailToIsland(island.id);
      }
    });
  }

  private initializeCanvas(): void {
    this.canvas = this.oceanCanvas.nativeElement;
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

  private initializeGameObjects(): void {
    // Position ship at first island
    const startIsland = this.islands[0];
    this.ship.x = startIsland.x;
    this.ship.y = startIsland.y + 30;

    // Initialize waves
    this.createWaves();

    // Initialize clouds
    this.createClouds();

    // Reposition islands based on canvas size
    this.repositionIslands();
  }

  private repositionIslands(): void {
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    // Distribute islands across the canvas
    this.islands.forEach((island, index) => {
      const progress = index / (this.islands.length - 1);
      island.x = 100 + (canvasWidth - 200) * progress;
      island.y = canvasHeight / 2 + Math.sin(progress * Math.PI * 2) * 100;
    });

    // Update ship position if not moving
    if (!this.ship.isMoving) {
      const currentIsland = this.islands[this.currentSection];
      this.ship.x = currentIsland.x;
      this.ship.y = currentIsland.y + 30;
    }
  }

  private createWaves(): void {
    this.waves = [];
    for (let i = 0; i < 20; i++) {
      this.waves.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        amplitude: Math.random() * 20 + 10,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
  }

  private createClouds(): void {
    this.clouds = [];
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * 150 + 50,
        width: Math.random() * 120 + 80,
        height: Math.random() * 60 + 40,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
  }

  sailToIsland(islandId: number): void {
    if (islandId === this.currentSection || this.isNavigating) return;

    this.navigationService.goToSection(islandId);
  }

  navigateToIsland(targetSection: number): void {
    if (targetSection >= this.islands.length || this.isNavigating) return;

    this.isNavigating = true;
    const targetIsland = this.islands[targetSection];

    // Update island states
    this.islands.forEach((island, index) => {
      island.isActive = index === targetSection;
      if (index === targetSection) {
        island.isVisited = true;
      }
    });

    // Set ship target
    this.ship.targetX = targetIsland.x;
    this.ship.targetY = targetIsland.y + 30;
    this.ship.isMoving = true;

    // Calculate angle to target
    const dx = this.ship.targetX - this.ship.x;
    const dy = this.ship.targetY - this.ship.y;
    this.ship.angle = Math.atan2(dy, dx);

    this.currentSection = targetSection;

    // Stop navigation when ship reaches destination
    setTimeout(() => {
      this.isNavigating = false;
      this.ship.isMoving = false;
    }, 2000);
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
    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;

    this.update(deltaTime);
    this.render();
    this.lastTime = currentTime;

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(deltaTime: number): void {
    this.waveTime += deltaTime * 0.001;
    this.cloudTime += deltaTime * 0.0005;

    // Update ship movement
    if (this.ship.isMoving) {
      const dx = this.ship.targetX - this.ship.x;
      const dy = this.ship.targetY - this.ship.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        this.ship.x += Math.cos(this.ship.angle) * this.ship.speed;
        this.ship.y += Math.sin(this.ship.angle) * this.ship.speed;
      } else {
        this.ship.x = this.ship.targetX;
        this.ship.y = this.ship.targetY;
        this.ship.isMoving = false;
      }
    }

    // Update waves
    this.waves.forEach((wave) => {
      wave.x += wave.speed;
      if (wave.x > this.canvas.width + 50) {
        wave.x = -50;
      }
    });

    // Update clouds
    this.clouds.forEach((cloud) => {
      cloud.x += cloud.speed;
      if (cloud.x > this.canvas.width + cloud.width) {
        cloud.x = -cloud.width;
      }
    });
  }

  private render(): void {
    // Clear canvas with ocean gradient
    this.drawOcean();

    // Draw clouds
    this.drawClouds();

    // Draw waves
    this.drawWaves();

    // Draw islands
    this.drawIslands();

    // Draw ship
    this.drawShip();

    // Draw wake trail if moving
    if (this.ship.isMoving) {
      this.drawWake();
    }

    // Draw UI elements
    this.drawCompass();
  }

  private drawOcean(): void {
    // Ocean gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(0.3, '#4682B4'); // Steel blue
    gradient.addColorStop(1, '#191970'); // Midnight blue

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawClouds(): void {
    this.clouds.forEach((cloud) => {
      this.ctx.save();
      this.ctx.globalAlpha = cloud.opacity;

      // Draw fluffy cloud
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.beginPath();

      // Multiple circles for cloud effect
      for (let i = 0; i < 5; i++) {
        const x = cloud.x + (cloud.width / 4) * i;
        const y = cloud.y + Math.sin(i) * 10;
        const radius = cloud.height / 2 + Math.sin(i) * 10;

        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      }

      this.ctx.fill();
      this.ctx.restore();
    });
  }

  private drawWaves(): void {
    this.waves.forEach((wave) => {
      this.ctx.save();
      this.ctx.globalAlpha = wave.opacity;
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      for (let x = 0; x < this.canvas.width; x += 5) {
        const y =
          wave.y +
          Math.sin((x + wave.x) * wave.frequency + this.waveTime + wave.phase) *
            wave.amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
      this.ctx.restore();
    });
  }

  private drawIslands(): void {
    this.islands.forEach((island) => {
      this.ctx.save();

      // Island shadow
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.ctx.beginPath();
      this.ctx.arc(island.x + 3, island.y + 3, island.size / 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Island base
      this.ctx.fillStyle = island.color;
      this.ctx.beginPath();
      this.ctx.arc(island.x, island.y, island.size / 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Island border
      this.ctx.strokeStyle = island.isActive ? '#FFD700' : '#8B4513';
      this.ctx.lineWidth = island.isActive ? 4 : 2;
      this.ctx.stroke();

      // Island details (palm trees, buildings)
      this.drawIslandDetails(island);

      // Island name
      this.ctx.fillStyle = '#000000';
      this.ctx.font = 'bold 14px "Pirata One", cursive';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(island.name, island.x, island.y - island.size / 2 - 20);

      // Island description
      this.ctx.fillStyle = '#333333';
      this.ctx.font = '12px Arial';
      this.ctx.fillText(
        island.description,
        island.x,
        island.y - island.size / 2 - 5
      );

      // Visited indicator
      if (island.isVisited) {
        this.ctx.fillStyle = '#228B22';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(
          '✓',
          island.x + island.size / 3,
          island.y - island.size / 3
        );
      }

      this.ctx.restore();
    });
  }

  private drawIslandDetails(island: Island): void {
    const centerX = island.x;
    const centerY = island.y;
    const radius = island.size / 2;

    // Draw palm trees
    for (let i = 0; i < 3; i++) {
      const angle = (Math.PI * 2 * i) / 3;
      const treeX = centerX + Math.cos(angle) * (radius * 0.6);
      const treeY = centerY + Math.sin(angle) * (radius * 0.6);

      // Tree trunk
      this.ctx.fillStyle = '#8B4513';
      this.ctx.fillRect(treeX - 2, treeY - 15, 4, 15);

      // Palm leaves
      this.ctx.fillStyle = '#228B22';
      this.ctx.beginPath();
      this.ctx.arc(treeX, treeY - 15, 8, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw icon
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(island.icon, centerX, centerY + 8);
  }

  private drawShip(): void {
    this.ctx.save();
    this.ctx.translate(this.ship.x, this.ship.y);
    this.ctx.rotate(this.ship.angle);

    // Ship hull
    this.ctx.fillStyle = '#8B4513';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 20, 8, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Ship details
    this.ctx.fillStyle = '#654321';
    this.ctx.fillRect(-15, -3, 30, 6);

    // Mast
    this.ctx.strokeStyle = '#8B4513';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -25);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();

    // Sail
    this.ctx.fillStyle = '#F5F5DC';
    this.ctx.strokeStyle = '#8B4513';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(-15, -25);
    this.ctx.lineTo(15, -25);
    this.ctx.lineTo(12, -5);
    this.ctx.lineTo(-12, -5);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // Jolly Roger (Straw Hat flag)
    this.ctx.fillStyle = '#000000';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('🏴‍☠️', 0, -15);

    this.ctx.restore();
  }

  private drawWake(): void {
    this.ctx.save();
    this.ctx.globalAlpha = 0.3;
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 2;

    // Draw wake trail behind ship
    const wakeLength = 50;
    for (let i = 0; i < wakeLength; i++) {
      const offset = i * 2;
      const wakeX = this.ship.x - Math.cos(this.ship.angle) * offset;
      const wakeY = this.ship.y - Math.sin(this.ship.angle) * offset;
      const wakeSize = ((wakeLength - i) / wakeLength) * 10;

      this.ctx.beginPath();
      this.ctx.arc(wakeX, wakeY, wakeSize, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  private drawCompass(): void {
    const compassX = this.canvas.width - 80;
    const compassY = 80;
    const compassRadius = 30;

    this.ctx.save();

    // Compass background
    this.ctx.fillStyle = 'rgba(139, 69, 19, 0.8)';
    this.ctx.beginPath();
    this.ctx.arc(compassX, compassY, compassRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Compass border
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    // North indicator
    this.ctx.fillStyle = '#FF0000';
    this.ctx.beginPath();
    this.ctx.moveTo(compassX, compassY - compassRadius + 5);
    this.ctx.lineTo(compassX - 5, compassY - 10);
    this.ctx.lineTo(compassX + 5, compassY - 10);
    this.ctx.closePath();
    this.ctx.fill();

    // Compass directions
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('N', compassX, compassY - compassRadius + 15);
    this.ctx.fillText('S', compassX, compassY + compassRadius - 5);
    this.ctx.fillText('E', compassX + compassRadius - 5, compassY + 5);
    this.ctx.fillText('W', compassX - compassRadius + 5, compassY + 5);

    this.ctx.restore();
  }

  getCurrentIslandName(): string {
    return this.islands[this.currentSection]?.name || 'Unknown Waters';
  }

  getNavigationProgress(): number {
    return ((this.currentSection + 1) / this.islands.length) * 100;
  }

  isIslandVisited(index: number): boolean {
    return this.islands[index]?.isVisited || false;
  }
}
