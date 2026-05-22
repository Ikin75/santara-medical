let allArticles = [];
let currentPage = 1;
const perPage = 3;

async function loadArticles() {
  const response = await fetch("./articles.json");
  allArticles = await response.json();

  renderFeatured();
  renderArticles(allArticles);
  setupFilters();
}

// 1. RENDER FEATURED ARTICLE (Gaya Halodoc Banner Hero)
function renderFeatured() {
  const featured = allArticles.find((a) => a.featured);

  if (!featured) return;

  document.getElementById("featuredArticle").innerHTML = `
    <div class="relative w-full h-[400px] lg:h-[450px] rounded-[32px] overflow-hidden shadow-2xl group border border-gray-100 dark:border-white/10">
      
      <img
        src="${featured.image}"
        alt="${featured.title}"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      <div class="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-10">
        <span class="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
          Featured Article
        </span>
        
        <h2 class="text-3xl lg:text-5xl font-black text-white leading-tight mb-4 group-hover:text-orange-400 transition-colors duration-300 w-full md:w-4/5">
          ${featured.title}
        </h2>
        
        <div class="flex items-center gap-4 text-gray-300 text-sm font-medium">
          <span class="flex items-center gap-1">⏱️ 5 menit baca</span>
          <span class="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
          <span>Santara Medical</span>
        </div>
      </div>
      
      <a href="article.html?id=${featured.id}" class="absolute inset-0 z-20"></a>
    </div>
  `;
}

// 2. RENDER ARTIKEL BIASA (Dengan Desain Premium + Dark Mode)
function renderArticles(data) {
  const container = document.getElementById("articleContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const paginated = data.slice(start, start + perPage);

  paginated.forEach((article) => {
    container.innerHTML += `
      <div class="article group bg-white dark:bg-[#1f1f1f] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3 border border-gray-100 dark:border-white/5 relative">
        
        <div class="zoom-wrapper h-56 relative overflow-hidden">
          <img
            src="${article.image}"
            class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        </div>

        <div class="p-8">
          <span class="bg-orange-50 dark:bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 inline-block">
            ${article.category}
          </span>

          <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-500 transition line-clamp-2">
            ${article.title}
          </h3>

          <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm line-clamp-3">
            ${article.desc}
          </p>

          <a href="article.html?id=${article.id}" class="inline-flex items-center gap-2 text-orange-500 font-bold group-hover:gap-3 transition-all">
            Baca Selengkapnya <span>→</span>
          </a>
        </div>
        
        <a href="article.html?id=${article.id}" class="absolute inset-0 z-10"></a>
      </div>
    `;
  });

  renderPagination(data);
}

// 3. PAGINATION (Dengan status Aktif & Desain Premium)
function renderPagination(data) {
  const totalPages = Math.ceil(data.length / perPage);
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    // Menentukan style tombol aktif atau tidak
    const activeClass =
      i === currentPage
        ? "bg-orange-500 text-white font-bold border-transparent shadow-lg"
        : "bg-white dark:bg-[#1f1f1f] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-orange-50 dark:hover:bg-orange-500/10 hover:text-orange-500 hover:-translate-y-1";

    html += `
      <button onclick="changePage(${i})" class="px-5 py-2.5 rounded-xl border transition-all duration-300 ${activeClass}">
        ${i}
      </button>
    `;
  }

  document.getElementById("pagination").innerHTML = html;
}

// Fungsi Pindah Halaman
function changePage(page) {
  currentPage = page;
  renderArticles(allArticles);

  // Menggulirkan layar otomatis ke bagian atas grid artikel setelah pindah halaman
  document
    .getElementById("articleContainer")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

// Fungsi Filter
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      // Mengembalikan halaman ke 1 setiap kali kategori diubah
      currentPage = 1;

      if (category === "All") {
        renderArticles(allArticles);
      } else {
        const filtered = allArticles.filter((a) => a.category === category);
        renderArticles(filtered);
      }
    });
  });
}

// Memuat data
loadArticles();
