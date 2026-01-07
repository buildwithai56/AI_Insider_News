# Deployment & Hosting Guide

## Environment Setup
### Prerequisites
- Node.js (for frontend build/local dev)
- Python 3.9+ (for collection scripts)
- Git

## Repository Management
1. Initialize Git: `git init`
2. Add remote: `git remote add origin [URL]`
3. Organize branches: `main` for production, `dev` for features.

## Hosting Strategy
### Frontend
- **GitHub Pages**: Simple, free hosting for static assets.
- **Vercel/Netlify**: Preferred for continuous deployment and API routes.

### Backend (Collection)
- **GitHub Actions**: Scheduled jobs for running the collection scripts.
- **Heroku/DigitalOcean**: Persistent server for hosting the DB and API.

## Deployment Steps
1. Push code to GitHub.
2. Trigger CI/CD pipeline.
3. Verify site at `https://[username].github.io/AI_Insider`.
