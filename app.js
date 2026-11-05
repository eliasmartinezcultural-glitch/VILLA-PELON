const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

const printTemplates = {
  postal: {
    className: "postcard",
    ornament: "✳  ✳  ✳",
    title: "MI CHAÑAR",
    subtitle: "UN LUGAR EN EL MUNDO",
    footer: "SAN PATRICIO DEL CHAÑAR · NEUQUÉN"
  },
  orgullo: {
    className: "postcard",
    ornament: "✳",
    title: "YO SOY<br>DEL CHAÑAR",
    subtitle: "Y ESO SE LLEVA CON ORGULLO",
    footer: "SAN PATRICIO DEL CHAÑAR · PATAGONIA"
  },
  senalador: {
    className: "bookmark",
    ornament: "❧",
    title: "UN RINCÓN<br>QUE SIEMPRE<br>VUELVE",
    subtitle: "UN RECUERDO ENTRE PÁGINAS",
    footer: "SAN PATRICIO DEL CHAÑAR"
  },
  hecho: {
    className: "postcard",
    ornament: "✳  ✳  ✳",
    title: "HECHO DE ACÁ",
    subtitle: "ORGULLO CHAÑARENSE",
    footer: "SAN PATRICIO DEL CHAÑAR · NEUQUÉN"
  },
  mitierra: {
    className: "postcard",
    ornament: "♡",
    title: "MI TIERRA<br>MI LUGAR",
    subtitle: "UN PEDACITO DE PATAGONIA",
    footer: "SAN PATRICIO DEL CHAÑAR"
  },
  paisaje: {
    className: "postcard",
    ornament: "≈  ✳  ⌁",
    title: "RÍO · BARDA<br>Y CHACRA",
    subtitle: "UN PAISAJE QUE NOS UNE",
    footer: "SAN PATRICIO DEL CHAÑAR · NEUQUÉN"
  }
};

document.querySelectorAll("[data-print]").forEach(button => {
  button.addEventListener("click", () => {
    const item = printTemplates[button.dataset.print];
    if (!item) return;
    const sheet = document.getElementById("printSheet");
    sheet.innerHTML = `<article class="print-page ${item.className}"><div class="print-border"><small>UN RINCÓN BIEN CHAÑARENSE</small><div class="print-ornament">${item.ornament}</div><h1>${item.title}</h1><p>${item.subtitle}</p><div class="print-ornament">❧</div><small>${item.footer}</small></div></article>`;
    window.print();
  });
});

const copyMemoryText = document.getElementById("copyMemoryText");
const copyFeedback = document.getElementById("copyFeedback");
copyMemoryText?.addEventListener("click", async () => {
  const guide = "Quiero compartir un recuerdo para Villa Pelón.\nQué aparece: \nLugar: \nFecha aproximada: \nQuién comparte la foto o historia: \nPermiso para publicar y crédito: sí / no / consultar.";
  try {
    await navigator.clipboard.writeText(guide);
    if (copyFeedback) copyFeedback.textContent = "Guía copiada. Podés completarla y enviarla cuando te pongas en contacto con el proyecto.";
    copyMemoryText.textContent = "Guía copiada ✓";
  } catch {
    if (copyFeedback) copyFeedback.textContent = "No se pudo copiar automáticamente. Podés anotar estos datos: qué aparece, lugar, fecha aproximada, quién comparte y permiso de publicación.";
  }
});
