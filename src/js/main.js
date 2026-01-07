document.addEventListener('DOMContentLoaded', async () => {
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

            newsItems.forEach(item => {
                const card = createNewsCard(item);
                newsGrid.appendChild(card);
            });
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

function createNewsCard(item) {
    const article = document.createElement('article');
    article.className = 'group flex flex-col gap-4 bg-card-dark/30 p-4 rounded-2xl border border-card-border hover:border-primary/50 transition-all';

    article.innerHTML = `
        <div class="w-full aspect-video rounded-xl overflow-hidden relative">
            <div class="absolute top-3 left-3 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white z-10 uppercase tracking-widest">${item.category}</div>
            <img alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${item.image}" />
        </div>
        <div class="flex flex-col gap-3 px-2">
            <div class="flex items-center gap-3 text-xs text-slate-500 font-medium font-body uppercase tracking-wider">
                <span>${formatDate(item.date)}</span>
                <span class="size-1 rounded-full bg-slate-700"></span>
                <span>${item.author}</span>
            </div>
            <h3 class="text-xl font-bold leading-snug text-white group-hover:text-primary transition-colors decoration-primary/30 underline-offset-4 group-hover:underline">
                <a href="article.html?id=${item.id}">${item.title}</a>
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed line-clamp-2">
                ${item.subtitle}
            </p>
        </div>
    `;

    return article;
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
                    document.title = `${article.title} - AI Insider News`;
                    document.getElementById('article-title').textContent = article.title;
                    document.getElementById('article-subtitle').textContent = article.subtitle;
                    document.getElementById('article-category').textContent = article.category;
                    document.getElementById('article-image').src = article.image;
                    document.getElementById('article-body').innerHTML = `
                        <p class="lead text-xl text-slate-200">${article.subtitle}</p>
                        <p>${article.body}</p>
                        <p>Detailed analysis of current AI trends suggests that stories like this are shaping the future of global technology. Stay tuned to AI Insider for more updates from the original source: <a href="${article.source}" target="_blank" class="text-primary hover:underline">${article.source}</a></p>
                    `;
                }
            });
    }
}
