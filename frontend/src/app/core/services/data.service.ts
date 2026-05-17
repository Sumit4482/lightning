import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PortfolioConfig } from '../config/portfolio.config';
import { ApiConfigService } from './api-config.service';

export interface Skill {
  name: string;
  level: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  sourceUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private config!: PortfolioConfig;

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  async loadPortfolio(): Promise<void> {
    const url = this.apiConfig.resolveUrl('/api/portfolio');
    this.config = await firstValueFrom(this.http.get<PortfolioConfig>(url));
  }

  private assertLoaded(): void {
    if (!this.config) {
      throw new Error('Portfolio data is not loaded yet');
    }
  }

  get skills(): Skill[] {
    this.assertLoaded();
    return this.config.skills;
  }

  get projects(): Project[] {
    this.assertLoaded();
    return this.config.projects;
  }

  get personalInfo() {
    this.assertLoaded();
    return this.config.personal;
  }

  get socialLinks() {
    this.assertLoaded();
    return this.config.social;
  }

  get aboutInfo() {
    this.assertLoaded();
    return this.config.about;
  }

  get contactInfo() {
    this.assertLoaded();
    return this.config.contact;
  }

  get seoInfo() {
    this.assertLoaded();
    return this.config.seo;
  }

  get themeConfig() {
    this.assertLoaded();
    return this.config.theme;
  }

  get currentActivity() {
    this.assertLoaded();
    return this.config.currentActivity;
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getSkillsPreview(count?: number): Skill[] {
    const skillsToShow = count || this.config.about.skillsToShow;
    return this.skills.slice(0, skillsToShow);
  }
}
