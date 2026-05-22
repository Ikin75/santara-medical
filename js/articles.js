let allArticles = [];
let currentPage = 1;
const perPage = 3;
let currentCategory = "All"; // Menyimpan status kategori saat ini

async function loadArticles() {
  const response = await fetch("./articles.json");
  allArticles = await response.json();

  renderFeatured();
  renderArticles(allArticles);
  setupFilters();
  setupSearch(); // Jalankan fungsi pencarian
}

// 1. RENDER FEATURED ARTICLE (Hero Banner Tetap)
function renderFeatured() {
  const featured = allArticles.find((a) => a.featured);
  if (!featured) return;

  document.getElementById("featuredArticle").innerHTML = `
    <div class="relative w-full h-[300px] lg:h-[350px] rounded-[32px] overflow-hidden shadow-2xl group border border-gray-100 dark:border-white/10">
      <img
        src="${featured.image}"
        alt="${featured.title}"
        class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-10">
        <span class="inline-block bg-orange-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider mb-4 shadow-lg">
          Topik Terkini
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

// 2. RENDER ARTIKEL NORMAL (Dengan Paginasi)
function renderArticles(data) {
  const container = document.getElementById("articleContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const paginated = data.slice(start, start + perPage);

  paginated.forEach((article) => {
    container.innerHTML += generateArticleCard(article);
  });

  renderPagination(data);
}

// 3. RENDER HASIL PENCARIAN (Ala Halodoc - Tanpa Paginasi)
function renderSearchResults(data, query) {
  const container = document.getElementById("articleContainer");

  // Teks Header Hasil Pencarian
  container.innerHTML = `
    <div class="col-span-full mb-4 border-b border-gray-200 dark:border-white/10 pb-4">
      <p class="text-gray-600 dark:text-gray-400 text-lg font-medium">
        Semua hasil pencarian untuk: <span class="font-bold text-orange-500">"${query}"</span>
      </p>
    </div>
  `;

  if (data.length === 0) {
    container.innerHTML += `
      <div class="col-span-full text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Artikel Tidak Ditemukan</h3>
        <p class="text-gray-500">Coba gunakan kata kunci lain.</p>
      </div>
    `;
    return;
  }

  // Tampilkan semua hasil pencarian sekaligus
  data.forEach((article) => {
    container.innerHTML += generateArticleCard(article);
  });
}

// 4. TEMPLATE KARTU ARTIKEL (Digunakan berulang)
function generateArticleCard(article) {
  return `
    <div class="article group bg-white dark:bg-[#1f1f1f] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3 border border-gray-100 dark:border-white/5 relative">
      <div class="zoom-wrapper h-56 relative overflow-hidden">
        <img src="${article.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
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
}

// 5. SISTEM PENCARIAN (Menyembunyikan Hero & Filter)
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  // Elemen yang akan disembunyikan saat mode pencarian aktif
  const featured = document.getElementById("featuredArticle");
  const filterContainer = document.getElementById("filterContainer");
  const pagination = document.getElementById("pagination");

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    // JIKA KOTAK PENCARIAN KOSONG -> KEMBALI KE TAMPILAN AWAL
    if (query === "") {
      featured.style.display = "block";
      filterContainer.style.display = "flex";
      pagination.style.display = "flex";

      // Kembalikan sesuai filter kategori terakhir
      if (currentCategory === "All") {
        renderArticles(allArticles);
      } else {
        const filtered = allArticles.filter(
          (a) => a.category === currentCategory,
        );
        renderArticles(filtered);
      }
      return;
    }

    // JIKA SEDANG MENCARI -> SEMBUNYIKAN HERO, FILTER, & PAGINASI
    featured.style.display = "none";
    filterContainer.style.display = "none";
    pagination.style.display = "none";

    // Cari dari SELURUH JSON Data
    const results = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.desc.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query),
    );

    renderSearchResults(results, query);
  }

  // Trigger pencarian saat tombol diklik atau mengetik
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keyup", performSearch);
}

// 6. SETUP FILTER KATEGORI
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.category; // Simpan status kategori
      currentPage = 1;

      if (currentCategory === "All") {
        renderArticles(allArticles);
      } else {
        const filtered = allArticles.filter(
          (a) => a.category === currentCategory,
        );
        renderArticles(filtered);
      }
    });
  });
}

// 7. PAGINASI
function renderPagination(data) {
  const totalPages = Math.ceil(data.length / perPage);
  let html = "";

  for (let i = 1; i <= totalPages; i++) {
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

function changePage(page) {
  currentPage = page;

  if (currentCategory === "All") {
    renderArticles(allArticles);
  } else {
    const filtered = allArticles.filter((a) => a.category === currentCategory);
    renderArticles(filtered);
  }

  document
    .getElementById("articleContainer")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

loadArticles();
