# Portfolio Configuration Guide

## Overview
This portfolio template is designed to be easily customizable. All personal information, projects, skills, and content can be modified through a single configuration file.

## Quick Start
1. Open `src/app/core/config/portfolio.config.ts`
2. Replace the placeholder information with your own
3. Save the file and your portfolio will update automatically

## Configuration File Structure

### Personal Information
```typescript
personal: {
  name: "Your Name",
  title: "Your Title",
  greeting: "Hi, I'm",
  description: "Your brief description",
  email: "your.email@example.com",
  resumeUrl: "https://drive.google.com/your-resume-link"
}
```

### Social Links
```typescript
social: {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourhandle"
}
```

### Skills
```typescript
skills: [
  { name: 'Skill Name', level: 95 },
  // Add more skills...
]
```

**Skill Level Guidelines:**
- 90-95: Expert level
- 80-89: Advanced level
- 70-79: Intermediate level
- 60-69: Beginner level

### Projects
```typescript
projects: [
  {
    title: 'Project Title',
    description: 'Project description',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    liveUrl: 'https://project-url.com', // Optional
    sourceUrl: 'https://github.com/username/project' // Optional
  }
]
```

### About Section
```typescript
about: {
  description: "Your detailed about description",
  skillsToShow: 6 // Number of skills to display in about section
}
```

### Contact Section
```typescript
contact: {
  description: "Your contact message"
}
```

### SEO & Meta
```typescript
seo: {
  title: "Your Name - Your Title",
  description: "SEO description for search engines",
  keywords: ["keyword1", "keyword2", "keyword3"]
}
```

### Theme
```typescript
theme: {
  defaultColorScheme: "Emerald" // Options: Emerald, Blue, Purple, Pink, Orange, Cyan
}
```

## Step-by-Step Customization

### 1. Update Personal Information
Replace the personal information in the `personal` section:
```typescript
personal: {
  name: "Jane Smith",
  title: "Frontend Developer",
  greeting: "Hello, I'm",
  description: "I create beautiful and functional web experiences.",
  email: "jane.smith@example.com",
  resumeUrl: "https://drive.google.com/file/d/YOUR_RESUME_ID/view"
}
```

### 2. Add Your Social Links
Update the social media links:
```typescript
social: {
  linkedin: "https://linkedin.com/in/janesmith",
  github: "https://github.com/janesmith",
  twitter: "https://twitter.com/janesmith"
}
```

### 3. Customize Your Skills
Replace the skills array with your own:
```typescript
skills: [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'UI/UX Design', level: 75 }
]
```

### 4. Add Your Projects
Replace the projects with your own work:
```typescript
projects: [
  {
    title: 'My Awesome Project',
    description: 'A description of what this project does and what technologies were used.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    liveUrl: 'https://myproject.com',
    sourceUrl: 'https://github.com/janesmith/my-project'
  }
]
```

### 5. Update About Section
Write your own about description:
```typescript
about: {
  description: "I'm a passionate frontend developer with 3 years of experience creating modern web applications. I love working with React and TypeScript to build scalable solutions.",
  skillsToShow: 4
}
```

### 6. Customize Contact Message
Update the contact section message:
```typescript
contact: {
  description: "I'm always open to discussing new opportunities, interesting projects, and creative ideas. Let's connect!"
}
```

### 7. Update SEO Information
Optimize for search engines:
```typescript
seo: {
  title: "Jane Smith - Frontend Developer",
  description: "Jane Smith is a Frontend Developer specializing in React, TypeScript, and modern web technologies.",
  keywords: ["Frontend Developer", "React", "TypeScript", "Web Development", "UI/UX"]
}
```

### 8. Choose Your Color Scheme
Select your preferred default color:
```typescript
theme: {
  defaultColorScheme: "Blue" // or "Purple", "Pink", "Orange", "Cyan"
}
```

## Advanced Customization

### Adding New Social Platforms
To add new social platforms (like Instagram, YouTube, etc.):

1. Update the `PortfolioConfig` interface:
```typescript
social: {
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string; // Add new platform
  youtube: string;   // Add new platform
}
```

2. Add the data to your configuration:
```typescript
social: {
  linkedin: "https://linkedin.com/in/janesmith",
  github: "https://github.com/janesmith",
  twitter: "https://twitter.com/janesmith",
  instagram: "https://instagram.com/janesmith",
  youtube: "https://youtube.com/@janesmith"
}
```

3. Update the contact section template to include the new links.

### Adding Project Images
To add images to your projects:

1. Place your project images in `src/assets/images/projects/`
2. Update the project configuration:
```typescript
{
  title: 'My Project',
  description: 'Project description',
  technologies: ['React', 'Node.js'],
  image: 'assets/images/projects/my-project.png',
  liveUrl: 'https://myproject.com',
  sourceUrl: 'https://github.com/username/project'
}
```

### Customizing the Number of Skills Shown
In the about section, you can control how many skills are displayed:
```typescript
about: {
  description: "Your description",
  skillsToShow: 8 // Show 8 skills instead of 6
}
```

## Tips for Best Results

1. **Keep descriptions concise** - Aim for 1-2 sentences for project descriptions
2. **Use realistic skill levels** - Keep skill levels between 60-95 for realistic representation
3. **Include live URLs** - Always provide live project URLs when possible
4. **Optimize images** - Use compressed images for better performance
5. **Test your links** - Ensure all social and project links work correctly
6. **Update regularly** - Keep your portfolio current with your latest work

## File Structure
```
src/app/core/config/
├── portfolio.config.ts          # Main configuration file
└── index.ts                     # Export file (if needed)

src/app/core/services/
├── data.service.ts              # Service that uses the configuration
└── color-scheme.service.ts      # Theme service
```

## Support
If you need help customizing your portfolio:
1. Check the configuration file comments
2. Review the TypeScript interfaces for proper typing
3. Test changes in development mode
4. Ensure all URLs are valid and accessible

## Deployment
After customizing your portfolio:
1. Test all functionality locally
2. Update the `index.html` meta tags if needed
3. Build for production: `npm run build`
4. Deploy to your preferred hosting platform 