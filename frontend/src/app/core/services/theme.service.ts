import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkThemeSubject = new BehaviorSubject<boolean>(true);
  public isDarkTheme$: Observable<boolean> =
    this.isDarkThemeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadThemePreference();
  }

  private loadThemePreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkThemeSubject.next(savedTheme === 'dark');
      }
      this.applyThemeToBody();
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const newTheme = !this.isDarkThemeSubject.value;
      this.isDarkThemeSubject.next(newTheme);
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      this.applyThemeToBody();
    }
  }

  private applyThemeToBody(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkThemeSubject.value) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }

  get isDarkTheme(): boolean {
    return this.isDarkThemeSubject.value;
  }
}
