# AI Insider News - Production Ready Platform

## Overview
AI Insider News is a fully automated, responsive news platform dedicated to the latest in Artificial Intelligence. It features an automated content collection engine, a premium mobile-first frontend, and a comprehensive admin panel.

## Features
- **Automated Collection**: Intelligent scrapers for arXiv, tech blogs, and search APIs.
- **Content Simplification**: (Simulated) NLP simplifies complex research for layman readers.
- **Responsive UI**: A glassmorphic, premium design built with Tailwind CSS.
- **Admin Dashboard**: Full CRUD capabilities for manual content review and publishing.
- **SEO Optimized**: Meta tags and semantic structure for maximum reach.

## Folder Structure
- `/src`: Frontend source code (HTML, JS, CSS).
- `/admin`: Admin interface for content management.
- `/scripts`: Python-based AI content collection system.
- `/docs`: Technical and business documentation.
- `/assets`: Media assets (images, logos).

## Getting Started
### 1. Prerequisite
- Python 3.9+
- Node.js (Optional, for local development server)

### 2. Setup
```bash
# Install dependencies
pip install -r scripts/requirements.txt

# Run the collection engine
python3 scripts/collector.py
```

### 3. Running Locally
Simply open `src/index.html` in any browser, or use a local server:
```bash
npm install -g serve
serve src
```

## AI Collection System
The `collector.py` script now features **Deep Scraping** and **NLP Analysis**:
1. Scrapes AIRSS feeds.
2. Extracts full article text, top images, and summaries using `newspaper3k`.
3. Intelligent categorization and expert-style formatting.
4. Stores data in `js/data.json`.

### Continuous Automation
To run the platform in **24/7 Autonomous Mode** (fetching every hour):
```bash
source scripts/venv/bin/activate
python3 -c "from scripts.collector import run_loop; run_loop()"
```

## Deployment
Published live via GitHub Pages at: `https://[username].github.io/AI_Insider`

## License
MIT
