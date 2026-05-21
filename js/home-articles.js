async function loadHomeArticles() {
  const response = await fetch("./articles.json");

  const articles = await response.json();

  const latest = articles.slice(0, 3);

  const container = document.getElementById("homeArticles");

  latest.forEach((article) => {
    container.innerHTML += `

      <div class="bg-white rounded-3xl overflow-hidden shadow-lg">

        <img src="${article.image}"
        class="w-full h-56 object-cover"/>

        <div class="p-6">

          <span class="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm">
            ${article.category}
          </span>

          <h3 class="text-2xl font-bold my-4">
            ${article.title}
          </h3>

          <p class="text-gray-600 mb-5">
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
}

loadHomeArticles();
