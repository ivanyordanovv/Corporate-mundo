# Corporate Mundo – PUSH PUSH PUSH

A meme site themed around Dr. Mundo's Corporate skin from League of Legends. Go in. Go forward. Kill everything.

## What's inside

- **Home**: Hero ("PUSH PUSH PUSH") + product grid (Suitcase, Telephone, Light Snack, Big Snack)
- **My Profile**: Dashboard (pending orders: 0) and My Orders with downloadable PDF receipts
- No auth, no database – everything hardcoded

## Generate receipt PDFs

From the project root:

```bash
pip install -r scripts/requirements.txt   # or: python3 -m pip install -r scripts/requirements.txt
python3 scripts/generate_receipts.py
```

This creates `public/receipts/MUNDO-001.pdf` and `MUNDO-002.pdf`. Commit them so they’re included in the build and available for “Download receipt” on My Profile.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **HashRouter**, so routes are `/#/` and `/#/profile`.

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to GitHub Pages

### Option 1: GitHub Actions (recommended)

1. Create a repo and push this code.
2. In repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` will run on push to `main`: it builds the app and deploys `dist/` to GitHub Pages.
4. Before the first deploy: in `vite.config.js`, set `base: '/YOUR-REPO-NAME/'` (e.g. `base: '/corporate-mundo/'`) so assets load correctly at `https://<username>.github.io/<repo-name>/`.

### Option 2: gh-pages package

```bash
npm run deploy
```

Then in repo **Settings → Pages**, choose the `gh-pages` branch and root. Ensure `base` in `vite.config.js` matches your repo name as above.

## Live site

After deployment, your site will be at:

**https://\<username>.github.io/\<repo-name>/**  
(e.g. `https://iyordanov.github.io/corporate-mundo/`)
