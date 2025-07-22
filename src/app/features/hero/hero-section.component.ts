import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent implements OnInit {
  isActive = false;
  isDarkTheme = true;

  constructor(
    private navigationService: NavigationService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 0;
    });

    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });
  }

  goToProjects(): void {
    this.navigationService.goToSection(2);
  }

  goToContact(): void {
    this.navigationService.goToSection(3);
  }

  downloadResume(): void {
    // Replace this URL with your actual Google Drive link
    const resumeUrl = 'https://drive.google.com/your-resume-link-here';
    window.open(resumeUrl, '_blank');
  }
}
