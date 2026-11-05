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

/* Mini juego: tres datos comprobables del Chañar */
const quizQuestions = [
  {q:"¿En qué año se fundó oficialmente San Patricio del Chañar?",a:["1968","1973","1985"],correct:1,ok:"¡Sí! El 21 de mayo de 1973 se creó la Comisión de Fomento por el Decreto 1339.",no:"La fecha reconocida es el 21 de mayo de 1973. Ese día se creó la Comisión de Fomento."},
  {q:"¿En qué año se realizó la primera Fiesta Provincial del Pelón?",a:["1975","1985","1999"],correct:1,ok:"¡Exacto! La primera edición fue en 1985, para celebrar el fruto y la historia productiva local.",no:"Fue en 1985. En 1999 se sumó el homenaje al trabajador rural."},
  {q:"¿Qué elemento hizo posible transformar el valle en una zona de producción agrícola?",a:["El riego","La nieve permanente","Los bosques naturales"],correct:0,ok:"¡Muy bien! Las obras y los sistemas de riego fueron decisivos para transformar el valle.",no:"La respuesta es el riego: las obras permitieron llevar agua a las parcelas."}
];
let quizIndex=0, quizScore=0, quizAnswered=false;
const quizQuestion=document.getElementById("quizQuestion");
const quizOptions=document.getElementById("quizOptions");
const quizFeedback=document.getElementById("quizFeedback");
const quizStep=document.getElementById("quizStep");
const quizProgress=document.getElementById("quizProgress");
const quizNext=document.getElementById("quizNext");
function renderQuiz(){
  if(!quizQuestion||!quizOptions)return;
  const item=quizQuestions[quizIndex];
  quizAnswered=false;
  quizStep.textContent="PREGUNTA "+(quizIndex+1)+" DE "+quizQuestions.length;
  quizProgress.style.width=((quizIndex+1)/quizQuestions.length*100)+"%";
  quizQuestion.textContent=item.q;
  quizOptions.innerHTML="";
  item.a.forEach((answer,index)=>{
    const button=document.createElement("button");
    button.type="button";button.textContent=answer;button.dataset.answer=String(index);
    button.addEventListener("click",()=>answerQuiz(index));
    quizOptions.appendChild(button);
  });
  quizFeedback.textContent="Elegí una respuesta. ¡No hace falta saberlo todo para disfrutar el paseo!";
  quizNext.hidden=true;
  quizNext.textContent=quizIndex===quizQuestions.length-1?"Volver a jugar ↻":"Seguir descubriendo →";
}
function answerQuiz(choice){
  if(quizAnswered)return;
  quizAnswered=true;
  const item=quizQuestions[quizIndex];
  const buttons=[...quizOptions.querySelectorAll("button")];
  buttons.forEach((button,index)=>{button.disabled=true;if(index===item.correct)button.classList.add("answer-correct");if(index===choice&&choice!==item.correct)button.classList.add("answer-wrong");});
  if(choice===item.correct){quizScore++;quizFeedback.textContent=item.ok;}
  else quizFeedback.textContent=item.no;
  quizNext.hidden=false;
}
quizNext?.addEventListener("click",()=>{
  if(quizIndex===quizQuestions.length-1){
    quizIndex=0;quizScore=0;renderQuiz();
    quizFeedback.textContent="¡Vamos otra vez! Cada vuelta trae algo para aprender.";
  }else{quizIndex++;renderQuiz();}
});
renderQuiz();

/* Lectura cómoda: controles locales, sin guardar datos personales. */
document.getElementById("textLarger")?.addEventListener("click",()=>{
  document.body.classList.remove("small-text");document.body.classList.add("large-text");
});
document.getElementById("textSmaller")?.addEventListener("click",()=>{
  document.body.classList.remove("large-text");document.body.classList.add("small-text");
});
const contrastToggle=document.getElementById("contrastToggle");
contrastToggle?.addEventListener("click",()=>{
  const active=document.body.classList.toggle("high-contrast");
  contrastToggle.setAttribute("aria-pressed",String(active));
  contrastToggle.textContent=active?"Contraste normal":"Más contraste";
});

/* Compartir: usa la función nativa del dispositivo cuando está disponible. */
document.getElementById("shareSite")?.addEventListener("click",async()=>{
  const shareData={title:"Villa Pelón · Un rincón bien chañarense",text:"Un paseo para descubrir, recordar y celebrar San Patricio del Chañar.",url:window.location.href};
  const feedback=document.getElementById("shareFeedback");
  try{
    if(navigator.share){await navigator.share(shareData);if(feedback)feedback.textContent="¡Gracias por compartir este rincón chañarense!";}
    else if(navigator.clipboard){await navigator.clipboard.writeText(shareData.url);if(feedback)feedback.textContent="Enlace copiado. ¡Compartilo con alguien del Chañar!";}
    else if(feedback)feedback.textContent="Copiá la dirección de esta página para compartir Villa Pelón.";
  }catch(error){if(error.name!=="AbortError"&&feedback)feedback.textContent="No se pudo compartir automáticamente. Podés copiar la dirección de esta página.";}
});
