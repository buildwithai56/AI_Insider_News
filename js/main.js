const translations = {
    en: {
        nav_home: "Home",
        nav_ml: "Machine Learning",
        nav_genai: "Generative AI",
        nav_robotics: "Robotics",
        nav_ethics: "Safety & Ethics",
        search_placeholder: "Search AI news...",
        subscribe: "Subscribe",
        breaking_news: "Breaking News",
        read_story: "Read Full Story",
        podcast: "Listen to Podcast",
        latest_news: "Latest News",
        trending: "Trending Now",
        newsletter_title: "The AI Dispatch",
        newsletter_desc: "Join 50k+ readers. Get a 5-minute summary of the latest AI breakthroughs.",
        featured: "Featured",
        read_next: "Read Next",
        summary_title: "Executive Summary",
        source_title: "Original Source",
        view_original: "Read on the original website",
        footer_desc: "The world's leading source for AI news, research analysis, and product reviews.",
        categories: "Categories",
        resources: "Resources",
        support: "Support",
        min_read: "min read",
        published: "Published",
        by: "By"
    },
    ne: {
        nav_home: "गृहपृष्ठ",
        nav_ml: "मेसिन लर्निङ",
        nav_genai: "जेनेरेटिभ एआई",
        nav_robotics: "रोबोटिक्स",
        nav_ethics: "सुरक्षा र नैतिकता",
        search_placeholder: "एआई समाचार खोज्नुहोस्...",
        subscribe: "सदस्यता लिनुहोस्",
        breaking_news: "ताजा समाचार",
        read_story: "पूरा कथा पढ्नुहोस्",
        podcast: "पडकास्ट सुन्नुहोस्",
        latest_news: "पछिल्लो समाचार",
        trending: "अहिलेको चर्चा",
        newsletter_title: "एआई डिस्प्याच",
        newsletter_desc: "५० हजार+ पाठकहरूमा सामेल हुनुहोस्। एआईका नवीनतम सफलताहरूको ५ मिनेटको सारांश पाउनुहोस्।",
        featured: "विशेष",
        read_next: "थप पढ्नुहोस्",
        summary_title: "कार्यकारी सारांश",
        source_title: "मूल स्रोत",
        view_original: "मूल वेबसाइटमा पढ्नुहोस्",
        footer_desc: "एआई समाचार, अनुसन्धान विश्लेषण, र उत्पादन समीक्षाहरूको लागि संसारको अग्रणी स्रोत।",
        categories: "विधाहरू",
        resources: "स्रोतहरू",
        support: "सहयोग",
        min_read: "मिनेट पढाइ",
        published: "प्रकाशित",
        by: "द्वारा"
    },
    hi: {
        nav_home: "होम",
        nav_ml: "मशीन लर्निंग",
        nav_genai: "जेनरेटिव एआई",
        nav_robotics: "रोबोटिक्स",
        nav_ethics: "सुरक्षा और नैतिकता",
        search_placeholder: "एआई समाचार खोजें...",
        subscribe: "सदस्यता लें",
        breaking_news: "ब्रेकिंग न्यूज़",
        read_story: "पूरी कहानी पढ़ें",
        podcast: "पॉडकास्ट सुनें",
        latest_news: "ताज़ा खबरें",
        trending: "ट्रेंडिंग",
        newsletter_title: "एआई डिस्पैच",
        newsletter_desc: "50k+ पाठकों से जुड़ें। एआई की नवीनतम सफलताओं का 5 मिनट का सारांश प्राप्त करें।",
        featured: "विशेष",
        read_next: "आगे पढ़ें",
        summary_title: "कार्यकारी सारांश",
        source_title: "मूल स्रोत",
        view_original: "मूल वेबसाइट पर पढ़ें",
        footer_desc: "एआई समाचार, अनुसंधान विश्लेषण और उत्पाद समीक्षाओं के लिए दुनिया का अग्रणी स्रोत।",
        categories: "श्रेणियाँ",
        resources: "संसाधन",
        support: "सहायता",
        min_read: "मिनट पढ़ाई",
        published: "प्रकाशित",
        by: "द्वारा"
    }
};

let currentLang = localStorage.getItem('site-lang') || 'en';

