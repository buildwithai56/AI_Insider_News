import os
import json
import time
from datetime import datetime
import requests
import feedparser
from bs4 import BeautifulSoup

# Configuration
CONFIG = {
    "rss_feeds": [
        "https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en",
        "https://arxiv.org/rss/cs.AI",
        "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"
    ],
    "keywords": {
        "Robotics": ["robot", "humanoid", "boston dynamics", "tesla bot"],
        "Machine Learning": ["neural network", "transformer", "sparse", "training", "compute"],
        "Generative AI": ["llm", "gpt", "claude", "stable diffusion", "midjourney", "sora"],
        "Policy": ["regulation", "act", "ethics", "law", "policy", "safety"]
    },
    "db_path": os.path.join(os.path.dirname(__file__), "../src/js/data.json")
}

def clean_text(text):
    return " ".join(text.split())

def categorize(title, summary):
    content = (title + " " + summary).lower()
    for cat, kws in CONFIG["keywords"].items():
        if any(kw in content for kw in kws):
            return cat
    return "AI News"

def fetch_content():
    articles = []
    print(f"[*] Starting collection at {datetime.now()}")

    for url in CONFIG["rss_feeds"]:
        print(f"[*] Fetching: {url}")
        feed = feedparser.parse(url)
        
        for entry in feed.entries[:10]: # Limit to 10 per feed for demo
            title = entry.get("title", "")
            link = entry.get("link", "")
            summary = entry.get("summary", "")
            published = entry.get("published", datetime.now().strftime("%Y-%m-%d"))
            
            # Clean summary from HTML
            soup = BeautifulSoup(summary, "html.parser")
            clean_summary = soup.get_text()
            
            category = categorize(title, clean_summary)
            
            # Create a mock professional article
            articles.append({
                "id": str(int(time.time() * 1000) + len(articles)),
                "title": title,
                "subtitle": clean_summary[:150] + "...",
                "body": f"Full coverage of '{title}' is being analyzed by our AI agents. This story involves major shifts in {category}...",
                "category": category,
                "author": "AI Collector",
                "date": published,
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200", # Fallback image
                "source": link,
                "status": "Published"
            })
            
    return articles

def save_data(articles):
    # Load existing or start fresh
    if os.path.exists(CONFIG["db_path"]):
        with open(CONFIG["db_path"], "r") as f:
            try:
                existing = json.load(f)
            except:
                existing = []
    else:
        existing = []

    # Simple de-duplication
    existing_titles = {a["title"] for a in existing}
    new_articles = [a for a in articles if a["title"] not in existing_titles]
    
    combined = new_articles + existing
    # Keep only the latest 100
    combined = combined[:100]

    with open(CONFIG["db_path"], "w") as f:
        json.dump(combined, f, indent=4)
        
    print(f"[+] Saved {len(new_articles)} new articles to {CONFIG['db_path']}")

if __name__ == "__main__":
    if not os.path.exists(os.path.dirname(CONFIG["db_path"])):
        os.makedirs(os.path.dirname(CONFIG["db_path"]))
        
    fetched = fetch_content()
    save_data(fetched)
