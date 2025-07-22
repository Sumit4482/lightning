import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  isActive = false;
  isDarkTheme = true;
  personalInfo: any;

  constructor(
    private navigationService: NavigationService,
    private themeService: ThemeService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 0;
    });

    this.themeService.isDarkTheme$.subscribe((isDark) => {
      this.isDarkTheme = isDark;
    });

    this.personalInfo = this.dataService.personalInfo;
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
