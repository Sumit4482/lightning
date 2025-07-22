import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { DataService, Project } from '../../core/services/data.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit {
  @ViewChild('projectsGrid', { static: false }) projectsGrid!: ElementRef;

  isActive = false;
  projects: Project[] = [];
  currentProjectIndex = 0;

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 2;
    });

    this.navigationService.currentProjectIndex$.subscribe((index) => {
      this.currentProjectIndex = index;
    });

    this.projects = this.dataService.getProjects();
  }

  scrollToProject(index: number): void {
    if (this.projectsGrid) {
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = 32; // 2rem gap
      const scrollPosition = index * (cardWidth + gap);

      this.projectsGrid.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      this.navigationService.setCurrentProjectIndex(index);
    }
  }

  nextProject(): void {
    if (this.currentProjectIndex < this.projects.length - 1) {
      this.scrollToProject(this.currentProjectIndex + 1);
    }
  }

  previousProject(): void {
    if (this.currentProjectIndex > 0) {
      this.scrollToProject(this.currentProjectIndex - 1);
    }
  }

  onProjectScroll(): void {
    if (this.projectsGrid) {
      const scrollLeft = this.projectsGrid.nativeElement.scrollLeft;
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = 32;
      const totalCardWidth = cardWidth + gap;

      const newIndex = Math.round(scrollLeft / totalCardWidth);
      this.navigationService.setCurrentProjectIndex(newIndex);
    }
  }
}