function updateUI() {
    const t = translations[currentLang];

    // Selectors for elements that need translation
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (t[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    document.documentElement.lang = currentLang;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site-lang', lang);
    updateUI();
    // Re-render dynamic content if needed, or just reload for simplicity
    location.reload();
}

// Theme Logic
function initTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    updateUI();

    // Theme toggle listener
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.onclick = toggleTheme;

    // Lang toggle listener
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.onchange = (e) => setLanguage(e.target.value);
    }

    const newsGrid = document.getElementById('news-grid');
    const featuredStory = document.getElementById('featured-story');

    try {
        const response = await fetch('js/data.json');
        const data = await response.json();

        if (data && data.length > 0) {
            // Update Featured Story (Latest)
            const featured = data[0];
            updateFeatured(featured);

            // Update News Grid (Next 6)
            const newsItems = data.slice(1, 7);
            newsGrid.innerHTML = ''; // Clear existing

            newsItems.forEach((item, index) => {
                const card = createNewsCard(item, index === 0);
                newsGrid.appendChild(card);
            });

            // Update Trending Sidebar
            const trendingList = document.getElementById('trending-list');
            if (trendingList) {
                const trendingItems = data.slice(7, 12);
                trendingList.innerHTML = '';
                trendingItems.forEach((item, index) => {
                    const trendingCard = createTrendingCard(item, index + 1);
                    trendingList.appendChild(trendingCard);
                });
            }

            // Simple Search Logic
            const searchInput = document.getElementById('site-search');
            const targetGrid = newsGrid || document.getElementById('category-grid');

            if (searchInput && targetGrid) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase();
                    const cards = targetGrid.querySelectorAll('article');
                    cards.forEach(card => {
                        const title = card.querySelector('h3').textContent.toLowerCase();
                        if (title.includes(query)) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            } else if (searchInput) {
                // From article page, redirect to home with search query
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        window.location.href = `index.html?search=${searchInput.value}`;
                    }
                });
            }

            // Handle search query from URL on home page
            const urlParams = new URLSearchParams(window.location.search);
            const initialSearch = urlParams.get('search');
            if (initialSearch && searchInput && newsGrid) {
                searchInput.value = initialSearch;
                setTimeout(() => {
                    searchInput.dispatchEvent(new Event('input'));
                }, 200);
            }
        }
    } catch (error) {
        console.error('Error loading news data:', error);
    }
});

function updateFeatured(item) {
    const container = document.getElementById('featured-story');
    if (!container) return;

    // We can update the DOM elements directly if we want to preserve animations
    const title = container.querySelector('h1');
    const subtitle = container.querySelector('p');
    const img = container.querySelector('img');
    const link = container.querySelector('a');

    if (title) title.textContent = item.title;
    if (subtitle) subtitle.textContent = item.subtitle;
    if (img) img.src = item.image;
    if (link) link.href = `article.html?id=${item.id}`;
}

function createNewsCard(item, isFirst = false) {
    const isNew = (new Date() - new Date(item.date)) < 24 * 60 * 60 * 1000;
    const readingTime = Math.ceil((item.body ? item.body.split(' ').length : 100) / 200);

    const article = document.createElement('article');
    article.className = `group flex flex-col gap-4 bg-card-dark/30 p-4 rounded-2xl border border-card-border hover:border-primary/50 transition-all hover:bg-card-dark/50 hover:shadow-2xl hover:shadow-primary/5 ${isFirst ? 'md:col-span-2 md:flex-row md:items-center' : ''}`;

    article.innerHTML = `
        <div class="w-full ${isFirst ? 'md:w-1/2' : ''} aspect-video rounded-xl overflow-hidden relative">
            <div class="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white z-10 uppercase tracking-widest flex items-center gap-2">
                ${isFirst ? 'Featured' : item.category}
                ${isNew ? '<span class="size-1.5 rounded-full bg-white animate-pulse"></span>' : ''}
            </div>
            <img alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${item.image}" />
        </div>
        <div class="flex flex-col gap-3 px-2 ${isFirst ? 'md:flex-1' : ''}">
            <div class="flex items-center gap-3 text-xs text-slate-500 font-medium font-body uppercase tracking-wider">
                <span>${formatDate(item.date)}</span>
                <span class="size-1 rounded-full bg-slate-700"></span>
                <span>${readingTime} ${translations[currentLang].min_read}</span>
            </div>
            <h3 class="${isFirst ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold leading-snug text-white group-hover:text-primary transition-colors decoration-primary/30 underline-offset-4 group-hover:underline">
                <a href="article.html?id=${item.id}">${item.title}</a>
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed line-clamp-2">
                ${item.subtitle}
            </p>
        </div>
    `;

    return article;
}

