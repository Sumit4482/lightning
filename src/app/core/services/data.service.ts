import { Injectable } from '@angular/core';
import { PORTFOLIO_CONFIG, PortfolioConfig } from '../config/portfolio.config';

export interface Skill {
  name: string;
  icon: string;
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
  private config: PortfolioConfig = PORTFOLIO_CONFIG;

  get skills(): Skill[] {
    return this.config.skills;
  }

  get projects(): Project[] {
    return this.config.projects;
  }

  get personalInfo() {
    return this.config.personal;
  }

  get socialLinks() {
    return this.config.social;
  }

  get aboutInfo() {
    return this.config.about;
  }

  get contactInfo() {
    return this.config.contact;
  }

  get seoInfo() {
    return this.config.seo;
  }

  get themeConfig() {
    return this.config.theme;
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

  // Method to update configuration (useful for dynamic updates)
  updateConfig(newConfig: Partial<PortfolioConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}
