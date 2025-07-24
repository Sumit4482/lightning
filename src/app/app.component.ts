import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Services
import { ThemeService } from './core/services/theme.service';
import { NavigationService } from './core/services/navigation.service';

// Shared Components
import { ColorPickerComponent } from './shared/components/color-picker/color-picker.component';
import { NavigationDotsComponent } from './shared/components/navigation-dots/navigation-dots.component';
import { BackgroundElementsComponent } from './shared/components/background-elements/background-elements.component';

// Feature Components
import { HeroSectionComponent } from './features/hero/hero-section.component';
import { AboutSectionComponent } from './features/about/about-section.component';
import { ProjectsSectionComponent } from './features/projects/projects-section.component';
import { ContactSectionComponent } from './features/contact/contact-section.component';
// import { DrawingBoardComponent } from './features/drawing-board/drawing-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ColorPickerComponent,
    NavigationDotsComponent,
    BackgroundElementsComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    ContactSectionComponent,
    // DrawingBoardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  isDarkTheme = true;
  private touchStartY = 0;
  private touchEndY = 0;
  private touchStartTime = 0;
  private readonly SWIPE_THRESHOLD = 50; // Minimum distance for a swipe
  private readonly SWIPE_TIME_THRESHOLD = 300; // Maximum time for a swipe (ms)

  constructor(
    private themeService: ThemeService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  @HostBinding('class.dark-theme') get darkThemeClass() {
    return this.isDarkTheme;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (!this.navigationService.isScrolling) {
      event.preventDefault();

      if (event.deltaY > 0) {
        // Scrolling down
        this.navigationService.nextSection();
      } else {
        // Scrolling up
        this.navigationService.previousSection();
      }
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = Date.now();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.navigationService.isScrolling) {
      this.touchEndY = event.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const swipeDistance = this.touchStartY - this.touchEndY;
      const swipeTime = touchEndTime - this.touchStartTime;

      // Check if it's a valid swipe (enough distance and fast enough)
      if (
        Math.abs(swipeDistance) > this.SWIPE_THRESHOLD &&
        swipeTime < this.SWIPE_TIME_THRESHOLD
      ) {
        event.preventDefault();

        if (swipeDistance > 0) {
          // Swipe up - go to next section
          this.navigationService.nextSection();
        } else {
          // Swipe down - go to previous section
          this.navigationService.previousSection();
        }
      }
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.navigationService.isScrolling) {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        this.navigationService.nextSection();
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        this.navigationService.previousSection();
      }
    }
  }
}
