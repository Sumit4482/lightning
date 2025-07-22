# Example Portfolio Configuration

Copy this configuration and replace the values with your own information:

```typescript
export const PORTFOLIO_CONFIG: PortfolioConfig = {
  personal: {
    name: "Jane Smith",                    // ← Your name
    title: "Frontend Developer",           // ← Your job title
    greeting: "Hi, I'm",                   // ← Your greeting
    description: "I create beautiful and functional web experiences.", // ← Your description
    email: "jane.smith@example.com",       // ← Your email
    resumeUrl: "https://drive.google.com/file/d/YOUR_RESUME_ID/view" // ← Your resume link
  },

  social: {
    linkedin: "https://linkedin.com/in/janesmith",  // ← Your LinkedIn
    github: "https://github.com/janesmith",         // ← Your GitHub
    twitter: "https://twitter.com/janesmith"        // ← Your Twitter
  },

  skills: [
    { name: 'React', level: 90 },           // ← Your skills
    { name: 'TypeScript', level: 85 },      // ← Your skills
    { name: 'Node.js', level: 80 },         // ← Your skills
    { name: 'UI/UX Design', level: 75 }     // ← Your skills
  ],

  projects: [
    {
      title: 'My Awesome Project',                    // ← Your project
      description: 'A description of what this project does.',     // ← Your description
      technologies: ['React', 'Node.js', 'MongoDB'],              // ← Your tech stack
      liveUrl: 'https://myproject.com',                           // ← Your live URL
      sourceUrl: 'https://github.com/janesmith/my-project'        // ← Your source URL
    }
    // Add more projects...
  ],

  about: {
    description: "I'm a passionate frontend developer with 3 years of experience creating modern web applications.", // ← Your about
    skillsToShow: 4  // ← Number of skills to show
  },

  contact: {
    description: "I'm always open to discussing new opportunities and interesting projects!" // ← Your contact message
  },

  seo: {
    title: "Jane Smith - Frontend Developer",  // ← Your SEO title
    description: "Jane Smith is a Frontend Developer specializing in React and modern web technologies.", // ← Your SEO description
    keywords: ["Frontend Developer", "React", "TypeScript", "Web Development"] // ← Your keywords
  },

  theme: {
    defaultColorScheme: "Blue"  // ← Your preferred color (Emerald, Blue, Purple, Pink, Orange, Cyan)
  }
};
```

## Quick Checklist

- [ ] Replace "Jane Smith" with your name
- [ ] Update your job title
- [ ] Add your email address
- [ ] Add your resume link
- [ ] Update social media links
- [ ] Replace skills with your own
- [ ] Add your projects
- [ ] Write your about description
- [ ] Customize your contact message
- [ ] Update SEO information
- [ ] Choose your preferred color scheme

## Skill Level Guidelines

Use these ranges for skill levels:
- **90-95**: Expert level
- **80-89**: Advanced level  
- **70-79**: Intermediate level
- **60-69**: Beginner level

## Example Skills

Here are some common skills you might want to include:
- React, Angular, Vue.js
- TypeScript, JavaScript, Python
- Node.js, Express, Django
- MongoDB, PostgreSQL, MySQL
- AWS, Docker, Kubernetes
- Git, CI/CD, Testing
- UI/UX Design, Figma
- HTML/CSS, Sass, Bootstrap 