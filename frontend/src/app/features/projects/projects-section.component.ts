import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import { DataService, Project } from '../../core/services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('projectsGrid', { static: false }) projectsGrid!: ElementRef;

  isActive = false;
  projects: Project[] = [];
  currentProjectIndex = 0;
  visibleProjects = 3; // Default for desktop
  totalPages = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private navigationService: NavigationService,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.navigationService.currentSection$.subscribe((section) => {
      this.isActive = section === 2;
    });

    this.navigationService.currentProjectIndex$.subscribe((index) => {
      this.currentProjectIndex = index;
    });

    this.projects = this.dataService.getProjects();

    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleProjects();
      this.calculateTotalPages();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleProjects();
      this.calculateTotalPages();
    }
  }

  private updateVisibleProjects(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      // Large desktop - show 3 projects
      this.visibleProjects = 3;
    } else if (screenWidth >= 768) {
      // Tablet - show 2 projects
      this.visibleProjects = 2;
    } else {
      // Mobile - show 1 project
      this.visibleProjects = 1;
    }
  }

  private calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.projects.length / this.visibleProjects);
  }

  scrollToProject(index: number): void {
    if (this.projectsGrid && isPlatformBrowser(this.platformId)) {
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = this.getGapSize();
      const scrollPosition = index * (cardWidth + gap);

      this.projectsGrid.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      this.navigationService.setCurrentProjectIndex(index);
    }
  }

  scrollToPage(pageIndex: number): void {
    if (this.projectsGrid && isPlatformBrowser(this.platformId)) {
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = this.getGapSize();
      const totalCardWidth = cardWidth + gap;
      const scrollPosition = pageIndex * this.visibleProjects * totalCardWidth;

      this.projectsGrid.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      // Set the current project index to the first project of the page
      const projectIndex = pageIndex * this.visibleProjects;
      this.navigationService.setCurrentProjectIndex(projectIndex);
    }
  }

  nextProject(): void {
    const maxIndex = this.projects.length - this.visibleProjects;
    if (this.currentProjectIndex < maxIndex) {
      this.scrollToProject(this.currentProjectIndex + 1);
    }
  }

  previousProject(): void {
    if (this.currentProjectIndex > 0) {
      this.scrollToProject(this.currentProjectIndex - 1);
    }
  }

  nextPage(): void {
    const currentPage = Math.floor(
      this.currentProjectIndex / this.visibleProjects
    );
    const nextPage = currentPage + 1;

    if (nextPage < this.totalPages) {
      this.scrollToPage(nextPage);
    }
  }

  previousPage(): void {
    const currentPage = Math.floor(
      this.currentProjectIndex / this.visibleProjects
    );
    const previousPage = currentPage - 1;

    if (previousPage >= 0) {
      this.scrollToPage(previousPage);
    }
  }

  onProjectScroll(): void {
    if (this.projectsGrid && isPlatformBrowser(this.platformId)) {
      const scrollLeft = this.projectsGrid.nativeElement.scrollLeft;
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = this.getGapSize();
      const totalCardWidth = cardWidth + gap;

      const newIndex = Math.round(scrollLeft / totalCardWidth);
      this.navigationService.setCurrentProjectIndex(newIndex);
    }
  }

  getCurrentPage(): number {
    return Math.floor(this.currentProjectIndex / this.visibleProjects);
  }

  getPageProjects(pageIndex: number): Project[] {
    const startIndex = pageIndex * this.visibleProjects;
    return this.projects.slice(startIndex, startIndex + this.visibleProjects);
  }

  isPageActive(pageIndex: number): boolean {
    return this.getCurrentPage() === pageIndex;
  }

  canGoNext(): boolean {
    return (
      this.currentProjectIndex < this.projects.length - this.visibleProjects
    );
  }

  canGoPrevious(): boolean {
    return this.currentProjectIndex > 0;
  }

  canGoNextPage(): boolean {
    return this.getCurrentPage() < this.totalPages - 1;
  }

  canGoPreviousPage(): boolean {
    return this.getCurrentPage() > 0;
  }

  private getGapSize(): number {
    if (!isPlatformBrowser(this.platformId)) return 32;

    const screenWidth = window.innerWidth;
    if (screenWidth <= 767) {
      return 16; // 1rem gap for mobile
    }
    return 32; // 2rem gap for tablet/desktop
  }
}
