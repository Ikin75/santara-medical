/**
 * components.js — Santara Medical
 * Load navbar.html & footer.html ke placeholder,
 * lalu inisialisasi semua interaksi navbar/footer.
 */

async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(file);
  if (!res.ok) throw new Error(`Gagal load: ${file}`);
  el.innerHTML = await res.text();
}

async function initComponents() {
  // Load keduanya sekaligus
  await Promise.all([
    loadComponent("navbar-placeholder", "./navbar.html"),
    loadComponent("footer-placeholder", "./footer.html"),
  ]);

  // ── Dark Mode ──────────────────────────────────────────
  if (localStorage.getItem("dark-mode") === "true") {
    document.documentElement.classList.add("dark");
  }
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("dark-mode", document.documentElement.classList.contains("dark"));
  }
  document.getElementById("darkToggle")?.addEventListener("click", toggleTheme);
  document.getElementById("darkToggleMobile")?.addEventListener("click", toggleTheme);

  // ── Mobile Menu ────────────────────────────────────────
  const menuBtn       = document.getElementById("menuBtn");
  const mobileMenu    = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  function toggleMenu() {
    const closed = mobileMenu.classList.contains("translate-x-full");
    mobileMenu.classList.toggle("translate-x-full", !closed);
    mobileOverlay.classList.toggle("opacity-0",        !closed);
    mobileOverlay.classList.toggle("pointer-events-none", !closed);
  }
  menuBtn?.addEventListener("click", toggleMenu);
  mobileOverlay?.addEventListener("click", toggleMenu);
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", toggleMenu));

  // ── Header shrink on scroll ────────────────────────────
  const headerInner = document.getElementById("headerInner");
  function updateHeader() {
    if (!headerInner) return;
    if (window.scrollY > 50) {
      headerInner.classList.add("py-2", "shadow-orange-500/10");
      headerInner.classList.remove("mt-5");
    } else {
      headerInner.classList.remove("py-2", "shadow-orange-500/10");
      headerInner.classList.add("mt-5");
    }
  }
  window.addEventListener("scroll", updateHeader);
  updateHeader(); // jalankan sekali saat load

  // ── Active Nav Link ────────────────────────────────────
  const navLinks   = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Tandai halaman aktif berdasarkan filename
  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("#")[0] || "index.html";
    if (linkPage === currentPage) link.classList.add("text-orange-500", "font-bold");
  });

  // Tandai section aktif saat scroll (hanya di index)
  if (currentPage === "index.html" || currentPage === "") {
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 300) current = sec.id;
      });
      navLinks.forEach(link => {
        const href = link.getAttribute("href") || "";
        const isActive = href === `index.html#${current}` || href === `#${current}`;
        link.classList.toggle("text-orange-500", isActive);
        link.classList.toggle("font-bold", isActive);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", initComponents);
