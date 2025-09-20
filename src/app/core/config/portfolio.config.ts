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
    resumeUrl: 'https://drive.google.com/file/d/1Wbe-BbaS-RndtMr_L5aR9C7K-Ym71huu/view?usp=sharing',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/sumitbanwakade/',
    github: 'https://github.com/Sumit4482',
    twitter: 'https://x.com/incompleteDSA',
  },

  // Languages: JavaScript, TypeScript, HTML/CSS, C++, Bash
  // Frameworks and Libraries: Angular, Node.js, Express, GraphQL, Jasmine
  // Databases and Messaging: MongoDB, MySQL, Redis, RabbitMQ
  // Developer Tools: Git, Cursor, AWS (EC2, S3), Docker, Kubernetes, Grafana, Prometheus
  skills: [
    { name: 'TypeScript', level: 95 },
    { name: 'JavaScript', level: 95 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'C++', level: 95 },
    { name: 'Angular', level: 95 },
    { name: 'Node.js', level: 95 },
    { name: 'Express', level: 95 },
    { name: 'GraphQL', level: 95 },
    { name: 'Jasmine', level: 95 },
    { name: 'MongoDB', level: 95 },
    { name: 'MySQL', level: 95 },
    { name: 'Redis', level: 95 },
    { name: 'RabbitMQ', level: 95 },
    { name: 'Git', level: 95 },
    { name: 'AWS', level: 95 },
    { name: 'Docker', level: 95 },
    { name: 'Kubernetes', level: 95 },
    { name: 'Cursor', level: 95 },
    { name: 'Jenkins', level: 95 },
    { name: 'Flutter', level: 95 },
  ],

  projects: [
    {
      title: 'QuizMaster-Pro',
      description:
        'QuizMaster Pro is a real-time, AI-powered multiplayer quiz platform with scalable microservices architecture and sub-100ms latency for seamless gameplay.',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis','Socket.io','Docker','GenAI'],
      // liveUrl: 'https://example-ecommerce.com',
      sourceUrl: 'https://github.com/Sumit4482/QuizMaster-Pro',
    },
    {
      title: 'EchoPrompt AI-Powered Prompt Builder',
      description:
        'A comprehensive, full-stack application for creating, managing, and sharing AI prompts with advanced features and a beautiful user interface.',
      technologies: ['React', 'TypeScript', 'Node.js','Express','MongoDB','GenAI'],
      sourceUrl: 'https://github.com/Sumit4482/EchoPrompt',
    },
    {
      title: 'PageTurn',
      description:
        'Your go-to destination for discovering, sharing, and discussing books. Explore diverse genres, read reviews. Dive into a world of literature and ignite your passion for reading with Pageturn.',
      technologies: ['Angular', 'SCSS', 'TypeScript','JavaScript','MongoDB'],
      sourceUrl: 'https://github.com/Sumit4482/PageTurn',
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
