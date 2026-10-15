# WEBCORE STUDIOS — Premium Agency Portfolio Website

A complete, responsive, interactive, production-ready website for a high-end web design & development agency. Engineered to transform the **Google Stitch** prototype and **Obsidian Kinetic** design system into a production-grade digital experience.

---

## 🌟 Key Features

- **Obsidian Kinetic Aesthetic**: Preserves the obsidian void canvas (`#0B0D12`), frosted glassmorphism (`backdrop-blur-16px`), directional micro-borders (`1px linear-gradient`), and optical ambient glows.
- **100% Responsive**: Calibrated for desktop (1440px+), laptop (1024px+), tablet (768px - 1023px), and mobile (<768px) with a dedicated slide-out drawer menu.
- **Two Real Client Case Studies**:
  - **Dr. Sandesh** — Dental / Implantology Website ([https://www.drsandeshimplantdentist.com/](https://www.drsandeshimplantdentist.com/))
  - **Dr. Swapna** — Women's Gynecology & Fertility Clinic Website ([https://www.drswapnagynfertility.com/](https://www.drswapnagynfertility.com/))
- **Interactive Case Study Modal Dialog**: Click any project mockup or "View Case Study" to open an interactive modal with challenges, solutions, quantifiable metrics, tech stack, and direct live links.
- **Centralized Agency Configuration**: Edit agency identity, email, WhatsApp concierge, and portfolio data in a single file: `assets/js/agency-config.js`.
- **Client-Side Validated Contact Form**: Real-time validation for Name, Email syntax, Practice Name, and Project Scope with clear error states and seamless plug-and-play endpoint integration.
- **Direct WhatsApp Concierge**: Instant messenger integration with prefilled, URL-encoded inquiry messages.
- **Clean & Streamlined Structure**: Testimonials section removed as requested for a focused, high-authority presentation.

---

## 📂 Project Structure

```text
webcore_agency_portfolio/
├── index.html                   # Primary HTML5 entry point & semantic section architecture
├── package.json                 # Optional npm workflow & scripts
├── vercel.json                  # Production headers & static asset caching rules
├── .gitignore                   # Version control exclusions
├── .env.example                 # Safe environment variable placeholders
├── README.md                    # Setup, customization & deployment documentation
│
└── assets/
    ├── css/
    │   └── style.css            # Custom glassmorphism, micro-borders & animations
    │
    ├── js/
    │   ├── agency-config.js     # Single source of truth for all agency & project data
    │   └── main.js              # Interactivity: case study modal, mobile drawer, validation
    │
    └── images/
        ├── favicon.svg          # Brand vector favicon
        ├── agency-preview.png   # Full-page high-resolution design reference
        │
        └── projects/
            ├── dr-sandesh-dental.png     # Dr. Sandesh dental clinic UI mockup (1376x768)
            └── dr-swapna-gynecology.png  # Dr. Swapna gynecology clinic UI mockup (1376x768)
```

---

## 🚀 Running the Website Locally

You can run the project using **npm**, **Python**, or simply by opening `index.html` in any browser.

### Option 1: Using npm (Node.js)
1. Install development dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   # or
   npm start
   ```
3. Open your browser at `http://localhost:8000`.

### Option 2: Using Python (Recommended if Node.js is not installed)
Run Python's built-in web server in the project folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

### Option 3: Direct File Opening
Double-click `index.html` to open it directly in Chrome, Edge, Safari, or Firefox without any server.

---

## 🏗️ Production Build & Deployment

Since this project uses a pure, zero-build static architecture with Tailwind CDN and vanilla ES JavaScript, creating a production build simply means deploying the clean folder directly to your hosting provider.

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub or upload the folder to your Vercel dashboard.
2. In Vercel, select **Add New Project** and import the repository.
3. Framework Preset: **Other** (Static HTML).
4. Build Command: *leave empty*
5. Output Directory: *leave empty* (root)
6. Click **Deploy**. Vercel will automatically read `vercel.json` for caching and security headers.

### Deploying to GitHub Pages
1. Push the files to a repository on GitHub.
2. In **Settings** > **Pages**, set **Source** to **Deploy from a branch** (`main` branch, `/ (root)` folder).
3. Click **Save**.

---

## ⚙️ Configuration Guide

All agency copy, WhatsApp numbers, email addresses, and portfolio case studies are managed in:
`assets/js/agency-config.js`

### 1. Agency Name & Tagline
```javascript
brand: {
  name: "WEBCORE",
  suffix: "STUDIOS",
  legalName: "WEBCORE STUDIOS GMBH",
  tagline: "Design-led. Performance-focused. Built for growth.",
  locations: "Zurich / New York / Tokyo"
}
```

### 2. WhatsApp Concierge Setup
Enter your phone number with country code (digits only, no spaces or symbols):
```javascript
contact: {
  whatsappNumber: "15550192834",
  whatsappPrefillMessage: "Hello WEBCORE STUDIOS team, I'd like to discuss a custom web design and development project for my business."
}
```

### 3. Contact Form Backend Setup
By default, the contact form operates in **client-demo mode** with full field validation, error alerts, and a confirmation toast.

To send submissions directly to your email:
1. Register for a free endpoint at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Enter your endpoint URL in `assets/js/agency-config.js`:
   ```javascript
   contact: {
     formEndpoint: "https://formspree.io/f/your_form_id"
   }
   ```
The frontend automatically handles the asynchronous POST request, loading state, and error handling.

### 4. Updating Client Projects
Edit the `projects` array in `agency-config.js` to customize titles, descriptions, live URLs, or impact statistics for Dr. Sandesh and Dr. Swapna.

---

## 🛡️ Security & Clean Code

- **Zero Secrets in Code**: No API keys, credentials, or `.env` files are included in the frontend.
- **Safe Template**: `.env.example` provides safe placeholder values for environment variables.
- **Accessible & Tested**: Semantic HTML5 landmarks, skip-link, and accessible modal navigation.
