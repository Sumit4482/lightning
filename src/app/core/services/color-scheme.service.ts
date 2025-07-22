import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  gradient: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  readonly colorSchemes: ColorScheme[] = [
    {
      name: 'Emerald',
      primary: '#00dc82',
      secondary: '#00b368',
      gradient: 'linear-gradient(135deg, #00dc82 0%, #00b368 100%)',
    },
    {
      name: 'Blue',
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    {
      name: 'Purple',
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    },
    {
      name: 'Pink',
      primary: '#ec4899',
      secondary: '#db2777',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    },
    {
      name: 'Orange',
      primary: '#f97316',
      secondary: '#ea580c',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    },
    {
      name: 'Cyan',
      primary: '#06b6d4',
      secondary: '#0891b2',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    },
  ];

  private currentColorSchemeSubject = new BehaviorSubject<ColorScheme>(
    this.colorSchemes[0]
  );
  public currentColorScheme$: Observable<ColorScheme> =
    this.currentColorSchemeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadColorSchemePreference();
  }

  private loadColorSchemePreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedColorScheme = localStorage.getItem('colorScheme');
      if (savedColorScheme) {
        const scheme = this.colorSchemes.find(
          (s) => s.name === savedColorScheme
        );
        if (scheme) {
          this.currentColorSchemeSubject.next(scheme);
          this.applyColorScheme(scheme);
        }
      } else {
        this.applyColorScheme(this.colorSchemes[0]);
      }
    }
  }

  selectColorScheme(scheme: ColorScheme): void {
    this.currentColorSchemeSubject.next(scheme);
    this.applyColorScheme(scheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('colorScheme', scheme.name);
    }
  }

  private applyColorScheme(scheme: ColorScheme): void {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      body.style.setProperty('--accent-primary', scheme.primary);
      body.style.setProperty('--accent-secondary', scheme.secondary);
      body.style.setProperty('--gradient-primary', scheme.gradient);
      body.style.setProperty('--gradient-accent', scheme.gradient);

      // Apply to portfolio container
      const portfolioContainer = document.querySelector(
        '.portfolio-container'
      ) as HTMLElement;
      if (portfolioContainer) {
        portfolioContainer.style.setProperty(
          '--accent-primary',
          scheme.primary
        );
        portfolioContainer.style.setProperty(
          '--accent-secondary',
          scheme.secondary
        );
        portfolioContainer.style.setProperty(
          '--gradient-primary',
          scheme.gradient
        );
        portfolioContainer.style.setProperty(
          '--gradient-accent',
          scheme.gradient
        );
      }
    }
  }

  get currentColorScheme(): ColorScheme {
    return this.currentColorSchemeSubject.value;
  }
}
