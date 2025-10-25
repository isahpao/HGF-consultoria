// Seleções iniciais
const toggleBtn = document.querySelector(".menu-toggle"); // botão hamburguer
const menu = document.querySelector(".menu"); // menu

// // Rolagem suave para todos os links internos (com compensação do header)
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();

//     // Calcula o topo da seção (protege href="#" e seletores inválidos)
//     const href = this.getAttribute("href");
//     let targetElement = null;
//     if (!href || href === "#") {
//       // rola ao topo do documento quando href="#" ou vazio
//       targetElement = document.body || document.documentElement;
//     } else {
//       const selector =
//         href.startsWith("#") || href.startsWith(".") ? href : `#${href}`;
//       try {
//         targetElement = document.querySelector(selector);
//       } catch (err) {
//         targetElement = null;
//       }
//     }

//     if (targetElement) {
//       const header = document.querySelector(".header");
//       const headerHeight = header ? header.offsetHeight : 0;

//       // Calcula o topo da seção de forma robusta
//       const rectTop = targetElement.getBoundingClientRect().top;
//       const y = rectTop + window.scrollY - headerHeight - 5;
//       window.scrollTo({ top: y, behavior: "smooth" });
//     }
//   });
// });

// // Marca link ativo ao rolar
// const internalLinks = document.querySelectorAll('a[href^="#"]');
// window.addEventListener("scroll", () => {
//   const scrollPos = window.scrollY + 100; // tolerância visual

//   internalLinks.forEach((link) => {
//     const href = link.getAttribute("href");
//     // ignora âncoras vazias ou apenas "#"
//     if (!href || href === "#") {
//       link.classList.remove("active");
//       return;
//     }

//     // protege seletores inválidos e normaliza ids sem '#'
//     const selector =
//       href.startsWith("#") || href.startsWith(".") ? href : `#${href}`;

//     let section = null;
//     try {
//       section = document.querySelector(selector);
//     } catch (err) {
//       section = null;
//     }

//     if (section) {
//       if (
//         section.offsetTop <= scrollPos &&
//         section.offsetTop + section.offsetHeight > scrollPos
//       ) {
//         link.classList.add("active");
//       } else {
//         link.classList.remove("active");
//       }
//     } else {
//       link.classList.remove("active");
//     }
//   });
// });

// Abrir/fechar menu hamburguer
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
  toggleBtn.setAttribute("aria-expanded", menu.classList.contains("active"));
});

