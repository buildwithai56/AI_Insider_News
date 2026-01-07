import os
import json
import time
from datetime import datetime
import requests
import feedparser
from bs4 import BeautifulSoup
from newspaper import Article
import nltk

# Essential for newspaper3k
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

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
        "Safety & Ethics": ["regulation", "act", "ethics", "law", "policy", "safety", "alignment", "bias", "fairness"]
    },
    "db_path": os.path.join(os.path.dirname(__file__), "../js/data.json")
}

def clean_text(text):
    return " ".join(text.split())

def categorize(title, summary):
    content = (title + " " + summary).lower()
    for cat, kws in CONFIG["keywords"].items():
        if any(kw in content for kw in kws):
            return cat
    return "AI News"

def scrape_full_article(url):
    try:
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()
        return {
            "full_text": article.text,
            "summary": article.summary,
            "top_image": article.top_image,
            "keywords": article.keywords
        }
    except Exception as e:
        print(f"[!] Error scraping {url}: {e}")
        return None

def fetch_content():
    articles = []
    print(f"[*] Starting collection at {datetime.now()}")

    for url in CONFIG["rss_feeds"]:
        print(f"[*] Processing Feed: {url}")
        feed = feedparser.parse(url)
        
        for entry in feed.entries[:5]: # Limit per feed for depth
            title = entry.get("title", "")
            link = entry.get("link", "")
            
            # Scrape full depth
            print(f"[*] Deep scraping: {title}")
            scraped = scrape_full_article(link)
            
            if not scraped or not scraped["full_text"]:
                continue

            category = categorize(title, scraped["summary"])
            
            # Professional human-like formatting
            formatted_body = f"""
                <p class="lead">{scraped['summary'].replace('\n', ' ')}</p>
                <h3>Industry Analysis</h3>
                <p>{scraped['full_text'][:1000].replace('\n', '</p><p>')}...</p>
                <div class="my-6 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl">
                    <h4 class="font-bold mb-2">Expert Take</h4>
                    <p>The integration of these developments in {category} suggests a significant shift in how we approach AI architecture in 2026. This trend aligns with the broader industry move towards scaled autonomy.</p>
                </div>
            """
            
            articles.append({
                "id": str(int(time.time() * 1000) + len(articles)),
                "title": title,
                "subtitle": scraped["summary"][:200] + "...",
                "body": formatted_body,
                "category": category,
                "author": "AI Intelligence Bot",
                "date": entry.get("published", datetime.now().strftime("%Y-%m-%d")),
                "image": scraped["top_image"] if scraped["top_image"] else "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200",
                "source": link,
                "status": "Published"
            })
            
    return articles

def save_data(articles):
    if not articles: return
    
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
    # Keep only the latest 200
    combined = combined[:200]

    with open(CONFIG["db_path"], "w") as f:
        json.dump(combined, f, indent=4)
        
    print(f"[+] Ingested {len(new_articles)} new stories into the platform.")

def run_loop():
    while True:
        try:
            fetched = fetch_content()
            save_data(fetched)
            print("[*] Cycle complete. Sleeping for 1 hour...")
            time.sleep(3600)
        except Exception as e:
            print(f"[!!] Loop Error: {e}")
            time.sleep(60)

if __name__ == "__main__":
    if not os.path.exists(os.path.dirname(CONFIG["db_path"])):
        os.makedirs(os.path.dirname(CONFIG["db_path"]))
    
    # Run once for immediate update, then enter loop if desired
    # For now, let's just make it run once but I'll provide the loop
    fetched = fetch_content()
    save_data(fetched)
