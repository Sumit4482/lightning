# Personal Portfolio - Sumit

A modern, minimalist portfolio website inspired by Anthony Fu's design aesthetic, built with Angular 18. Features a sleek dark theme, smooth animations, and a clean, professional layout.

## ✨ Features

- **Minimalist Design**: Clean, uncluttered layout inspired by Anthony Fu's portfolio
- **Dark-First Theme**: Default dark theme with light theme toggle
- **Smooth Animations**: Elegant fade-in animations and hover effects
- **Responsive Design**: Optimized for all device sizes
- **Single Page Layout**: Seamless scrolling between sections
- **Professional Typography**: Inter font family for optimal readability
- **Accessibility**: WCAG compliant with proper focus management
- **SSR Ready**: Server-side rendering support for better SEO

## 🎨 Design Philosophy

This portfolio follows Anthony Fu's design principles:
- **Minimalism**: Clean, uncluttered interface
- **Typography**: Clear hierarchy and excellent readability
- **Color**: Subtle gradients and high contrast
- **Animation**: Smooth, purposeful transitions
- **Spacing**: Generous whitespace for breathing room

## 🚀 Tech Stack

- **Framework**: Angular 18
- **Styling**: SCSS with CSS Custom Properties
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Angular CLI
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── app/
│   ├── app.component.html      # Main portfolio template
│   ├── app.component.scss      # Comprehensive styling with themes
│   ├── app.component.ts        # Component logic and data
│   └── ...
├── assets/                     # Static assets
├── styles.scss                 # Global styles
└── index.html                  # HTML template with meta tags
```

## 🎨 Design Features

### Layout
- **Hero Section**: Large, impactful introduction with gradient text
- **About Section**: Clean description with skill tags
- **Projects Section**: Numbered project cards with hover effects
- **Contact Section**: Simple contact methods with smooth interactions

### Theming
- **Dark Theme**: Primary dark theme with green accents (#00dc82)
- **Light Theme**: Clean light theme with blue accents
- **Smooth Transitions**: 0.3s ease transitions between themes
- **Persistent Storage**: Theme preference saved in localStorage

### Animations
- **Fade-in Effects**: Staggered animations for sections
- **Hover Effects**: Subtle lift and color transitions
- **Background Elements**: Floating gradient circles
- **Smooth Scrolling**: Seamless navigation between sections

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd lightning

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run serve:ssr:lightning` - Serve SSR version

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Angular and build the project
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist/lightning/browser` folder to Netlify
3. Configure build settings if needed

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist/lightning/browser` contents to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Manual Deployment
```bash
# Build the project
npm run build

# The built files are in dist/lightning/browser/
# Upload these files to your hosting provider
```

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Desktop**: Full layout with all sections visible
- **Tablet**: Adjusted spacing and typography
- **Mobile**: Single column layout with touch-optimized interactions

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant color ratios
- **Reduced Motion**: Respects user's motion preferences

## 🎯 Customization

### Personal Information
Update the following in `src/app/app.component.ts`:
- Name and title in the hero section
- Skills and proficiency levels
- Project details and descriptions
- Contact information

### Styling
- Colors: Modify CSS custom properties in `src/app/app.component.scss`
- Fonts: Update Google Fonts import in `src/index.html`
- Layout: Adjust spacing and typography in SCSS

### Content
- Replace placeholder content with your actual information
- Add your own projects and skills
- Update contact links and social media

## 🎨 Design Inspiration

This portfolio draws inspiration from:
- **Anthony Fu's Portfolio**: Minimalist design and typography
- **Modern Web Standards**: Clean, accessible, and performant
- **Developer Aesthetics**: Code-friendly color schemes and layouts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the repository.

---

