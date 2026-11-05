const homeScreen=document.getElementById("homeScreen");
const homeButton=document.getElementById("homeButton");
const panels=[...document.querySelectorAll(".door-panel")];
function showDoor(name){
  homeScreen.hidden=true;
  panels.forEach(panel=>panel.hidden=panel.id!=="panel-"+name);
  homeButton.hidden=false;
  window.scrollTo({top:0,behavior:"smooth"});
  const panel=document.getElementById("panel-"+name);
  panel?.querySelector(".panel-head")?.focus?.();
}
function goHome(){
  panels.forEach(panel=>panel.hidden=true);
  homeScreen.hidden=false;homeButton.hidden=true;
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-door]").forEach(button=>button.addEventListener("click",()=>showDoor(button.dataset.door)));
homeButton.addEventListener("click",goHome);
const facts=[
{icon:"🦕",title:"Un dinosaurio muy cerca de casa",text:"En la zona se encontraron restos de un dinosaurio herbívoro enorme: Panamericansaurus schroederi. Fue descrito por científicos en 2010.",source:"https://seer.ufu.br/index.php/braziliangeojournal/article/view/8170",label:"Ver la investigación científica"},
{icon:"🐦",title:"¡Hay más de 25 especies de aves!",text:"La Municipalidad menciona más de 25 especies en la zona. Entre ellas están la calandria grande, el carpintero real y la golondrina patagónica.",source:"https://sanpatricio.gob.ar/quehacer",label:"Ver información municipal"},
{icon:"🍑",title:"El pelón tiene su propia fiesta",text:"La primera Fiesta Provincial del Pelón fue en 1985. Desde 1999 también se homenajea al trabajador rural.",source:"https://masp.lmneuquen.com/fruticultura/de-desierto-la-fiesta-del-pelon-la-evolucion-san-patricio-del-chanar-y-sus-tradiciones-n1228109",label:"Conocer la historia de la fiesta"},
{icon:"💧",title:"El agua cambió el paisaje",text:"El riego permitió transformar tierras de clima seco en chacras productivas. El agua y el trabajo cambiaron la vida del valle.",source:"https://cfi.org.ar/uploads/2024/05/Neuquen_114_0.pdf",label:"Ver estudio del valle"},
{icon:"🍇",title:"Acá también hay ruta del vino",text:"San Patricio del Chañar forma parte del recorrido de bodegas y chacras de Neuquén. Se puede conocer el trabajo de la uva, desde el viñedo hasta la botella.",source:"https://turismo.neuquen.gob.ar/descubri-dinosaurios-playas-chacras-y-vinos-muy-cerca-de-neuquen/",label:"Ver turismo de Neuquén"},
{icon:"🌳",title:"El nombre nos conecta con un árbol",text:"El nombre Chañar recuerda al árbol chañar, una especie nativa del centro y norte de Argentina. La historia del nombre local merece seguir reuniendo testimonios y documentos.",source:"https://www.neuqueninforma.gob.ar/amp/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar",label:"Leer reseña histórica"},
{icon:"🇮🇹",title:"San Patricio y una historia italiana",text:"Las reseñas históricas provinciales vinculan el nombre San Patricio con Campo Filone, Italia, y la historia de la familia Gasparri.",source:"https://www.neuqueninforma.gob.ar/amp/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar",label:"Leer la reseña provincial"},
{icon:"🗓️",title:"El pueblo tiene fecha de nacimiento",text:"El 21 de mayo de 1973 se creó la Comisión de Fomento por el Decreto 1339. Esa fecha se reconoce como la fundación de San Patricio del Chañar.",source:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar",label:"Ver la historia provincial"}
];
let factIndex=0;
const factIcon=document.getElementById("factIcon"),factTitle=document.getElementById("factTitle"),factText=document.getElementById("factText"),factSource=document.getElementById("factSource"),factCounter=document.getElementById("factCounter"),factDots=document.getElementById("factDots");
function showFact(i){factIndex=(i+facts.length)%facts.length;const f=facts[factIndex];factIcon.textContent=f.icon;factTitle.textContent=f.title;factText.textContent=f.text;factSource.href=f.source;factSource.textContent=f.label+" ↗";factCounter.textContent="CURIOSIDAD "+(factIndex+1)+" DE "+facts.length;factDots.querySelectorAll("button").forEach((b,n)=>{b.classList.toggle("active",n===factIndex);b.setAttribute("aria-pressed",String(n===factIndex));});}
facts.forEach((f,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label","Ver curiosidad "+(i+1));b.addEventListener("click",()=>showFact(i));factDots.appendChild(b);});showFact(0);
document.getElementById("nextFact").addEventListener("click",()=>showFact(factIndex+1));
const stories=[
{date:"1898",emoji:"🇮🇹",title:"Una familia llega desde Italia",text:"Las reseñas provinciales ubican en 1898 la llegada de la familia Gasparri al Territorio del Neuquén. Su historia quedó ligada al nombre San Patricio.",source:"https://www.neuqueninforma.gob.ar/amp/noticias/2013/05/17/29151-ana-pechen-preside-la-ceremonia-aniversario-de-san-patricio-del-chanar"},
{date:"1966–1969",emoji:"💧",title:"El agua empieza a transformar el valle",text:"Las tierras, las obras y las concesiones de riego prepararon el camino para las chacras. Llevar agua fue clave para cambiar el paisaje productivo.",source:"https://www.legislaturaneuquen.gob.ar/SVRFILES/hln/documentos/VerTaqui/XLVII/ApendiceReunion8/Proyecto11627.pdf"},
{date:"21 MAYO 1973",emoji:"🎂",title:"Nace oficialmente San Patricio del Chañar",text:"Se creó la Comisión de Fomento mediante el Decreto provincial 1339. Por eso el 21 de mayo celebramos el aniversario del pueblo.",source:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar"},
{date:"1974–1975",emoji:"🏫",title:"Los primeros pasos de la comunidad",text:"En abril de 1974 comenzaron las primeras autoridades comunales. La reseña provincial también recuerda la cooperadora escolar y el Club Atlético San Patricio.",source:"https://www.neuqueninforma.gob.ar/noticias/2014/05/22/48785-jorge-sapag-asistira-al-41-aniversario-de-san-patricio-del-chanar"},
{date:"1985",emoji:"🍑",title:"La primera Fiesta Provincial del Pelón",text:"La fiesta nació para celebrar uno de los frutos que marcaron la producción local. Desde 1999 se sumó el homenaje al trabajador rural.",source:"https://masp.lmneuquen.com/fruticultura/de-desierto-la-fiesta-del-pelon-la-evolucion-san-patricio-del-chanar-y-sus-tradiciones-n1228109"},
{date:"2010",emoji:"🦕",title:"Un dinosaurio del Chañar llega a la ciencia",text:"Se publicó la descripción científica de Panamericansaurus schroederi, un dinosaurio herbívoro cuyos restos fueron encontrados en la zona.",source:"https://seer.ufu.br/index.php/braziliangeojournal/article/view/8170"}
];
function showStory(i){const s=stories[i];document.getElementById("storyEmoji").textContent=s.emoji;document.getElementById("storyDate").textContent=s.date;document.getElementById("storyTitle").textContent=s.title;document.getElementById("storyText").textContent=s.text;document.getElementById("storySource").href=s.source;document.querySelectorAll(".time-stop").forEach((b,n)=>b.classList.toggle("active",n===i));}
document.querySelectorAll(".time-stop").forEach((b,i)=>b.addEventListener("click",()=>showStory(i)));
const printData={postal:["MI CHAÑAR","UN LUGAR EN EL MUNDO","SAN PATRICIO DEL CHAÑAR · NEUQUÉN"],orgullo:["YO SOY DEL CHAÑAR","Y ESO SE LLEVA CON ORGULLO","SAN PATRICIO DEL CHAÑAR"],senalador:["UN RINCÓN QUE SIEMPRE VUELVE","UN RECUERDO ENTRE PÁGINAS","SAN PATRICIO DEL CHAÑAR"],hecho:["HECHO DE ACÁ","ORGULLO CHAÑARENSE","SAN PATRICIO DEL CHAÑAR"]};
document.querySelectorAll("[data-print]").forEach(b=>b.addEventListener("click",()=>{const d=printData[b.dataset.print];const sheet=document.getElementById("printSheet");sheet.innerHTML='<article class="print-page"><div class="print-border"><small>UN RINCÓN BIEN CHAÑARENSE</small><div class="print-ornament">✳ ❧ ✳</div><h1>'+d[0]+'</h1><p>'+d[1]+'</p><small>'+d[2]+'</small></div></article>';window.print();}));
document.getElementById("copyMemory").addEventListener("click",async()=>{const guide="Quiero compartir un recuerdo para Villa Pelón.\nQué aparece: \nLugar: \nFecha aproximada: \nAutor de la foto o recuerdo: \nPermiso para publicar: sí / no / consultar.";const fb=document.getElementById("memoryFeedback");try{await navigator.clipboard.writeText(guide);fb.textContent="¡Listo! Copiaste la guía. Ahora podés pegarla en un mensaje."; }catch{fb.textContent="Anotá estos datos: qué aparece, lugar, fecha, autor y permiso para publicar."; }});
document.getElementById("shareSite").addEventListener("click",async()=>{try{if(navigator.share)await navigator.share({title:"Villa Pelón",text:"Un paseo bien chañarense",url:location.href});else{await navigator.clipboard.writeText(location.href);alert("Enlace copiado para compartir.");}}catch(e){}});
