import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { DataService, Skill } from '../../core/services/data.service';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent implements OnInit {
  isActive = false;
  skills: Skill[] = [];

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 1;
    });

    this.skills = this.dataService.getSkillsPreview(6);
  }
}
