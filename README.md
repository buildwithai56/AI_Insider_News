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
The `collector.py` script performs the following:
1. Scrapes AI-related RSS feeds.
2. Extracts content using BeautifulSoup.
3. Groups and categorizes content using keyword analysis.
4. Stores data in `/src/js/data.json` for frontend consumption.

## Deployment
Published live via GitHub Pages at: `https://[username].github.io/AI_Insider`

## License
MIT
