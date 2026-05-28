// Fungsi pintar untuk load komponen HTML terpisah
async function loadComponent(placeholderId, filePath) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Gagal memuat ${filePath}`);
    const html = await response.text();
    placeholder.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Inisialisasi script interaktif Navbar
function initNavbarLogic() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const darkToggle = document.getElementById("darkToggle");
  const darkToggleMobile = document.getElementById("darkToggleMobile");
  const headerInner = document.getElementById("headerInner");

  // Jalankan fungsi Dark Mode global
  if (localStorage.getItem("dark-mode") === "true") {
    document.documentElement.classList.add("dark");
  }

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "dark-mode",
      document.documentElement.classList.contains("dark"),
    );
  };

  if (darkToggle) darkToggle.addEventListener("click", toggleTheme);
  if (darkToggleMobile) darkToggleMobile.addEventListener("click", toggleTheme);

  // Toggle Mobile Menu
  if (menuBtn && mobileMenu && mobileOverlay) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("translate-x-full");
      mobileOverlay.classList.toggle("opacity-0");
      mobileOverlay.classList.toggle("pointer-events-none");
    });
    mobileOverlay.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
      mobileOverlay.classList.add("opacity-0");
      mobileOverlay.classList.add("pointer-events-none");
    });
  }

  // Efek Scroll
  if (headerInner) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        headerInner.classList.add("py-2", "shadow-orange-500/10");
        headerInner.classList.remove("mt-5");
      } else {
        headerInner.classList.remove("py-2", "shadow-orange-500/10");
        headerInner.classList.add("mt-5");
      }
    });
  }
}

// Jalankan saat dokumen siap
document.addEventListener("DOMContentLoaded", async () => {
  // Tunggu hingga navbar selesai di-load, baru jalankan logic tombolnya
  await loadComponent("navbar-placeholder", "./navbar.html");
  initNavbarLogic();

  // Load footer
  await loadComponent("footer-placeholder", "./footer.html");
});
