# Personal Portfolio

A modern, minimalist portfolio website built with Angular 18. Features a sleek dark theme, smooth animations, and a clean, professional layout.

## ✨ Features

- **Minimalist Design**: Clean, uncluttered layout
- **Dark-First Theme**: Default dark theme with light theme toggle
- **Smooth Animations**: Elegant fade-in animations and hover effects
- **Responsive Design**: Optimized for all device sizes
- **Single Page Layout**: Seamless scrolling between 4 main sections
- **Professional Typography**: Inter font family for optimal readability
- **Accessibility**: WCAG compliant with proper focus management

## 🚀 Tech Stack

- **Framework**: Angular 18
- **Styling**: SCSS with CSS Custom Properties
- **Icons**: Font Awesome 6
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Angular CLI
- **Deployment**: Ready for GitHub Pages, Vercel, or Netlify

## 📁 Project Structure

```
src/app/
├── core/
│   └── services/               # Core services (theme, navigation, data)
├── shared/
│   └── components/             # Reusable UI components
├── features/
│   ├── hero/                   # Hero section
│   ├── about/                  # About section
│   ├── projects/               # Projects section
│   └── contact/                # Contact section
└── app.component.*             # Main app component
```

## 🎨 Sections

1. **Hero Section**: Introduction with gradient text and call-to-action
2. **About Section**: Personal description with skill tags
3. **Projects Section**: Showcase of featured projects
4. **Contact Section**: Contact information and social links

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

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `dist/lightning/browser` contents to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Vercel/Netlify
1. Connect your GitHub repository
2. The platform will automatically detect Angular and build the project
3. Deploy with zero configuration

## 🎯 Customization

Update your personal information in the respective component files:
- Hero section: `src/app/features/hero/`
- About section: `src/app/features/about/`
- Projects section: `src/app/features/projects/`
- Contact section: `src/app/features/contact/`

## 📄 License

This project is open source and available under the MIT License.

