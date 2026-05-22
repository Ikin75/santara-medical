async function loadHomeArticles() {
  const response = await fetch("./articles.json");
  const articles = await response.json();

  const latest = articles.slice(0, 3);
  const container = document.getElementById("homeArticles");

  container.innerHTML = "";

  latest.forEach((article) => {
    container.innerHTML += `
      <!-- TAMBAHKAN CLASS "article" DI SINI -->
      <div class="article group relative bg-white dark:bg-[#1f1f1f] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3 border border-gray-100 dark:border-white/5">

        <!-- IMAGE -->
        <div class="zoom-wrapper relative overflow-hidden h-64">
          <img src="${article.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="${article.title}"/>
          
          <!-- OVERLAY -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          <!-- CATEGORY -->
          <div class="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            ${article.category}
          </div>
        </div>

        <!-- CONTENT -->
        <div class="p-8">
          <!-- META -->
          <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-5 font-medium">
            <span>Santara Medical</span>
            <span>5 min read</span>
          </div>

          <!-- TITLE -->
          <h3 class="text-2xl font-black leading-tight mb-4 text-gray-900 dark:text-white group-hover:text-orange-500 transition">
            ${article.title}
          </h3>

          <!-- DESC -->
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm">
            ${article.desc}
          </p>

          <!-- BUTTON -->
          <a href="article.html?id=${article.id}" class="inline-flex items-center gap-2 text-orange-500 font-bold group-hover:gap-3 transition-all">
            Read Full Article
            <span>→</span>
          </a>
        </div>

      </div>
    `;
  });
}

loadHomeArticles();