// Fechar menu clicando fora ou em link
document.addEventListener("click", (e) => {
  const clicouFora = !menu.contains(e.target) && !toggleBtn.contains(e.target);
  const clicouLink = e.target.tagName === "A" && menu.contains(e.target);

  if (clicouFora || clicouLink) {
    menu.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
});

// // Ajusta altura do hero para descontar o header
// window.addEventListener("load", () => {
//   const header = document.querySelector(".header");
//   const hero = document.querySelector(".hero");
//   if (header && hero) {
//     hero.style.height = `calc(100vh - ${header.offsetHeight}px)`;
//   }
// });

// const botaoHGF = document.querySelector(".hero-button");
//   if (botaoHGF) {
//     botaoHGF.addEventListener("click", (e) => {
//       e.preventDefault();
//       const target = document.querySelector(botaoHGF.getAttribute("href"));
//       if (target) {
//         const header = document.querySelector(".header");
//         const headerHeight = header ? header.offsetHeight : 0;
//         const y = target.offsetTop - headerHeight - 10;
//         window.scrollTo({ top: y, behavior: "smooth" });
//       }
//     });
//   }
// =========== NOVAS ESTRUTURAS ============
document.addEventListener("DOMContentLoaded", () => {
  // botão "Saiba mais"
  document.querySelectorAll(".btn-theme").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = btn.dataset.target;
      if (!target) return;

      // normalize target to a valid selector (allow id without #)
      const targetSelector =
        target.startsWith("#") || target.startsWith(".") ? target : `#${target}`;

      const bloco = document.querySelector(targetSelector);
      if (!bloco) return;

      const ativo = bloco.classList.contains("active");

      if (!ativo) {
        // --- ABRIR bloco ---
        bloco.classList.add("active");
        bloco.style.maxHeight = bloco.scrollHeight + "px";
        bloco.style.opacity = "1";
        btn.textContent = "Ver menos";

        // salva posição antes de abrir
        bloco.dataset.scrollBefore = String(window.scrollY);

        // rola até o bloco (início da seção)
        const header = document.querySelector(".header");
        const headerHeight = header ? header.offsetHeight : 0;
        const rectTop = bloco.getBoundingClientRect().top;
        const y = rectTop + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: y, behavior: "smooth" });

        // remove max-height fixo após transição
        bloco.addEventListener(
          "transitionend",
          () => {
            if (bloco.classList.contains("active")) {
              bloco.style.maxHeight = "none";
            }
          },
          { once: true }
        );
      } else {
        // --- FECHAR bloco ---
        bloco.style.maxHeight = bloco.scrollHeight + "px";
        bloco.style.opacity = "1";
        window.getComputedStyle(bloco).maxHeight; // força reflow
        bloco.style.maxHeight = "0";
        bloco.style.opacity = "0";
        bloco.classList.remove("active");
        btn.textContent = "Saiba mais";

        // volta à posição anterior
        const scrollBefore = bloco.dataset.scrollBefore;
        if (scrollBefore !== undefined) {
          window.scrollTo({ top: parseFloat(scrollBefore), behavior: "smooth" });
        }

        // reseta após transição
        bloco.addEventListener(
          "transitionend",
          () => {
            bloco.style.maxHeight = "";
          },
          { once: true }
        );
      }
    });
  });

  // botão "X" dentro do bloco
  document.querySelectorAll(".fechar-tema").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bloco = btn.closest(".detalhes-tema");
      if (!bloco) return;

      bloco.style.maxHeight = bloco.scrollHeight + "px";
      bloco.style.opacity = "1";
      window.getComputedStyle(bloco).maxHeight;
      bloco.style.maxHeight = "0";
      bloco.style.opacity = "0";
      bloco.classList.remove("active");

      const idBtn = bloco.id ? bloco.id.replace("detalhes-", "btn-") : null;
      if (idBtn) {
        const botaoPrincipal = document.getElementById(idBtn);
        if (botaoPrincipal) botaoPrincipal.textContent = "Saiba mais";
      }

      const scrollBefore = bloco.dataset.scrollBefore;
      if (scrollBefore !== undefined) {
        window.scrollTo({ top: parseFloat(scrollBefore), behavior: "smooth" });
      }

      bloco.addEventListener(
        "transitionend",
        () => {
          bloco.style.maxHeight = "";
        },
        { once: true }
      );
    });
  });

  // fechar clicando fora
  document.addEventListener("click", (e) => {
    const aberto = document.querySelector(".detalhes-tema.active");
    if (!aberto) return;

    if (!aberto.contains(e.target) && !e.target.classList.contains("btn-theme")) {
      aberto.style.maxHeight = aberto.scrollHeight + "px";
      window.getComputedStyle(aberto).maxHeight;
      aberto.style.maxHeight = "0";
      aberto.style.opacity = "0";
      aberto.classList.remove("active");

      const idBtn = aberto.id ? aberto.id.replace("detalhes-", "btn-") : null;
      if (idBtn) {
        const botaoPrincipal = document.getElementById(idBtn);
        if (botaoPrincipal) botaoPrincipal.textContent = "Saiba mais";
      }

      const scrollBefore = aberto.dataset.scrollBefore;
      if (scrollBefore !== undefined) {
        window.scrollTo({ top: parseFloat(scrollBefore), behavior: "smooth" });
      }

      aberto.addEventListener(
        "transitionend",
        () => {
          aberto.style.maxHeight = "";
        },
        { once: true }
      );
    }
  });
  
});

// Slides do hero
const slides = document.querySelectorAll(".hero-slide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 5000); // troca a cada 5s

// Rolagem suave para links internos simples

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return; // ignora links vazios
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
