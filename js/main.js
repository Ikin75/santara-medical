async function loadComponent(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Gagal memuat file");
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    // Jalankan script navbar setelah dimuat
    if (id === "navbar-placeholder") initNavbarScripts();
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-placeholder", "navbar.html");
});

function initNavbarScripts() {
  // ... (masukkan semua script toggle menu & dark mode di sini) ...
}
