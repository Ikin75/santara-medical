async function loadDetail() {
  const params = new URLSearchParams(window.location.search);

  const id = params.get("id");

  const response = await fetch("./articles.json");

  const articles = await response.json();

  const article = articles.find((a) => a.id == id);

  if (!article) {
    document.getElementById("articleDetail").innerHTML = `
      <div class="p-10 text-center">
        <h1 class="text-4xl font-bold mb-4">
          Artikel Tidak Ditemukan
        </h1>
      </div>
    `;

    return;
  }

  document.getElementById("articleDetail").innerHTML = `

    <img
    src="${article.image}"
    class="w-full h-[500px] object-cover"/>

    <div class="p-10">

      <span class="bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm">
        ${article.category}
      </span>

      <h1 class="text-5xl font-extrabold my-8 leading-tight">
        ${article.title}
      </h1>

      <p class="text-xl text-gray-700 leading-relaxed mb-10">
        ${article.content}
      </p>

      <a href="articles.html"
      class="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl">
        ← Kembali ke Artikel
      </a>

    </div>

  `;
}

loadDetail();
