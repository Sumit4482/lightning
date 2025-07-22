import {
  Component,
  OnInit,
  HostBinding,
  Inject,
  PLATFORM_ID,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  currentSection = 0; // 0: hero, 1: about, 2: projects, 3: contact
  isScrolling = false;
  isDarkTheme = true; // Start with light theme
  currentProjectIndex = 0; // Track current project in view

  @ViewChild('projectsGrid', { static: false }) projectsGrid!: ElementRef;

  skills: Skill[] = [
    { name: 'TypeScript', icon: 'fab fa-js-square', level: 95 },
    { name: 'Angular', icon: 'fab fa-angular', level: 90 },
    { name: 'React', icon: 'fab fa-react', level: 85 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 88 },
    { name: 'Python', icon: 'fab fa-python', level: 82 },
    { name: 'UI/UX Design', icon: 'fas fa-palette', level: 87 },
  ];

  projects: Project[] = [
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

  codeSnippet = `class Portfolio {
  skills = [
    'TypeScript', 'Angular', 
    'React', 'Node.js', 'Python'
  ];
  
  passion = 'Creating amazing experiences';
  
  async build() {
    return 'Something awesome';
  }
}`;

  @HostBinding('class.dark-theme') get darkThemeClass() {
    return this.isDarkTheme;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Load theme preference from localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkTheme = savedTheme === 'dark';
      }
    }
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }
  }

  // Project navigation methods
  scrollToProject(index: number) {
    if (isPlatformBrowser(this.platformId) && this.projectsGrid) {
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = 32; // 2rem gap
      const scrollPosition = index * (cardWidth + gap);

      this.projectsGrid.nativeElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      this.currentProjectIndex = index;
    }
  }

  nextProject() {
    if (this.currentProjectIndex < this.projects.length - 1) {
      this.scrollToProject(this.currentProjectIndex + 1);
    }
  }

  previousProject() {
    if (this.currentProjectIndex > 0) {
      this.scrollToProject(this.currentProjectIndex - 1);
    }
  }

  onProjectScroll() {
    if (isPlatformBrowser(this.platformId) && this.projectsGrid) {
      const scrollLeft = this.projectsGrid.nativeElement.scrollLeft;
      const cardWidth =
        this.projectsGrid.nativeElement.querySelector('.project-card')
          ?.offsetWidth || 350;
      const gap = 32;
      const totalCardWidth = cardWidth + gap;

      this.currentProjectIndex = Math.round(scrollLeft / totalCardWidth);
    }
  }

  // Resume download method - redirects to Google Drive
  downloadResume() {
    if (isPlatformBrowser(this.platformId)) {
      // Replace this URL with your actual Google Drive link
      const resumeUrl = 'https://drive.google.com/your-resume-link-here';
      window.open(resumeUrl, '_blank');
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (isPlatformBrowser(this.platformId) && !this.isScrolling) {
      event.preventDefault();
      this.isScrolling = true;

      if (event.deltaY > 0) {
        // Scrolling down
        this.nextSection();
      } else {
        // Scrolling up
        this.previousSection();
      }

      // Reset scrolling flag after animation
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (isPlatformBrowser(this.platformId) && !this.isScrolling) {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        this.isScrolling = true;
        this.nextSection();
        setTimeout(() => {
          this.isScrolling = false;
        }, 1000);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        this.isScrolling = true;
        this.previousSection();
        setTimeout(() => {
          this.isScrolling = false;
        }, 1000);
      }
    }
  }

  nextSection() {
    if (this.currentSection < 3) {
      this.currentSection++;
    }
  }

  previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  goToSection(sectionIndex: number) {
    if (isPlatformBrowser(this.platformId) && !this.isScrolling) {
      this.isScrolling = true;
      this.currentSection = sectionIndex;
      setTimeout(() => {
        this.isScrolling = false;
      }, 1000);
    }
  }

  getSectionTitle(index: number): string {
    const titles = ['Home', 'About', 'Projects', 'Contact'];
    return titles[index] || '';
  }

  scrollToSection(sectionId: string) {
    // This is now replaced by the section navigation
    const sectionMap: { [key: string]: number } = {
      projects: 2,
      contact: 3,
    };

    if (sectionMap[sectionId] !== undefined) {
      this.goToSection(sectionMap[sectionId]);
    }
  }
}
