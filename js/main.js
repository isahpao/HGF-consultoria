const header = document.querySelector(".header");
const headerHeight = header ? header.offsetHeight : 70;
const toggleBtn = document.querySelector(".menu-toggle"); // botão hamburguer
const menu = document.querySelector(".menu"); // menu

// Ajusta o scrollPaddingTop no carregamento
document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;

// Atualiza no resize também
window.addEventListener("resize", () => {
  document.documentElement.style.scrollPaddingTop = `${header.offsetHeight}px`;
});

// Rolagem suave para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - header.offsetHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll automático para o #inicio se não houver hash
if (!window.location.hash) {
  const inicio = document.getElementById("inicio");
  if (inicio) {
    const offsetPosition =
      inicio.getBoundingClientRect().top +
      window.pageYOffset -
      header.offsetHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "auto", // scroll imediato
    });
  }
}

// Marca link ativo ao rolar
const internalLinks = document.querySelectorAll('a[href^="#"]');
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 130;

  internalLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
});

// Abrir/fechar ao clicar no botão
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
  toggleBtn.setAttribute("aria-expanded", menu.classList.contains("active"));
});

// Fechar ao clicar fora ou em link do menu
document.addEventListener("click", (e) => {
  const clicouFora = !menu.contains(e.target) && !toggleBtn.contains(e.target);
  const clicouLink = e.target.tagName === "A" && menu.contains(e.target);

  if (clicouFora || clicouLink) {
    menu.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});
