import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private currentSectionSubject = new BehaviorSubject<number>(0);
  public currentSection$: Observable<number> =
    this.currentSectionSubject.asObservable();

  private isScrollingSubject = new BehaviorSubject<boolean>(false);
  public isScrolling$: Observable<boolean> =
    this.isScrollingSubject.asObservable();

  private currentProjectIndexSubject = new BehaviorSubject<number>(0);
  public currentProjectIndex$: Observable<number> =
    this.currentProjectIndexSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get currentSection(): number {
    return this.currentSectionSubject.value;
  }

  get isScrolling(): boolean {
    return this.isScrollingSubject.value;
  }

  get currentProjectIndex(): number {
    return this.currentProjectIndexSubject.value;
  }

  nextSection(): void {
    if (this.currentSection < 4) {
      this.setScrolling(true);
      this.currentSectionSubject.next(this.currentSection + 1);
      this.resetScrollingAfterDelay();
    }
  }

  previousSection(): void {
    if (this.currentSection > 0) {
      this.setScrolling(true);
      this.currentSectionSubject.next(this.currentSection - 1);
      this.resetScrollingAfterDelay();
    }
  }

  goToSection(sectionIndex: number): void {
    if (isPlatformBrowser(this.platformId) && !this.isScrolling) {
      this.setScrolling(true);
      this.currentSectionSubject.next(sectionIndex);
      this.resetScrollingAfterDelay();
    }
  }

  setCurrentProjectIndex(index: number): void {
    this.currentProjectIndexSubject.next(index);
  }

  private setScrolling(scrolling: boolean): void {
    this.isScrollingSubject.next(scrolling);
  }

  private resetScrollingAfterDelay(): void {
    setTimeout(() => {
      this.setScrolling(false);
    }, 1000);
  }

  getSectionTitle(index: number): string {
    const titles = [
      'Home',
      'About',
      'Projects',
      'Contact',
      'Particle Playground',
    ];
    return titles[index] || '';
  }
}
