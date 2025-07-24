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
import { Subject, takeUntil, interval } from 'rxjs';

export interface RPSUnit {
  id: string;
  type: 'rock' | 'paper' | 'scissors';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  health: number;
  maxHealth: number;
  level: number;
  isAlive: boolean;
  lastAttack: number;
  attackCooldown: number;
  color: string;
  glowColor: string;
}

export interface BattleResult {
  winner: RPSUnit;
  loser: RPSUnit;
  type: 'rock' | 'paper' | 'scissors';
}

@Component({
  selector: 'app-rps-battle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rps-battle.component.html',
  styleUrls: ['./rps-battle.component.scss'],
})
export class RpsBattleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('gameCanvas', { static: false })
  gameCanvas!: ElementRef<HTMLCanvasElement>;

  isActive = false;
  isGameRunning = false;
  gameSpeed = 2;
  unitCount = 80;
  canvasWidth = 1200;
  canvasHeight = 800;

  // Game state
  units: RPSUnit[] = [];
  battleHistory: BattleResult[] = [];
  gameStats = {
    totalBattles: 0,
    rockWins: 0,
    paperWins: 0,
    scissorsWins: 0,
    maxLevel: 1,
    gameTime: 0,
  };

  // Canvas properties
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private gameLoop$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  // Performance
  private lastTime = 0;
  private fps = 120;
  private frameInterval = 1000 / this.fps;

  constructor(
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 4; // RPS Battle is section 4
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCanvas();
      this.initializeGame();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopGame();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.resizeCanvas();
    }
  }

  private initializeCanvas(): void {
    this.canvas = this.gameCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement;
    if (container) {
      const rect = container.getBoundingClientRect();
      this.canvasWidth = rect.width;
      this.canvasHeight = rect.height;
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
    }
  }

  private initializeGame(): void {
    this.createUnits();
    this.startGame();
  }

  private createUnits(): void {
    this.units = [];
    const types: ('rock' | 'paper' | 'scissors')[] = [
      'rock',
      'paper',
      'scissors',
    ];
    const colors = {
      rock: '#8B4513',
      paper: '#F5F5DC',
      scissors: '#C0C0C0',
    };
    const glowColors = {
      rock: '#D2691E',
      paper: '#FFFFE0',
      scissors: '#E6E6FA',
    };

    for (let i = 0; i < this.unitCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const unit: RPSUnit = {
        id: `unit-${i}`,
        type,
        x: Math.random() * this.canvasWidth,
        y: Math.random() * this.canvasHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        size: 15 + Math.random() * 10,
        health: 100,
        maxHealth: 100,
        level: 1,
        isAlive: true,
        lastAttack: 0,
        attackCooldown: 1000 + Math.random() * 2000,
        color: colors[type],
        glowColor: glowColors[type],
      };
      this.units.push(unit);
    }
  }

  startGame(): void {
    if (this.isGameRunning) return;

    this.isGameRunning = true;
    this.gameStats.gameTime = 0;
    this.gameLoop();
  }

  stopGame(): void {
    this.isGameRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resetGame(): void {
    this.stopGame();
    this.battleHistory = [];
    this.gameStats = {
      totalBattles: 0,
      rockWins: 0,
      paperWins: 0,
      scissorsWins: 0,
      maxLevel: 1,
      gameTime: 0,
    };
    this.createUnits();
    this.startGame();
  }

  private gameLoop(): void {
    if (!this.isGameRunning) return;

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
    this.gameStats.gameTime += deltaTime;

    // Update units
    this.units.forEach((unit) => {
      if (!unit.isAlive) return;

      // Move units
      unit.x += unit.vx * this.gameSpeed;
      unit.y += unit.vy * this.gameSpeed;

      // Bounce off walls
      if (unit.x <= unit.size || unit.x >= this.canvasWidth - unit.size) {
        unit.vx *= -1;
        unit.x = Math.max(
          unit.size,
          Math.min(this.canvasWidth - unit.size, unit.x)
        );
      }
      if (unit.y <= unit.size || unit.y >= this.canvasHeight - unit.size) {
        unit.vy *= -1;
        unit.y = Math.max(
          unit.size,
          Math.min(this.canvasHeight - unit.size, unit.y)
        );
      }

      // Check for battles
      this.checkBattles(unit, deltaTime);
    });

    // Spawn new units if needed
    this.spawnNewUnits();
  }

  private checkBattles(unit: RPSUnit, deltaTime: number): void {
    const currentTime = Date.now();
    if (currentTime - unit.lastAttack < unit.attackCooldown) return;

    // Optimize collision detection with spatial partitioning
    const searchRadius = unit.size * 3;
    const nearbyUnits = this.units.filter((otherUnit) => {
      if (!otherUnit.isAlive || unit.id === otherUnit.id) return false;

      const dx = unit.x - otherUnit.x;
      const dy = unit.y - otherUnit.y;
      const distanceSquared = dx * dx + dy * dy;
      return distanceSquared < searchRadius * searchRadius;
    });

    for (const otherUnit of nearbyUnits) {
      const dx = unit.x - otherUnit.x;
      const dy = unit.y - otherUnit.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < unit.size + otherUnit.size) {
        const result = this.battle(unit, otherUnit);
        if (result) {
          this.handleBattleResult(result);
          unit.lastAttack = currentTime;
          otherUnit.lastAttack = currentTime;
          break; // Only battle one unit at a time
        }
      }
    }
  }

  private battle(unit1: RPSUnit, unit2: RPSUnit): BattleResult | null {
    const rules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    if (unit1.type === unit2.type) return null;

    let winner: RPSUnit;
    let loser: RPSUnit;

    if (rules[unit1.type] === unit2.type) {
      winner = unit1;
      loser = unit2;
    } else {
      winner = unit2;
      loser = unit1;
    }

    return {
      winner,
      loser,
      type: winner.type,
    };
  }

  private handleBattleResult(result: BattleResult): void {
    // Update stats
    this.gameStats.totalBattles++;
    this.gameStats[`${result.type}Wins` as keyof typeof this.gameStats]++;

    // Level up winner
    result.winner.level++;
    result.winner.maxHealth += 20;
    result.winner.health = result.winner.maxHealth;
    result.winner.size += 2;
    result.winner.attackCooldown = Math.max(
      500,
      result.winner.attackCooldown - 100
    );

    // Update max level
    this.gameStats.maxLevel = Math.max(
      this.gameStats.maxLevel,
      result.winner.level
    );

    // Eliminate loser
    result.loser.isAlive = false;

    // Add to battle history
    this.battleHistory.push(result);
    if (this.battleHistory.length > 100) {
      this.battleHistory.shift();
    }

    // Create evolution effect
    this.createEvolutionEffect(result.winner);
  }

  private createEvolutionEffect(unit: RPSUnit): void {
    // This will be used for visual effects
    unit.glowColor = this.getEvolutionColor(unit.level);
  }

  private getEvolutionColor(level: number): string {
    if (level >= 10) return '#FFD700'; // Gold
    if (level >= 7) return '#FF4500'; // Orange Red
    if (level >= 5) return '#9370DB'; // Medium Purple
    if (level >= 3) return '#32CD32'; // Lime Green
    return '#87CEEB'; // Sky Blue
  }

  private spawnNewUnits(): void {
    const aliveCount = this.units.filter((u) => u.isAlive).length;
    if (aliveCount < this.unitCount * 0.2) {
      const newUnits = Math.min(15, this.unitCount - aliveCount);
      for (let i = 0; i < newUnits; i++) {
        this.spawnUnit();
      }
    }
  }

  private spawnUnit(): void {
    const types: ('rock' | 'paper' | 'scissors')[] = [
      'rock',
      'paper',
      'scissors',
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    const colors = {
      rock: '#8B4513',
      paper: '#F5F5DC',
      scissors: '#C0C0C0',
    };
    const glowColors = {
      rock: '#D2691E',
      paper: '#FFFFE0',
      scissors: '#E6E6FA',
    };

    const unit: RPSUnit = {
      id: `unit-${Date.now()}-${Math.random()}`,
      type,
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: 15 + Math.random() * 10,
      health: 100,
      maxHealth: 100,
      level: 1,
      isAlive: true,
      lastAttack: 0,
      attackCooldown: 1000 + Math.random() * 2000,
      color: colors[type],
      glowColor: glowColors[type],
    };

    this.units.push(unit);
  }

  private render(): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Draw background grid
    this.drawGrid();

    // Draw units (only alive ones for better performance)
    const aliveUnits = this.units.filter((unit) => unit.isAlive);
    aliveUnits.forEach((unit) => {
      this.drawUnit(unit);
    });

    // Draw battle effects
    this.drawBattleEffects();
  }

  private drawGrid(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    const gridSize = 50;
    for (let x = 0; x < this.canvasWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvasHeight);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.canvasHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvasWidth, y);
      this.ctx.stroke();
    }
  }

  private drawUnit(unit: RPSUnit): void {
    // Draw glow effect
    const gradient = this.ctx.createRadialGradient(
      unit.x,
      unit.y,
      0,
      unit.x,
      unit.y,
      unit.size * 2
    );
    gradient.addColorStop(0, unit.glowColor + '40');
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(unit.x, unit.y, unit.size * 2, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw main unit
    this.ctx.fillStyle = unit.color;
    this.ctx.beginPath();
    this.ctx.arc(unit.x, unit.y, unit.size, 0, Math.PI * 2);
    this.ctx.fill();

    // Draw border
    this.ctx.strokeStyle = unit.glowColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw type symbol
    this.drawTypeSymbol(unit);

    // Draw level indicator
    this.drawLevelIndicator(unit);

    // Draw health bar
    this.drawHealthBar(unit);
  }

  private drawTypeSymbol(unit: RPSUnit): void {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    let symbol = '';
    let fontSize = unit.size * 0.8;

    switch (unit.type) {
      case 'rock':
        symbol = '🪨';
        break;
      case 'paper':
        symbol = '📄';
        break;
      case 'scissors':
        symbol = '✂️';
        break;
    }

    // Draw symbol with better rendering
    this.ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    this.ctx.fillText(symbol, unit.x, unit.y);
  }

  private drawLevelIndicator(unit: RPSUnit): void {
    if (unit.level > 1) {
      // Draw level background
      const levelSize = unit.size * 0.6;
      this.ctx.fillStyle = '#FFD700';
      this.ctx.beginPath();
      this.ctx.arc(unit.x, unit.y - unit.size - 8, levelSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw level border
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Draw level text
      this.ctx.fillStyle = '#000';
      this.ctx.font = `bold ${unit.size * 0.3}px Arial`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(unit.level.toString(), unit.x, unit.y - unit.size - 8);
    }
  }

  private drawHealthBar(unit: RPSUnit): void {
    const barWidth = unit.size * 2;
    const barHeight = 4;
    const barX = unit.x - barWidth / 2;
    const barY = unit.y + unit.size + 5;

    // Background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(barX, barY, barWidth, barHeight);

    // Health
    const healthPercent = unit.health / unit.maxHealth;
    this.ctx.fillStyle =
      healthPercent > 0.5
        ? '#32CD32'
        : healthPercent > 0.25
        ? '#FFA500'
        : '#FF0000';
    this.ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
  }

  private drawBattleEffects(): void {
    // Draw recent battle connections
    this.battleHistory.slice(-10).forEach((battle) => {
      if (battle.winner.isAlive) {
        this.ctx.strokeStyle = battle.winner.glowColor + '80';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(battle.winner.x, battle.winner.y);
        this.ctx.lineTo(battle.loser.x, battle.loser.y);
        this.ctx.stroke();
      }
    });
  }

  // Public methods for UI controls
  toggleGame(): void {
    if (this.isGameRunning) {
      this.stopGame();
    } else {
      this.startGame();
    }
  }

  setGameSpeed(speed: number): void {
    this.gameSpeed = Math.max(0.1, Math.min(5, speed));
  }

  setUnitCount(count: number): void {
    this.unitCount = Math.max(10, Math.min(200, count));
    if (!this.isGameRunning) {
      this.createUnits();
    }
  }

  getAliveUnits(): RPSUnit[] {
    return this.units.filter((u) => u.isAlive);
  }

  getUnitCounts(): { rock: number; paper: number; scissors: number } {
    const alive = this.getAliveUnits();
    return {
      rock: alive.filter((u) => u.type === 'rock').length,
      paper: alive.filter((u) => u.type === 'paper').length,
      scissors: alive.filter((u) => u.type === 'scissors').length,
    };
  }
}
