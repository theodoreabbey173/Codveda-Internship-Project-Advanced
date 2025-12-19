# 🎨 Advanced Animations with GSAP - Level 3 Task 3

> **Codveda Technology Internship - Front-End Development**  
> Advanced animation project using GSAP (GreenSock Animation Platform)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Technologies Used](#-technologies-used)
4. [Installation Guide](#-installation-guide)
5. [File Structure](#-file-structure)
6. [How to Run](#-how-to-run)
7. [Animation Features Explained](#-animation-features-explained)
8. [Accessibility Features](#-accessibility-features)
9. [Customization Guide](#-customization-guide)
10. [Performance Optimization](#-performance-optimization)
11. [Browser Support](#-browser-support)
12. [Troubleshooting](#-troubleshooting)
13. [Resources & References](#-resources--references)

---

## 🎯 Project Overview

This project demonstrates advanced web animations using **GSAP (GreenSock Animation Platform)** with a focus on:
- **Smooth and performant animations** running at 60fps
- **Scroll-triggered animations** using ScrollTrigger plugin
- **Timeline-based complex animation sequences**
- **Interactive hover effects** and user-triggered animations
- **Accessibility compliance** with prefers-reduced-motion support
- **Responsive design** across all device sizes

---

## ✨ Features

### Animation Types Implemented:

1. **Hero Section Timeline Animation**
   - Staggered text reveals
   - Floating card animations with parallax effects
   - Mouse-tracking interactive elements

2. **Scroll-Based Animations**
   - Feature cards reveal on scroll
   - Gallery items with stagger effect
   - Navbar background change on scroll
   - Counter animations triggered by viewport

3. **Interactive Hover Effects**
   - Card scale and elevation on hover
   - Icon rotation animations
   - Button shine effects
   - Gallery image zoom

4. **Advanced Techniques**
   - Timeline sequencing for complex animations
   - Yoyo and repeat animations for floating effects
   - Easing functions for natural motion
   - Performance optimization with RAF (RequestAnimationFrame)

---

## 🛠 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **HTML5** | - | Structure and semantic markup |
| **CSS3** | - | Styling, Flexbox, Grid, CSS Variables |
| **JavaScript (ES6+)** | - | Animation logic and interactivity |
| **GSAP** | 3.12.5 | Core animation library |
| **ScrollTrigger** | 3.12.5 | Scroll-based animation plugin |

---

## 📦 Installation Guide

### Step 1: Download or Clone the Project

**Option A: Download ZIP**
1. Download the project files
2. Extract to your desired location
3. Navigate to the project folder

**Option B: Clone with Git**
```bash
git clone <your-repository-url>
cd advanced-animations-gsap
```

### Step 2: Organize Your Files

Create the following file structure:

```
advanced-animations-gsap/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript animations
└── README.md          # This file
```

### Step 3: Install Dependencies

**No npm installation required!** This project uses CDN links for GSAP libraries.

The following libraries are loaded via CDN in `index.html`:
- GSAP Core: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`

---

## 📁 File Structure

```
📦 advanced-animations-gsap
 ┣ 📜 index.html         - Main HTML structure
 ┣ 📜 styles.css         - All styling and responsive design
 ┣ 📜 script.js          - GSAP animations and interactivity
 ┗ 📜 README.md          - Documentation (you are here!)
```

### File Descriptions:

**index.html**
- Semantic HTML5 structure
- Accessibility attributes (ARIA labels, roles)
- Navigation, Hero, Features, Gallery, Counter, Contact sections
- CDN links to GSAP libraries

**styles.css**
- CSS custom properties (variables) for theming
- Flexbox and Grid layouts
- Responsive design with media queries
- Accessibility: prefers-reduced-motion support
- Smooth transitions and hover states

**script.js**
- GSAP animation initialization
- ScrollTrigger setup
- Event listeners for interactivity
- Accessibility checks
- Performance optimizations

---

## 🚀 How to Run

### Method 1: Using Live Server (Recommended)

1. **Install VS Code** (if not already installed)
2. **Install Live Server Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install by Ritwick Dey

3. **Launch the Project**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your default browser will open automatically

### Method 2: Direct Browser Open

1. Navigate to the project folder
2. Double-click `index.html`
3. The page will open in your default browser

### Method 3: Using Python Server

```bash
# Python 3
python -m http.server 8000

# Then open browser to:
http://localhost:8000
```

### Method 4: Using Node.js http-server

```bash
# Install globally (one time)
npm install -g http-server

# Run in project directory
http-server

# Open browser to displayed URL
```

---

## 🎬 Animation Features Explained

### 1. Hero Timeline Animation

**Location**: Hero section at page top  
**Trigger**: On page load  
**Effect**: Text lines slide up sequentially

```javascript
// Code reference from script.js
tl.from('.hero-line span', {
    y: 100,           // Starts 100px below
    opacity: 0,       // Invisible
    duration: 1,      // 1 second animation
    stagger: 0.2      // 0.2s delay between each line
})
```

**How it works**: Each line of text is animated with a stagger effect, creating a cascading reveal.

### 2. Floating Cards with Parallax

**Location**: Right side of hero section  
**Trigger**: On page load + Mouse movement  
**Effect**: Cards float continuously and follow mouse

```javascript
// Continuous floating
gsap.to(card, {
    y: '+=30',                    // Move up/down 30px
    duration: 2 + index,          // Different speeds
    repeat: -1,                   // Infinite loop
    yoyo: true                    // Reverse direction
})
```

**How it works**: Uses yoyo and repeat to create endless floating motion. Mouse position adds parallax effect.

### 3. Scroll-Triggered Feature Cards

**Location**: Features section  
**Trigger**: When scrolling into view  
**Effect**: Cards fade and slide up with stagger

```javascript
createAnimation(card, {
    y: 0,              // Move to original position
    opacity: 1,        // Fade in
    duration: 0.8,
    delay: index * 0.1 // Stagger by index
}, {
    trigger: card,
    start: 'top 80%',  // Start when card is 80% down viewport
    toggleActions: 'play none none reverse'
})
```

**How it works**: ScrollTrigger detects when elements enter viewport, then plays animations.

### 4. Gallery Stagger Animation

**Location**: Gallery section  
**Trigger**: Scroll into view  
**Effect**: Items appear in sequence with scale

```javascript
gsap.from(galleryItems, {
    opacity: 0,
    y: 100,            // Start 100px below
    scale: 0.8,        // Start at 80% size
    stagger: 0.15,     // 0.15s between each item
    scrollTrigger: { /*...*/ }
})
```

**How it works**: All items animate together but with staggered timing for visual appeal.

### 5. Counter Animation

**Location**: Counter section  
**Trigger**: Scroll into view  
**Effect**: Numbers count up from 0 to target

```javascript
gsap.to(obj, {
    val: target,       // Count to target number
    duration: 2,
    onUpdate: () => {
        counter.textContent = Math.ceil(obj.val)
    }
})
```

**How it works**: Animates a number value and updates DOM on each frame.

### 6. Button Shine Effect

**Location**: Contact button  
**Trigger**: Automatic loop  
**Effect**: Shine sweeps across button

```javascript
gsap.to(buttonShine, {
    left: '100%',      // Move from -100% to 100%
    duration: 2,
    repeat: -1,        // Infinite
    repeatDelay: 3     // 3s pause between repeats
})
```

**How it works**: A gradient element slides across the button continuously.

---

## ♿ Accessibility Features

### Prefers-Reduced-Motion Support

**What it does**: Respects users who have enabled reduced motion in their OS settings.

**Implementation**:
```javascript
const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
    // Skip animations, show end state immediately
    gsap.set(target, vars);
}
```

**How to test**:
- **Windows**: Settings > Ease of Access > Display > Show animations
- **Mac**: System Preferences > Accessibility > Display > Reduce motion
- **Linux**: Varies by distribution

### Other Accessibility Features:

✅ **ARIA Labels**: All interactive elements have descriptive labels  
✅ **Keyboard Navigation**: All buttons and links are keyboard accessible  
✅ **Focus Indicators**: Visible focus states for keyboard users  
✅ **Semantic HTML**: Proper heading hierarchy and landmark regions  
✅ **Color Contrast**: Meets WCAG AA standards  
✅ **Tab Index**: Logical tab order through content

---

## 🎨 Customization Guide

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Change to your brand color */
    --secondary-color: #8b5cf6;    /* Secondary brand color */
    --dark-bg: #0f172a;            /* Background color */
    --light-text: #f1f5f9;         /* Text color */
    --accent: #ec4899;             /* Accent color */
    --card-bg: #1e293b;            /* Card background */
}
```

### Adjust Animation Speed

In `script.js`, modify duration values:

```javascript
// Make animations faster
duration: 0.5  // Instead of 1

// Make animations slower
duration: 2    // Instead of 1
```

### Change Animation Easing

```javascript
// Available easing functions:
ease: 'power1.out'    // Gentle deceleration
ease: 'power2.out'    // Medium deceleration
ease: 'power3.out'    // Strong deceleration
ease: 'back.out(1.7)' // Overshoot effect
ease: 'elastic.out'   // Bouncy effect
ease: 'bounce.out'    // Bounce effect
```

### Modify Scroll Trigger Points

```javascript
scrollTrigger: {
    start: 'top 80%',    // When top of element is 80% down viewport
    end: 'bottom 20%',   // When bottom is 20% down viewport
    // Try: 'top center', 'top bottom', 'center center'
}
```

---

## ⚡ Performance Optimization

### Built-in Optimizations:

1. **RequestAnimationFrame**: GSAP uses RAF for smooth 60fps animations
2. **Hardware Acceleration**: Transforms are GPU-accelerated
3. **Debouncing**: Mouse events are optimized
4. **Lazy Loading**: Animations initialize only when needed
5. **Pause on Hidden**: Animations pause when tab is not visible

```javascript
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();  // Save CPU when tab hidden
    } else {
        gsap.globalTimeline.resume();
    }
});
```

### Tips for Better Performance:

✅ Use `transform` and `opacity` (GPU-accelerated)  
❌ Avoid animating `width`, `height`, `top`, `left` (CPU-bound)

✅ Keep animation complexity reasonable  
❌ Don't animate too many elements at once

✅ Use `will-change` CSS property sparingly  
✅ Test on lower-end devices

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Opera | 76+ | ✅ Full Support |

**Mobile Browsers**:
- iOS Safari 14+: ✅
- Chrome Android 90+: ✅
- Samsung Internet: ✅

---

## 🔧 Troubleshooting

### Issue: Animations not working

**Solution 1**: Check browser console for errors
- Press F12 to open Developer Tools
- Look for red error messages

**Solution 2**: Verify GSAP is loaded
```javascript
// Add to script.js top
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
```

**Solution 3**: Check internet connection
- GSAP loads from CDN, requires internet
- For offline use, download GSAP files locally

### Issue: Animations are choppy

**Solution 1**: Reduce complexity
- Decrease number of animated elements
- Simplify animation properties

**Solution 2**: Check system performance
- Close other applications
- Test on different device

**Solution 3**: Disable other browser extensions
- Ad blockers can sometimes interfere
- Try in incognito/private mode

### Issue: Scroll animations not triggering

**Solution 1**: Check ScrollTrigger registration
```javascript
gsap.registerPlugin(ScrollTrigger);  // Must be at top
```

**Solution 2**: Verify trigger elements exist
```javascript
const element = document.querySelector('.feature-card');
console.log('Element found:', element);
```

**Solution 3**: Adjust start/end points
```javascript
scrollTrigger: {
    markers: true,  // Shows visual markers for debugging
    start: 'top 80%',
    end: 'bottom 20%'
}
```

### Issue: Mobile menu not working

**Solution**: Check if mobile CSS is applied
- Resize browser window to mobile width
- Verify menu-toggle button is visible
- Check JavaScript event listeners

---

## 📚 Resources & References

### Official Documentation:
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Plugin](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)

### Learning Resources:
- [GSAP Getting Started](https://greensock.com/get-started/)
- [GSAP Cheat Sheet](https://greensock.com/cheatsheet/)
- [ScrollTrigger Demos](https://codepen.io/collection/AEbkkJ)

### Community & Support:
- [GSAP Forums](https://greensock.com/forums/)
- [CodePen GSAP Examples](https://codepen.io/search/pens?q=gsap)
- [Stack Overflow GSAP Tag](https://stackoverflow.com/questions/tagged/gsap)

### Additional Tools:
- **Chrome DevTools**: For debugging and performance
- **VS Code**: Recommended code editor
- **Live Server**: For local development server

---

## 🎓 What You Learned

By completing this task, you've learned:

1. ✅ **GSAP Core Concepts**
   - Timeline animations
   - Tween properties
   - Easing functions
   - Stagger animations

2. ✅ **ScrollTrigger Plugin**
   - Scroll-based animations
   - Trigger points and actions
   - Pin and scrub effects

3. ✅ **Performance Optimization**
   - GPU acceleration
   - RequestAnimationFrame
   - Reduced motion support

4. ✅ **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Reduced motion preferences

5. ✅ **Modern JavaScript**
   - ES6+ syntax
   - Event handling
   - DOM manipulation

---

## 📝 Submission Checklist

Before submitting, ensure:

- [ ] All three files (HTML, CSS, JS) are properly organized
- [ ] Animations work smoothly across different browsers
- [ ] Mobile responsiveness is tested
- [ ] Accessibility features are implemented
- [ ] Code is well-commented
- [ ] README.md is included and complete
- [ ] Project uploaded to GitHub with descriptive commits
- [ ] LinkedIn post created with:
  - [ ] Video demonstration
  - [ ] GitHub repository link
  - [ ] Hashtags: #CodvedaAchievements #CodvedaProjects
  - [ ] Tag: @Codveda

---

## 🤝 Credits

## 📧 Contact

For questions or feedback about this project:
- **LinkedIn:** [My LinkedIn Profile](https://linkedin.com/in/theodore-abbey)
- **GitHub:** [My GitHub Profile](https://github.com/theodoreabbey173)
- **Email:** theodoreabbey174@gmail.com
- **Portfolio:** [My Portfolio Website](https://your-portfolio.com)
  
**Internship**: Codveda Technology  
**Position**: Front-End Development Intern  
**Task**: Level 3 - Task 3: Advanced Animations  


**Technologies**: HTML5, CSS3, JavaScript, GSAP 3.12.5

---

## 📞 Support

For questions or issues:
- **Email**: support@codveda.com
- **Website**: www.codveda.com
- **LinkedIn**: @Codveda

---

**Happy Animating! 🎨✨**

---

## 📄 License

This project is created for educational purposes as part of the Codveda Technology internship program.