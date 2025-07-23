import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-navigation-dots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-dots.component.html',
  styleUrls: ['./navigation-dots.component.scss'],
})
export class NavigationDotsComponent implements OnInit {
  currentSection = 0;
  sections = [0, 1, 2, 3, 4];
  isMobile = false;

  constructor(private navigationService: NavigationService) {
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.currentSection = section;
    });
  }

  goToSection(sectionIndex: number): void {
    this.navigationService.goToSection(sectionIndex);
  }

  getSectionTitle(index: number): string {
    return this.navigationService.getSectionTitle(index);
  }

  private checkIfMobile(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 768;
      });
    }
  }

  get navigationClasses(): string {
    let classes = 'nav-dots';

    if (this.isMobile) {
      // On mobile - reposition to top-left for all sections
      classes += ' nav-dots-mobile';
    }

    return classes;
  }
}