function createTrendingCard(item, index) {
    const div = document.createElement('div');
    div.className = 'group cursor-pointer flex gap-4 items-start';
    div.onclick = () => window.location.href = `article.html?id=${item.id}`;

    div.innerHTML = `
        <span class="text-3xl font-black text-slate-800 transition-colors group-hover:text-primary/40 leading-none">${index.toString().padStart(2, '0')}</span>
        <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">${item.category}</span>
            <h4 class="font-bold text-white text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">
                ${item.title}
            </h4>
        </div>
    `;
    return div;
}

function formatDate(dateStr) {
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

// Article Page Logic
if (window.location.pathname.includes('article.html')) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        fetch('js/data.json')
            .then(res => res.json())
            .then(data => {
                const article = data.find(a => a.id === id);
                if (article) {
                    const readingTime = Math.ceil((article.body ? article.body.split(' ').length : 100) / 200);

                    document.title = `${article.title} - AI Insider News`;
                    document.getElementById('article-title').textContent = article.title;
                    document.getElementById('article-subtitle').textContent = article.subtitle;
                    document.getElementById('article-category').textContent = article.category;
                    const metaEl = document.querySelector('.article-meta');
                    if (metaEl) {
                        metaEl.innerHTML = `
                            <span>${translations[currentLang].published} ${formatDate(article.date)}</span>
                            <span class="size-1 rounded-full bg-slate-700"></span>
                            <span>${readingTime} ${translations[currentLang].min_read}</span>
                            <span class="size-1 rounded-full bg-slate-700"></span>
                            <span>${translations[currentLang].by} ${article.author || 'AI Insider Staff'}</span>
                        `;
                    }

                    document.getElementById('article-image').src = article.image;

                    // Improved body rendering
                    const bodyEl = document.getElementById('article-body');
                    if (bodyEl) {
                        bodyEl.innerHTML = `
                            <div class="prose prose-invert max-w-none">
                                <div class="bg-primary/5 border-l-4 border-primary p-6 rounded-xl mb-8">
                                    <h4 class="text-primary font-bold uppercase tracking-wider text-xs mb-2">${translations[currentLang].summary_title}</h4>
                                    <p class="text-lg text-slate-200 font-medium leading-relaxed">${article.subtitle}</p>
                                </div>
                                <div class="space-y-6 text-slate-300">
                                    ${article.body.split('\n\n').map(p => `<p class="leading-relaxed text-lg">${p}</p>`).join('')}
                                </div>
                                <div class="mt-12 pt-8 border-t border-card-border">
                                    <h4 class="text-white font-bold mb-4">${translations[currentLang].source_title}</h4>
                                    <a href="${article.source}" target="_blank" class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                                        ${translations[currentLang].view_original}
                                        <span class="material-symbols-outlined text-sm">open_in_new</span>
                                    </a>
                                </div>
                            </div>
                        `;
                    }

                    // Populate Related Stories
                    const relatedGrid = document.querySelector('.related-stories-grid');
                    if (relatedGrid) {
                        const related = data
                            .filter(a => a.category === article.category && a.id !== article.id)
                            .slice(0, 3);

                        if (related.length > 0) {
                            relatedGrid.innerHTML = '';
                            related.forEach(item => {
                                const card = createNewsCard(item);
                                relatedGrid.appendChild(card);
                            });
                        }
                    }
                }
            });
    }
}

// Category Page Logic
if (window.location.pathname.includes('category.html')) {
    const params = new URLSearchParams(window.location.search);
    const catType = params.get('type') || 'AI News';

    const titleEl = document.getElementById('category-title');
    if (titleEl) titleEl.textContent = catType;
    document.title = `${catType} - AI Insider News`;

    const catGrid = document.getElementById('category-grid');
    if (catGrid) {
        fetch('js/data.json')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(a => a.category === catType || catType === 'AI News');
                catGrid.innerHTML = '';

                if (filtered.length === 0) {
                    catGrid.innerHTML = '<p class="text-slate-500 col-span-full py-20 text-center">No articles found in this category yet.</p>';
                }

                filtered.forEach(item => {
                    const card = createNewsCard(item);
                    catGrid.appendChild(card);
                });
            });
    }
}
