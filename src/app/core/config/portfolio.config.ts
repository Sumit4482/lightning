export interface PortfolioConfig {
  // Personal Information
  personal: {
    name: string;
    title: string;
    greeting: string;
    description: string;
    email: string;
    resumeUrl: string;
  };

  // Social Links
  social: {
    linkedin: string;
    github: string;
    twitter: string;
    // Add more social platforms as needed
  };

  // Skills
  skills: Array<{
    name: string;
    icon: string;
    level: number;
  }>;

  // Projects
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    liveUrl?: string;
    sourceUrl?: string;
  }>;

  // About Section
  about: {
    description: string;
    skillsToShow: number; // Number of skills to show in about section
  };

  // Contact Section
  contact: {
    description: string;
  };

  // SEO & Meta
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Theme & Colors
  theme: {
    defaultColorScheme: string; // Name of the default color scheme
  };
}

// Default Configuration - Users can modify this
export const PORTFOLIO_CONFIG: PortfolioConfig = {
  personal: {
    name: 'Sumit',
    title: 'Full Stack Developer',
    greeting: "Hey, I'm",
    description:
      'I build web apps that (mostly) work. Love clean code, good design, and a strong cup of chai ☕ ',
    email: 'sbanwakde4482@gmail.com',
    resumeUrl: 'https://drive.google.com/your-resume-link-here',
  },

  social: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
  },
  // Languages: JavaScript, TypeScript, HTML/CSS, C++, Bash
  // Frameworks and Libraries: Angular, Node.js, Express, GraphQL, Jasmine
  // Databases and Messaging: MongoDB, MySQL, Redis, RabbitMQ
  // Developer Tools: Git, Cursor, AWS (EC2, S3), Docker, Kubernetes, Grafana, Prometheus
  skills: [
    { name: 'TypeScript', icon: 'fab fa-js-square', level: 95 },
    { name: 'JavaScript', icon: 'fab fa-js-square', level: 95 },
    { name: 'HTML/CSS', icon: 'fab fa-html5', level: 95 },
    { name: 'C++', icon: 'fab fa-c++', level: 95 },
    { name: 'Bash', icon: 'fab fa-linux', level: 95 },
    { name: 'Angular', icon: 'fab fa-angular', level: 95 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 95 },
    { name: 'Express', icon: 'fab fa-express', level: 95 },
    { name: 'GraphQL', icon: 'fab fa-graphql', level: 95 },
    { name: 'Jasmine', icon: 'fab fa-jasmine', level: 95 },
    { name: 'MongoDB', icon: 'fab fa-mongodb', level: 95 },
    { name: 'MySQL', icon: 'fab fa-mysql', level: 95 },
    { name: 'Redis', icon: 'fab fa-redis', level: 95 },
    { name: 'RabbitMQ', icon: 'fab fa-rabbitmq', level: 95 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 95 },
    { name: 'AWS', icon: 'fab fa-aws', level: 95 },
    { name: 'Docker', icon: 'fab fa-docker', level: 95 },
    { name: 'Kubernetes', icon: 'fab fa-kubernetes', level: 95 },
    { name: 'Grafana', icon: 'fab fa-grafana', level: 95 },
    { name: 'Prometheus', icon: 'fab fa-prometheus', level: 95 },
    { name: 'Cursor', icon: 'fab fa-cursor', level: 95 },
    { name: 'Jenkins', icon: 'fab fa-jenkins', level: 95 },
  ],

  projects: [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-stack e-commerce solution with real-time inventory management and payment processing.',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://example-ecommerce.com',
      sourceUrl: 'https://github.com/johndoe/ecommerce-platform',
    },
    {
      title: 'Task Management App',
      description:
        'Collaborative project management tool with real-time updates and team collaboration features.',
      technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
      liveUrl: 'https://taskmanager.example.com',
      sourceUrl: 'https://github.com/johndoe/task-manager',
    },
    {
      title: 'Portfolio Website',
      description:
        'Modern, responsive portfolio website with light/dark theme toggle and smooth animations.',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'GSAP'],
      liveUrl: 'https://johndoe.dev',
      sourceUrl: 'https://github.com/johndoe/portfolio',
    },
  ],

  about: {
    description:
      "I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I bring ideas to life through clean code and thoughtful design.",
    skillsToShow: 20,
  },

  contact: {
    description:
      "I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work together.",
  },

  seo: {
    title: 'John Doe - Full Stack Developer',
    description:
      'John Doe - Full Stack Developer specializing in modern web technologies and user-centered design',
    keywords: [
      'Full Stack Developer',
      'Web Development',
      'Angular',
      'React',
      'Node.js',
      'TypeScript',
      'Portfolio',
    ],
  },

  theme: {
    defaultColorScheme: 'Emerald',
  },
};
