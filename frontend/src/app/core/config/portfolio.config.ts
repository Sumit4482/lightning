export interface PortfolioConfig {
  personal: {
    name: string;
    title: string;
    greeting: string;
    description: string;
    email: string;
    resumeUrl: string;
  };

  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };

  skills: Array<{
    name: string;
    level: number;
  }>;

  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    liveUrl?: string;
    sourceUrl?: string;
  }>;

  about: {
    description: string;
    skillsToShow: number;
  };

  contact: {
    description: string;
  };

  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  theme: {
    defaultColorScheme: string;
  };

  currentActivity: {
    label: string;
    lines: string[];
    intervalMs: number;
  };
}
