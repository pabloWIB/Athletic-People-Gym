[![68shots-so.png](https://i.postimg.cc/9QKdgh3g/68shots-so.png)](https://postimg.cc/mP31hKg7)
# Athletic People Gym

A modern, responsive fitness center website providing comprehensive gym services and member management. Built as a static website with clean design and user-focused experience for fitness enthusiasts.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with responsive design
- **Deployment**: Static hosting compatible
- **Dependencies**: None (pure static implementation)

## Features

- **Member Login System**: User authentication interface with password recovery
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, athletic-themed design suitable for fitness branding
- **Multi-language Support**: Spanish language implementation (expandable)
- **Member Portal Access**: Dedicated login area for gym members
- **Password Recovery**: "Forgot Password" functionality interface
- **Mobile-First Approach**: Optimized for mobile and tablet users
- **Fast Loading**: Lightweight static implementation for optimal performance

## Project Structure

```
athletic-people-gym/
├── index.html              # Main landing page
├── login.html              # Member login page
├── css/
│   ├── styles.css         # Main stylesheet
│   ├── responsive.css     # Mobile responsiveness
│   ├── login.css          # Login page specific styles
│   └── components.css     # Component-specific styles
├── js/
│   ├── main.js           # Core functionality
│   ├── auth.js           # Authentication handling
│   ├── form-validation.js # Form validation logic
│   └── navigation.js     # Navigation interactions
├── images/
│   ├── gym/              # Gym facility photos
│   ├── equipment/        # Equipment images
│   ├── trainers/         # Staff photos
│   └── logo/             # Brand assets
├── pages/
│   ├── services.html     # Gym services
│   ├── membership.html   # Membership plans
│   ├── schedule.html     # Class schedules
│   ├── trainers.html     # Personal trainers
│   └── contact.html      # Contact information
└── README.md
```

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pabloWIB/Athletic-People-Gym.git
   cd Athletic-People-Gym
   ```

2. **Open locally**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server for better development experience:
   ```bash
   # Using Node.js http-server
   npx http-server . -p 3000
   
   # Using PHP built-in server
   php -S localhost:3000
   
   # Using any other static file server
   ```

3. **Start developing**
   - Edit HTML files for content changes
   - Modify CSS files for styling updates
   - Update JavaScript files for functionality enhancements

### File Serving

For optimal development experience, serve files through a local server rather than opening HTML files directly to avoid CORS issues with form submissions or resource loading.

## Deployment

### Static Hosting Platforms

**Netlify** (Recommended)
1. Connect your GitHub repository
2. Set build command: `# none required`
3. Set publish directory: `./`
4. Deploy automatically on git push
5. Configure form handling for contact forms

**Vercel**
1. Import project from GitHub
2. Framework preset: Other
3. Build command: Leave empty
4. Output directory: `./`

**GitHub Pages**
1. Go to repository Settings
2. Navigate to Pages section
3. Select source: Deploy from branch
4. Choose main branch and root folder

**Other Options**
- Firebase Hosting
- AWS S3 + CloudFront
- Surge.sh
- Cloudflare Pages

## Customization

### Content Updates

**Gym Information**
- Update gym name and branding throughout HTML files
- Modify contact information in footer and contact pages
- Update social media links and gym location details
- Edit membership plans and pricing in relevant sections

**Services and Classes**
- Update class schedules in `schedule.html`
- Modify service descriptions and pricing
