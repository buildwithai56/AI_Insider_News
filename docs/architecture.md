# System Architecture - AI Insider News

## High-Level Overview
The AI Insider News platform is a decoupled system consisting of an automated collection engine, a central database, and a responsive frontend.

## Components

### 1. AI Content Collection System (`/scripts`)
- **Web Crawlers**: Scrapers for arXiv, tech blogs, and journals.
- **API Integrations**: Google News, YouTube Data, Reddit.
- **NLP Engine**: Summarization and simplification using LLMs (e.g., GPT-4/Claude).
- **Media Processor**: Handling image generation and audio synthesis.

### 2. Backend & Database
- **Storage**: PostgreSQL/MongoDB for structured content storage.
- **Media Storage**: AWS S3 or equivalent for assets.
- **API Layer**: Serving content to the frontend (Node.js/Python).

### 3. Frontend (`/src`)
- **Technology**: HTML5, Tailwind CSS, Vanilla JS.
- **Mobile-First**: Fully responsive design.
- **Dynamic Content**: Hydrated via the backend API.

### 4. Admin Panel (`/admin`)
- **Manual Overrides**: Editor approval for AI-generated content.
- **User Management**: Role-based access control.
- **Analytics**: Monitoring traffic and engagement.

## Data Flow
1. Collection System scrapes source -> 2. NLP engine processes & simplifies -> 3. Content stored in DB (State: Pending) -> 4. Admin approves -> 5. Published to Website -> 6. Shared to Social Media.
