// ===== Kun / tun rejimi =====
// Bu qism <head> ichida darhol ishlaydi, shuning uchun sahifa
// to'g'ri ranglar bilan chiziladi (oq rang miltillab ketmaydi).
(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "theme";
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function save(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* e'tiborsiz */ }
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Kunduzgi rejimni yoqish" : "Tungi rejimni yoqish");
    }
  }

  // Avval saqlangan tanlov, bo'lmasa qurilma sozlamasi
  apply(getSaved() || (systemDark.matches ? "dark" : "light"));

  // Foydalanuvchi o'zi tanlamagan bo'lsa, qurilma sozlamasiga ergashamiz
  systemDark.addEventListener("change", function (e) {
    if (!getSaved()) apply(e.matches ? "dark" : "light");
  });

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-theme"));
    document.getElementById("theme-toggle").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      save(next);
    });

    // ===== Telefon menyusi: ochish / yopish =====
    var header = document.querySelector(".site-header");
    var menuBtn = document.getElementById("menu-toggle");
    function setMenu(open) {
      header.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
    }
    menuBtn.addEventListener("click", function () {
      setMenu(!header.classList.contains("is-open"));
    });
    // Havola bosilganda yoki Esc tugmasida menyu yopiladi
    header.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });

    // ===== Footerdagi yilni avtomatik yangilash =====
    document.getElementById("year").textContent = new Date().getFullYear();
  });
})();
