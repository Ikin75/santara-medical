async function loadHomeArticles() {
  const response = await fetch("./articles.json");

  const articles = await response.json();

  const latest = articles.slice(0, 3);

  const container = document.getElementById("homeArticles");

  container.innerHTML = "";

  latest.forEach((article) => {
    container.innerHTML += `

      <div
      class="group relative bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-3">

        <!-- IMAGE -->

        <div class="relative overflow-hidden">

          <img
          src="${article.image}"
          class="w-full h-80 object-cover group-hover:scale-110 transition duration-700"/>

          <!-- OVERLAY -->

          <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
          </div>

          <!-- CATEGORY -->

          <div
          class="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">

            ${article.category}

          </div>

        </div>

        <!-- CONTENT -->

        <div class="p-8">

          <!-- META -->

          <div
          class="flex items-center justify-between text-sm text-gray-400 mb-5">

            <span>
              Santara Medical
            </span>

            <span>
              5 min read
            </span>

          </div>

          <!-- TITLE -->

          <h3
          class="text-3xl font-black leading-tight mb-5 group-hover:text-orange-500 transition">

            ${article.title}

          </h3>

          <!-- DESC -->

          <p
          class="text-gray-500 leading-relaxed mb-8 text-lg">

            ${article.desc}

          </p>

          <!-- BUTTON -->

          <a
          href="article.html?id=${article.id}"
          class="inline-flex items-center gap-3 text-orange-500 font-bold text-lg group/link">

            Read Full Article

            <span
            class="group-hover/link:translate-x-2 transition">
              →
            </span>

          </a>

        </div>

      </div>

    `;
  });
}

loadHomeArticles();
