# 🚀 Karthick Kalaivanan K – Portfolio
# file:///C:/Users/Karthick/OneDrive/Desktop/myPortfolio/index.html
A **modern, responsive portfolio website** built with pure HTML, CSS, and JavaScript. Designed for professional interviews and GitHub showcasing.

![Portfolio Preview](./preview.png)

## ✨ Features

- 🎨 **Stunning Dark Theme** with glassmorphism & gradient effects
- ⌨️ **Typewriter animation** cycling through developer roles
- 🎭 **Scroll reveal animations** & 3D card tilt effects
- 📊 **Animated stat counters** for key metrics
- 📱 **Fully Responsive** – mobile, tablet & desktop
- 🌐 **Vercel-ready** deployment configuration
- 📬 **Contact form** with animated feedback

## 📁 Project Structure

```
myPortfolio/
├── index.html      # Main HTML file (all sections)
├── style.css       # Styles (dark theme, animations, responsive)
├── script.js       # Interactivity (typewriter, scroll, counter, form)
├── vercel.json     # Vercel deployment config
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## 🔧 Sections

| Section | Description |
|---|---|
| **Hero** | Name, role typewriter, CTA buttons, social links |
| **About** | Bio, animated stats, quick info |
| **Skills** | Programming, backend, frontend, DB, cloud, tools |
| **Projects** | Web-Based Note Taking System, GitLytics |
| **Experience** | Internship, leadership roles, hackathons |
| **Certifications** | Oracle, NPTEL, Google, AWS, Figma |
| **Contact** | Email form + social media links |

## 🚀 Deploy to Vercel

### Option 1 – Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 2 – Vercel Dashboard (Recommended)
1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click **Deploy** — done! 🎉

## 📤 Push to GitHub

```bash
git init
git add .
git commit -m "🚀 Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/myPortfolio.git
git push -u origin main
```

## 📬 Enable Real Email on Contact Form

Replace the `setTimeout` simulation in `script.js` with [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com) for live email delivery.

---

> Built with ❤️ by **Karthick Kalaivanan K** | [LinkedIn](https://www.linkedin.com/in/karthick22102004)
