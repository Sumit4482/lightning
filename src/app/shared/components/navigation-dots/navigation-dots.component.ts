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
  sections = [0, 1, 2, 3];

  constructor(private navigationService: NavigationService) {}

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
}
