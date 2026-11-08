# Siisti360 — Siivouspalvelut Helsinki, Espoo & Vantaa

Modern, high-performance web application for **Siisti360** — professional residential and commercial cleaning services across the Helsinki Metropolitan Area (Helsinki, Espoo, Vantaa).

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)
- **Testing**: Node test runner + [tsx](https://github.com/privatenumber/tsx)

---

## 🛠️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run unit tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📦 How to Push to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Siisti360 website"
   git branch -M main
   ```

2. **Create a new repository on GitHub:**
   - Go to [GitHub](https://github.com/new).
   - Name your repository (e.g., `siisti360`).
   - Leave "Initialize this repository with a README" **unchecked**.
   - Click **Create repository**.

3. **Link your local repository and push:**
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

---

## 🌐 How to Deploy to Vercel (Live Website)

### Option A: Via Vercel Web Dashboard (Recommended & Easiest)

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Under **"Import Git Repository"**, find and select your `siisti360` repository.
4. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**.
6. In ~30–45 seconds, your live production URL will be ready (e.g., `https://siisti360.vercel.app`).
7. Every time you push changes to your `main` branch on GitHub, Vercel will automatically re-deploy your site.

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```
Follow the prompts (accept default settings) to deploy immediately.

---

## ⚙️ Configuration Files Included

- `vercel.json`: Handles SPA client-side routing so all nested paths (`/services`, `/pricing`, `/locations/helsinki`, etc.) resolve seamlessly without 404 errors on page refresh.
- `.gitignore`: Excludes `node_modules`, `dist`, `.vercel`, and local secrets from being committed.
