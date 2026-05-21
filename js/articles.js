async function loadArticles() {
  const response = await fetch("./articles.json");

  const articles = await response.json();

  const container = document.getElementById("articleContainer");

  container.innerHTML = "";

  articles.forEach((article) => {
    container.innerHTML += `

      <div class="article bg-white rounded-3xl overflow-hidden shadow-lg">

        <img
        src="${article.image}"
        class="w-full h-60 object-cover"
        />

        <div class="p-8">

          <h3 class="text-2xl font-bold mb-4">
            ${article.title}
          </h3>

          <p class="text-gray-600 leading-relaxed">
            ${article.desc}
          </p>

        </div>

      </div>

    `;
  });
}

loadArticles();
