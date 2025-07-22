import { Injectable } from '@angular/core';

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
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly skills: Skill[] = [
    { name: 'TypeScript', icon: 'fab fa-js-square', level: 95 },
    { name: 'Angular', icon: 'fab fa-angular', level: 90 },
    { name: 'React', icon: 'fab fa-react', level: 85 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 88 },
    { name: 'Python', icon: 'fab fa-python', level: 82 },
    { name: 'UI/UX Design', icon: 'fas fa-palette', level: 87 },
  ];

  readonly projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management and payment processing.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      title: 'Task Management App',
      description:
        'Collaborative project management tool with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
    },
    {
      title: 'Portfolio Website',
      description:
        'Modern, responsive portfolio website with light/dark theme toggle and smooth animations.',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'GSAP'],
    },
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management and payment processing.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
    },
    {
      title: 'Task Management App',
      description:
        'Collaborative project management tool with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
    },
    {
      title: 'Portfolio Website',
      description:
        'Modern, responsive portfolio website with light/dark theme toggle and smooth animations.',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'GSAP'],
    },
  ];

  getSkills(): Skill[] {
    return this.skills;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getSkillsPreview(count: number = 6): Skill[] {
    return this.skills.slice(0, count);
  }
}
