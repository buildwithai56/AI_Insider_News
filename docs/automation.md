# AI Content Collection System (Automation)

## Overview
The automation system is designed to autonomously discover, process, and ingest AI-related content.

## Components

### 1. Collector Script (`/scripts/collector.py`)
- Python-based orchestrator.
- Uses `BeautifulSoup` and `Scrapy` for web crawling.
- Integrated with `requests` for API calls.

### 2. Processing Pipeline
- **summarize.py**: Uses OpenAI/Claude API to create TL;DR versions of long articles.
- **simplify.py**: Rewrites technical jargon into grade-10 level English.
- **image_gen.py**: Generates featured images using MidJourney/DALL-E APIs if source images are unavailable.

### 3. Automation Flow
```bash
# Example cron job for every 2 hours
0 */2 * * * cd /path/to/project/scripts && python3 main_orchestrator.py
```

## Security & Ethics
- **Rate Limiting**: Adhering to `robots.txt` and API quotas.
- **User-Agent Management**: Rotating agents to prevent IP blocks.
- **Attribution**: System automatically injects "Source: [Link]" at the end of every article.
