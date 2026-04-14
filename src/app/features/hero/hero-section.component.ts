import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { ThemeService } from '../../core/services/theme.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  isActive = false;
  isDarkTheme = true;
  personalInfo: any;
  presenceIndex = 0;
  lineVisible = true;
  private activityLines: string[] = [];

  constructor(
    private navigationService: NavigationService,
    private themeService: ThemeService,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 0;
    });

    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });

    this.personalInfo = this.dataService.personalInfo;

    const activity = this.dataService.currentActivity;
    this.activityLines = activity?.lines?.length ? activity.lines : [];
    if (
      isPlatformBrowser(this.platformId) &&
      this.activityLines.length > 1 &&
      activity
    ) {
      const id = window.setInterval(() => this.advancePresence(), activity.intervalMs);
      this.destroyRef.onDestroy(() => window.clearInterval(id));
    }
  }

  get currentActivity() {
    return this.dataService.currentActivity;
  }

  get presenceLine(): string {
    if (!this.activityLines.length) {
      return '';
    }
    return this.activityLines[this.presenceIndex] ?? '';
  }

  private advancePresence(): void {
    if (this.activityLines.length <= 1) {
      return;
    }
    this.lineVisible = false;
    setTimeout(() => {
      this.presenceIndex = (this.presenceIndex + 1) % this.activityLines.length;
      this.lineVisible = true;
    }, 200);
  }

  goToProjects(): void {
    this.navigationService.goToSection(2);
  }

  goToContact(): void {
    this.navigationService.goToSection(3);
  }

  downloadResume(): void {
    window.open(this.personalInfo.resumeUrl, '_blank');
  }
}
