# Top End Van Lines

A modern, high-performance static website for **Top End Van Lines**, built with HTML5, Tailwind CSS, and vanilla JavaScript.

---

## 📁 Project Directory Structure

```text
top-end-van-lines/
│
├── .htaccess                     # Apache clean URL routing & MIME headers
├── .gitignore                    # Git ignore file (node_modules, logs, OS files)
├── README.md                     # Project overview and developer guide
├── package.json                  # NPM packages & build scripts
├── package-lock.json             # Exact dependency lockfile
├── tailwind.config.js            # Tailwind CSS configuration and brand tokens
├── robots.txt                    # Search engine crawler directives
├── sitemap.xml                   # XML sitemap for SEO indexation
│
├── [Core HTML Pages]
│   ├── index.html                # Homepage & comprehensive moving routes
│   ├── about.html                # About Us & company history
│   ├── blog.html                 # Moving tips, guides, and cost factors
│   ├── contact-us.html           # Contact info & free estimate form
│   ├── privacy-policy.html       # Privacy policy
│   └── terms-of-service.html     # Terms of service
│
├── services/                     # Specialized Service Landing Pages (8 pages)
│   ├── car-moving.html           # Vehicle & automobile relocation
│   ├── interprovincial-moving.html # Interprovincial & nationwide moves
│   ├── local-moving.html         # Local residential moving
│   ├── long-distance-moving.html # Cross-Canada long distance moving
│   ├── office-moving.html        # Commercial & corporate relocations
│   ├── packaging-services.html   # Professional packing & supplies
│   ├── piano-moving.html         # Specialized piano transit
│   └── senior-moving.html        # Downsizing & senior relocation care
│
├── assets/                       # Public Static Media
│   ├── favicons/                 # Production Multi-Resolution Favicon Suite & PWA Manifest
│   │   ├── favicon.ico           # Multi-frame (16x16, 32x32, 48x48) ICO
│   │   ├── favicon.svg           # High-DPI Retina vector favicon
│   │   ├── favicon-32x32.png     # Standard browser tab PNG
│   │   ├── favicon-16x16.png     # Small bookmark/tab PNG
│   │   ├── apple-touch-icon.png  # 180x180 iOS Safari touch icon
│   │   ├── android-chrome-192x192.png # PWA Android icon
│   │   ├── android-chrome-512x512.png # High-res splash screen icon
│   │   └── site.webmanifest      # Progressive Web App manifest
│   ├── images/                   # Optimized WebP, PNG, and JPG images
│   └── logos/                    # Brand logos and social sharing cards
│
├── css/                          # Compiled Production Stylesheet
│   └── style.css                 # Minified production CSS (built via Tailwind)
│
├── js/                           # Client JavaScript
│   └── script.js                 # Quote calculations, mobile drawers, accordions
│
├── src/                          # Stylesheet Source
│   └── input.css                 # Tailwind directives, font imports, custom CSS
│
└── scripts/                      # Development & Build Tooling
    └── server.js                 # Local preview server
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation
Clone or navigate to the project directory and install development dependencies:
```bash
npm install
```

---

## 🛠️ Development & Build Scripts

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles and minifies `src/input.css` into `css/style.css` using Tailwind CSS. |
| `npm start` | Launches a local HTTP preview server at `http://localhost:3005`. |

### Watch Mode (Optional)
To watch for styling changes during active CSS editing:
```bash
npx tailwindcss -i ./src/input.css -o ./css/style.css --watch
```

---

## 🎨 Design System & Brand Palette

The site uses custom Tailwind tokens defined in `tailwind.config.js`:

- **Primary Red**: `#ED1C24` (`brandRed`)
- **Primary Blue**: `#087FCA` (`brandBlue`)
- **Navy Accent**: `#0B1F33` (`brandNavy`)
- **Dark Neutral**: `#111827` (`textDark`)
- **Body Text**: `#374151` (`textBody`)
- **Typography**: Inter (`'Inter', sans-serif`)

---

## 🌐 Server Routing & Deployment

- **Apache / Shared Hosting**: Uses `.htaccess` for automatic extensionless URL rewriting and transparent crawler fallbacks for `/favicon.ico`.
- **Static Hosting (Vercel, Netlify, Cloudflare Pages)**: Serves clean URLs natively based on the physical folder structure.
