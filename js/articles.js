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

function renderFeatured() {
  const featured = allArticles.find((a) => a.featured);

  if (!featured) return;

  document.getElementById("featuredArticle").innerHTML = `

    <div class="bg-white rounded-3xl overflow-hidden shadow-xl">

      <img src="${featured.image}"
      class="w-full h-[400px] object-cover"/>

      <div class="p-10">

        <span class="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm">
          Featured Article
        </span>

        <h2 class="text-4xl font-bold mt-6 mb-5">
          ${featured.title}
        </h2>

        <p class="text-gray-600 text-lg mb-8">
          ${featured.desc}
        </p>

        <a href="article.html?id=${featured.id}"
        class="bg-orange-500 text-white px-6 py-3 rounded-xl">
          Baca Selengkapnya
        </a>

      </div>

    </div>

  `;
}

function renderArticles(data) {
  const container = document.getElementById("articleContainer");

  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;

  const paginated = data.slice(start, start + perPage);

  paginated.forEach((article) => {
    container.innerHTML += `

      <div class="article bg-white rounded-3xl overflow-hidden shadow-lg">

        <img
        src="${article.image}"
        class="w-full h-60 object-cover"
        />

        <div class="p-8">

          <span class="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
            ${article.category}
          </span>

          <h3 class="text-2xl font-bold my-4">
            ${article.title}
          </h3>

          <p class="text-gray-600 leading-relaxed mb-6">
            ${article.desc}
          </p>

          <a href="article.html?id=${article.id}"
          class="text-orange-500 font-semibold">
            Baca Selengkapnya →
          </a>

        </div>

      </div>

    `;
  });

  renderPagination(data);
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / perPage);

  let html = "";

  for (let i = 1; i <= totalPages; i++) {
    html += `

      <button onclick="changePage(${i})"
      class="px-4 py-2 rounded-lg border">

        ${i}

      </button>

    `;
  }

  document.getElementById("pagination").innerHTML = html;
}

function changePage(page) {
  currentPage = page;

  renderArticles(allArticles);
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      if (category === "All") {
        renderArticles(allArticles);
      } else {
        const filtered = allArticles.filter((a) => a.category === category);

        renderArticles(filtered);
      }
    });
  });
}

loadArticles();
