const projects = {
  hub: {
    theme: "hub",
    kicker: "Prototipos: videojuegos",
    title: "Mundos jugables en laboratorio.",
    lead: "Cosas muy WIP, muy verdes y todavía en mesa de disección: prototipos que existen para probar tono, sistemas y fantasías jugables antes de convertirse en algo definitivo."
  },
  am: {
    theme: "am",
    mode: "scene",
    sceneBackground: "../assets/web/img/AM/libreta-bg.webp",
    logo: "assets/web/img/AM/logo.webp",
    logoAlt: "Logo de Archeology Master",
    kicker: "Investigación arqueológica",
    title: "Archeology Master",
    lead: "Aventura de investigación, limpieza y dossier: encontrar artefactos no basta; hay que mirarlos, fecharlos e interpretar qué historia esconden.",
    subtitle: "Descubre, limpia, interpreta.",
    description: "Una mini landing interna para el proyecto arqueológico: exploración semi-cartoon, restauración de piezas y lectura cualitativa de evidencias. La fantasía central es convertir objetos encontrados en conocimiento defendible.",
    slides: [
      {
        src: "assets/web/img/AM/Mapa1a.webp",
        alt: "Mapa de investigación arqueológica",
        title: "Historia",
        lightbox: true,
        caption: "Versión 0.1 del mapa, WIP",
        text: "Nos ubicamos en las ficticias tierras de Puchunhuelún, una tierra cuya memoria ancestral nunca quedó guardada en la historia. Nosotros, como arqueólogos, debemos devolverle el pasado a estas tierras y, de paso, descubrir una historia llena de politiqueo, traiciones y hallazgos que nos harán replantear cómo entendemos la historia."
      },
      {
        src: "assets/web/img/AM/urna-1.webp",
        alt: "Urna arqueológica",
        title: "Artefactos",
        text: "Un solo objeto puede esconder lecturas distintas si lo giramos: marcas, desgaste y pequeños detalles cambian según la vista. Cada artefacto nos revela su propia verdad, y nosotros, como investigadores, debemos descubrirla.",
        views: [
          { src: "assets/web/img/AM/urna-1.webp", alt: "Urna arqueológica vista frontal" },
          { src: "assets/web/img/AM/urna-2.webp", alt: "Urna arqueológica vista posterior" }
        ]
      },
      {
        src: "assets/web/img/AM/mesa-limpieza.webp",
        alt: "Mesa de limpieza",
        title: "Mesa de restauración",
        text: "Tanto huesos como artefactos deben pasar por nuestra hábil mano, por nuestros ojos expertos y por nuestra habilidad histórica. La limpieza de estos objetos olvidados es vital para una mejor comprensión.",
        tools: [
          { name: "Brocha", src: "assets/img/AM/cursor-brocha.png", text: "Limpia lo grueso: tierra suelta, polvo pesado y capas superficiales.", x: 18, y: 54, r: -18 },
          { name: "Pincel", src: "assets/img/AM/cursor-pincel.png", text: "Limpia lo fino: ranuras, bordes delicados y detalles pequeños.", x: 38, y: 54, r: 12 },
          { name: "Cincel", src: "assets/img/AM/cursor-cincel.png", text: "Talla y retira residuos adheridos sin romper la pieza.", x: 61, y: 54, r: -10 },
          { name: "Mano", src: "assets/img/AM/cursor-mano.png", text: "Extrae objetos cuando ya están listos para levantarse.", x: 80, y: 54, r: 15 },
          { name: "Ojo", icon: "◉", text: "Revela información oculta: marcas, pistas y lectura contextual.", x: 50, y: 30, r: 0 }
        ]
      },
      {
        title: "Dossier",
        text: "Al finalizar cada investigación, se nos pedirá rellenar un dossier: ¿qué fue lo que descubriste de la pieza? Esto se responde completando el formulario, que luego será revisado para indicarte en qué fallaste y en qué acertaste. ¡Este es el núcleo del juego! En esto se basará tu prestigio como arqueólogo.",
        dossier: {
          cases: [
            {
              name: "Artefacto",
              id: "101",
              score: 7,
              image: "assets/web/img/AM/urna-1.webp",
              fields: [
                ["Objeto", "Urna"],
                ["Referencia a", "Cultura A"],
                ["Hecho de", "Greda"],
                ["Datado en", "Paleolítico"],
                ["Representa", "Ciclo vital"],
                ["Servía para", "Ritual"],
                ["Regido por", "Sacramental"]
              ]
            },
            {
              name: "Hueso",
              id: "113",
              score: 4,
              image: "assets/web/img/AM/calaca.webp",
              fields: [
                ["Objeto", "Cráneo"],
                ["Referencia a", "Especie animal"],
                ["Hecho de", "Hueso"],
                ["Datado en", "Mesozoico"]
              ]
            }
          ]
        }
      },
      {
        src: "assets/web/img/AM/gameplay1.webp",
        alt: "Captura de pantalla de Archeology Master",
        title: "Capturas del proyecto",
        text: "Vistas tempranas del prototipo: escenas, interfaz y pruebas visuales que todavía están en desarrollo.",
        views: [
          { src: "assets/web/img/AM/gameplay1.webp", alt: "Captura de gameplay 1" },
          { src: "assets/web/img/AM/gameplay2.webp", alt: "Captura de gameplay 2" },
          { src: "assets/web/img/AM/gameplay3.webp", alt: "Captura de gameplay 3" }
        ],
        lightbox: true,
        caption: "Versiones tempranas en RPG Maker para prototipo",
        largeViews: true
      }
    ],
    features: [
      ["Explorar", "Buscar piezas, pistas y contextos de excavación."],
      ["Restaurar", "Limpiar superficies y revelar marcas ocultas."],
      ["Dossier", "Armar una hipótesis desde evidencias parciales."]
    ],
    meters: ["Investigación", "Artefactos", "Interpretación"]
  },
  df30: {
    theme: "df30",
    mode: "shelter",
    logo: "assets/img/30DF/radio.jpg",
    logoAlt: "Marca provisional de 30 días para el fin",
    kicker: "Supervivencia narrativa",
    title: "30 días para el fin",
    lead: "Postapocalipsis íntimo, terror psicológico y supervivencia narrativa: no se trata solo de aguantar, sino de decidir cómo conservar humanidad cuando todo se acaba.",
    subtitle: "30 días. Un refugio. Nadie cuenta el fin igual.",
    description: "Prototipo de supervivencia doméstica y paranoia informativa: administrar recursos, escuchar señales contradictorias y decidir a quién creer cuando el mundo se acaba por versiones distintas.",
    slides: [
      {
        src: "assets/web/img/30DF/salon.webp",
        alt: "Salón del refugio",
        title: "Refugio",
        text: "La casa todavía está en pie, pero cada día pesa más. El salón concentra las señales del exterior: televisión, radio, visitas y rumores que nunca dicen exactamente lo mismo.",
        signal: "La televisión pide calma. La radio dice que nadie salga. Internet no carga desde anoche.",
        stats: ["Día 01/30", "Agua 42%", "Comida 58%", "Cordura inestable"],
        hotspots: [
          ["TV", "Versión oficial: todo está bajo control.", 22, 34],
          ["Radio", "Una voz repite coordenadas entre estática.", 70, 64],
          ["Puerta", "Alguien podría tocar antes de que termine el día.", 87, 42]
        ]
      },
      {
        src: "assets/web/img/30DF/cocina.webp",
        alt: "Cocina y provisiones",
        title: "Recursos",
        text: "La cocina convierte el apocalipsis en inventario: agua, comida, medicina y energía. Sobrevivir no siempre significa ganar; a veces solo significa llegar al día siguiente.",
        signal: "Racionar hoy puede salvar mañana, pero también rompe la confianza dentro del refugio.",
        stats: ["Agua crítica", "Comida media", "Medicina baja", "Energía intermitente"],
        hotspots: [
          ["Agua", "Cada vaso gastado vuelve más difícil abrirle la puerta a alguien.", 36, 58],
          ["Provisiones", "La comida alcanza, pero no para todos si llegan visitas.", 58, 55],
          ["Cocina", "Lo cotidiano se volvió sistema de supervivencia.", 74, 38]
        ]
      },
      {
        src: "assets/img/30DF/radio.jpg",
        alt: "Radio del refugio",
        title: "Señales",
        text: "El mundo se acaba según quien lo cuente: la televisión, la radio, internet o la gente que golpea la puerta. La información también es un recurso, y quizás el más peligroso.",
        signal: "...no miren directo a las ventanas... repito... no todas las visitas son humanas...",
        stats: ["TV: oficial", "Radio: emergencia", "Internet: caído", "Rumores: crecientes"],
        hotspots: [
          ["Frecuencia", "Cada transmisión contradice la anterior.", 50, 48],
          ["Ruido", "La estática a veces parece responder.", 72, 38]
        ]
      },
      {
        src: "assets/web/img/30DF/ventana.webp",
        alt: "Ventana del refugio",
        title: "Visitantes",
        text: "No todos los que llegan son enemigos, pero todos traen hambre, miedo o una versión distinta del fin. Dejar entrar a alguien puede salvar una vida o destruir el refugio desde dentro.",
        signal: "Tres golpes. Una pausa. Dos golpes más. Alguien dice conocer tu nombre.",
        stats: ["Confianza baja", "Sospecha alta", "Refugio vulnerable", "Día 07/30"],
        hotspots: [
          ["Ventana", "Mirar afuera puede darte pistas... o paranoia.", 46, 42],
          ["Silueta", "No hay retrato todavía, solo una presencia al otro lado.", 66, 55]
        ]
      },
      {
        src: "assets/web/img/30DF/3gameplay1.webp",
        alt: "Captura del prototipo 30DF",
        title: "Capturas del prototipo",
        text: "Una base jugable temprana: pantallas, pruebas de habitación y sistemas iniciales. El proyecto sigue verde, pero la fantasía central ya está definida.",
        signal: "Prototipo WIP: refugio, eventos y navegación doméstica en construcción.",
        stats: ["Sistema base", "Eventos WIP", "Arte temporal", "Narrativa en diseño"],
        views: [
          { src: "assets/web/img/30DF/3gameplay1.webp", alt: "Captura 1 del prototipo 30DF" },
          { src: "assets/web/img/30DF/3gameplay2.webp", alt: "Captura 2 del prototipo 30DF" },
          { src: "assets/img/30DF/mesa-main.png", alt: "Mesa principal del prototipo" }
        ]
      }
    ],
    features: [
      ["Refugio", "Espacios cotidianos convertidos en trinchera emocional."],
      ["Cordura", "La amenaza también vive en el cansancio, el ruido y la duda."],
      ["Cuenta regresiva", "Cada día cambia el peso de las decisiones pequeñas."]
    ],
    meters: ["Día 01/30", "Agua", "Comida", "Cordura", "Radio"]
  }
};

const body = document.body;
const stage = document.getElementById("gamesStage");
const hubPanel = document.getElementById("hubPanel");
const projectView = document.getElementById("projectView");
const buttons = document.querySelectorAll(".project-card");
let currentProjectKey = "hub";
let currentSlide = 0;
let amInkAudio;
let amInkStopTimer;
let df30RainAudio;
let df30FlickerAudio;
let df30InteractionAudio;
let projectPreviewAudio;
const activeAudio = new Set();

const amSounds = {
  preview: "assets/sonidos/am-main.mp3",
  page: "assets/sonidos/am-next-pagina.mp3",
  ink: "assets/sonidos/am-pluma.mp3",
  button: "assets/sonidos/am-botones.mp3"
};
const df30Sounds = {
  rain: "assets/sonidos/30df-ambient.mp3",
  flicker: "assets/sonidos/30df-ambient2-flicker.mp3",
  preview: "assets/sonidos/30df-main.mp3",
  hotspot: {
    door: "assets/sonidos/am-puerta.mp3",
    window: "assets/sonidos/30df-main.mp3",
    laptop: "assets/sonidos/30df-laptop.mp3",
    radio: "assets/sonidos/30df-radio.mp3",
    tv: "assets/sonidos/30df-televisor.mp3",
    history: "assets/sonidos/am-botones.mp3"
  }
};

function trackAudio(audio) {
  activeAudio.add(audio);
  audio.addEventListener("ended", () => activeAudio.delete(audio), { once: true });
  return audio;
}

function stopAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  activeAudio.delete(audio);
}

function stopProjectPreviewSound() {
  stopAudio(projectPreviewAudio);
  projectPreviewAudio = undefined;
}

function stopDf30Audio() {
  [df30RainAudio, df30FlickerAudio, df30InteractionAudio].forEach(stopAudio);
  df30RainAudio = undefined;
  df30FlickerAudio = undefined;
  df30InteractionAudio = undefined;
}

function stopAllAudio() {
  window.clearTimeout(amInkStopTimer);
  [...activeAudio].forEach(stopAudio);
  stopAudio(amInkAudio);
  amInkAudio = undefined;
  stopDf30Audio();
  stopProjectPreviewSound();
}

function playProjectPreviewSound(source) {
  stopProjectPreviewSound();
  projectPreviewAudio = trackAudio(new Audio(source));
  projectPreviewAudio.volume = .18;
  projectPreviewAudio.play().catch(() => {});
}

function playAmButtonSound() {
  const audio = trackAudio(new Audio(amSounds.button));
  audio.volume = .22;
  audio.play().catch(() => {});
}

function inkRevealDuration(text) {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  return (Math.max(0, words - 1) * 92) + 1180;
}

function playAmPageSounds(text) {
  const pageAudio = trackAudio(new Audio(amSounds.page));
  pageAudio.volume = .24;
  pageAudio.play().catch(() => {});
  window.clearTimeout(amInkStopTimer);
  stopAudio(amInkAudio);
  amInkAudio = trackAudio(new Audio(amSounds.ink));
  amInkAudio.volume = .2;
  amInkAudio.play().catch(() => {});
  amInkStopTimer = window.setTimeout(() => {
    stopAudio(amInkAudio);
    amInkAudio = undefined;
  }, inkRevealDuration(text));
}

function startDf30Ambient(room) {
  stopDf30Audio();
  df30RainAudio = trackAudio(new Audio(df30Sounds.rain));
  df30RainAudio.loop = true;
  df30RainAudio.volume = .11;
  df30FlickerAudio = trackAudio(new Audio(df30Sounds.flicker));
  df30FlickerAudio.loop = true;
  df30FlickerAudio.volume = .13;
  Promise.all([df30RainAudio.play(), df30FlickerAudio.play()])
    .then(() => room.classList.add("is-halogen-active"))
    .catch(() => {});
}

function playDf30HotspotSound(key) {
  const source = df30Sounds.hotspot[key];
  if (!source) return;
  stopAudio(df30InteractionAudio);
  df30InteractionAudio = trackAudio(new Audio(source));
  df30InteractionAudio.volume = key === "history" ? .14 : .22;
  df30InteractionAudio.play().catch(() => {});
}

const fields = {
  kicker: document.getElementById("projectKicker"),
  title: document.getElementById("projectTitle"),
  lead: document.getElementById("projectLead"),
  logoBox: document.getElementById("projectLogoBox"),
  logo: document.getElementById("projectLogo"),
  media: document.getElementById("projectMedia"),
  subtitle: document.getElementById("projectSubtitle"),
  description: document.getElementById("projectDescription"),
  features: document.getElementById("projectFeatures"),
  meter: document.getElementById("projectMeter")
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInkText(text) {
  let wordIndex = 0;
  return escapeHtml(text)
    .split(/(\s+)/)
    .map((part) => {
      if (!part.trim()) return part;
      const delay = wordIndex * 92;
      wordIndex += 1;
      return `<span class="am-ink-word" style="--ink-delay:${delay}ms">${part}</span>`;
    })
    .join("");
}


function renderDf30Glyphs(text) {
  return escapeHtml(text).split("").map((char, index) => {
    if (char === " ") return " ";
    const drift = ((index * 37) % 9) - 4;
    const lift = ((index * 19) % 7) - 3;
    const delay = (index % 11) * -83;
    const duration = 900 + ((index * 53) % 520);
    return `<span class="df30-glyph" style="--dx:${drift / 10}px; --dy:${lift / 10}px; --d:${delay}ms; --dur:${duration}ms">${char}</span>`;
  }).join("");
}

function renderDf30Panel(kicker, title, text, selected = false) {
  return `
    <p>${escapeHtml(kicker)}</p>
    <h2 data-glitch="${escapeHtml(title)}">${escapeHtml(title)}</h2>
    <span>${escapeHtml(text)}</span>
  `;
}

function renderToolHotspots(slide) {
  if (!slide.tools?.length) return "";
  return `
    <div class="am-tool-layer" aria-label="Herramientas de restauración">
      ${slide.tools.map((tool) => `
        <button type="button" class="am-tool-hotspot" style="--tool-x:${tool.x}%; --tool-y:${tool.y}%; --tool-r:${tool.r || 0}deg" aria-label="${escapeHtml(tool.name)}: ${escapeHtml(tool.text)}">
          ${tool.src ? `<img src="${tool.src}" alt="">` : `<span class="am-tool-hotspot__placeholder">${escapeHtml(tool.icon || "◉")}</span>`}
          <span class="am-tool-hotspot__note"><strong>${escapeHtml(tool.name)}</strong>${escapeHtml(tool.text)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderArtifactViews(slide) {
  const views = slide.views || [{ src: slide.src, alt: slide.alt }];
  const lightboxAttr = slide.lightbox ? ' data-lightboxable="true"' : "";
  return `
    <div class="am-artifact-views" data-view="0">
      ${views.map((view, i) => `<img class="am-artifact-view${i === 0 ? " is-active" : ""}" src="${view.src}" alt="${view.alt}"${lightboxAttr}>`).join("")}
      ${views.length > 1 ? `
        <button type="button" class="am-artifact-arrow am-artifact-arrow--prev" data-dir="-1" aria-label="Vista anterior">‹</button>
        <button type="button" class="am-artifact-arrow am-artifact-arrow--next" data-dir="1" aria-label="Vista siguiente">›</button>
      ` : ""}
    </div>
  `;
}

function initArtifactViews(root) {
  root.querySelectorAll(".am-artifact-views").forEach((viewer) => {
    const views = [...viewer.querySelectorAll(".am-artifact-view")];
    const arrows = viewer.querySelectorAll(".am-artifact-arrow");
    if (views.length < 2) return;
    let active = 0;
    const setActive = (next) => {
      active = (next + views.length) % views.length;
      views.forEach((view, i) => view.classList.toggle("is-active", i === active));
      viewer.dataset.view = String(active);
      playAmButtonSound();
    };
    arrows.forEach((arrow) => {
      arrow.addEventListener("click", (event) => {
        event.stopPropagation();
        setActive(active + Number(arrow.dataset.dir));
      });
    });
  });
}

function openLightbox(items, startIndex = 0) {
  const gallery = Array.isArray(items) ? items : [{ src: items, alt: "Imagen ampliada" }];
  let active = startIndex;
  const existing = document.querySelector(".am-lightbox");
  if (existing) existing.remove();
  const overlay = document.createElement("div");
  overlay.className = "am-lightbox";
  const render = () => {
    const item = gallery[active];
    overlay.innerHTML = `
      <button type="button" class="am-lightbox__close" aria-label="Cerrar imagen">×</button>
      ${gallery.length > 1 ? `<button type="button" class="am-lightbox__nav am-lightbox__nav--prev" data-dir="-1" aria-label="Imagen anterior">‹</button>` : ""}
      <img src="${item.src}" alt="${escapeHtml(item.alt || "Imagen ampliada")}">
      ${gallery.length > 1 ? `<button type="button" class="am-lightbox__nav am-lightbox__nav--next" data-dir="1" aria-label="Imagen siguiente">›</button>` : ""}
      ${gallery.length > 1 ? `<p class="am-lightbox__count">${active + 1} / ${gallery.length}</p>` : ""}
    `;
  };
  render();
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  const move = (dir) => {
    active = (active + dir + gallery.length) % gallery.length;
    render();
    playAmButtonSound();
  };
  overlay.addEventListener("click", (event) => {
    const nav = event.target.closest(".am-lightbox__nav");
    if (nav) return move(Number(nav.dataset.dir));
    if (event.target === overlay || event.target.closest(".am-lightbox__close")) close();
  });
  document.addEventListener("keydown", function onKey(event) {
    if (!document.body.contains(overlay)) return document.removeEventListener("keydown", onKey);
    if (event.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
}

function initLightbox(root) {
  root.querySelectorAll(".am-artifact-views").forEach((viewer) => {
    const images = [...viewer.querySelectorAll('[data-lightboxable="true"]')];
    if (!images.length) return;
    const gallery = images.map((image) => ({ src: image.currentSrc || image.src, alt: image.alt }));
    images.forEach((image, index) => image.addEventListener("click", () => openLightbox(gallery, index)));
  });
}

function renderDossier(slide) {
  if (!slide.dossier) return "";
  return `
    <section class="am-dossier-demo" aria-label="Dossier interactivo">
      <div class="am-dossier-demo__tabs">
        ${slide.dossier.cases.map((item, i) => `<button type="button" class="am-dossier-tab${i === 0 ? " is-active" : ""}" data-dossier-case="${i}">${escapeHtml(item.name)}</button>`).join("")}
      </div>
      ${slide.dossier.cases.map((item, i) => `
        <article class="am-dossier-sheet${i === 0 ? " is-active" : ""}" data-dossier-sheet="${i}">
          <header>
            <span>Dossier version 1.0</span>
            <strong>ID: ${escapeHtml(item.id)}</strong>
          </header>
          <figure class="am-dossier-postcard">
            <img src="${item.image}" alt="${escapeHtml(item.name)}">
          </figure>
          <div class="am-dossier-fields">
            ${item.fields.map(([label, value], fieldIndex) => `
              <p><em>${escapeHtml(label)}:</em> <button type="button" class="am-dossier-blank" data-answer="${escapeHtml(value)}" data-filled="false">__________</button></p>
            `).join("")}
          </div>
          <div class="am-dossier-bank">
            ${item.fields.map(([, value]) => `<button type="button" class="am-dossier-word">${escapeHtml(value)}</button>`).join("")}
          </div>
          <footer>Puntaje total <span data-dossier-score>0</span> / ${item.score}</footer>
        </article>
      `).join("")}
    </section>
  `;
}

function initDossier(root) {
  const demo = root.querySelector(".am-dossier-demo");
  if (!demo) return;
  const tabs = [...demo.querySelectorAll(".am-dossier-tab")];
  const sheets = [...demo.querySelectorAll(".am-dossier-sheet")];
  const activate = (index) => {
    tabs.forEach((tab, i) => tab.classList.toggle("is-active", i === index));
    sheets.forEach((sheet, i) => sheet.classList.toggle("is-active", i === index));
    playAmButtonSound();
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => activate(Number(tab.dataset.dossierCase))));
  demo.querySelectorAll(".am-dossier-word").forEach((word) => {
    word.addEventListener("click", () => {
      const sheet = word.closest(".am-dossier-sheet");
      const blanks = [...sheet.querySelectorAll(".am-dossier-blank")];
      const target = blanks.find((blank) => blank.dataset.filled === "false" && blank.dataset.answer === word.textContent);
      if (!target) return;
      target.textContent = word.textContent;
      target.dataset.filled = "true";
      word.disabled = true;
      sheet.querySelector("[data-dossier-score]").textContent = String(sheet.querySelectorAll('.am-dossier-blank[data-filled="true"]:not([data-answer="N/A"])').length);
    });
  });
}

function renderShelterScene(project) {
  const zones = [
    {
      key: "door",
      intensity: "soft",
      kicker: "Entorno inmediato",
      label: "Puerta",
      title: "La puerta",
      text: "El lugar en donde entran y salen personas.\nAhora, puede que entren más que las que salgan.",
      x: 14.6,
      y: 49.9,
      w: 17.3,
      h: 64.4
    },
    {
      key: "window",
      intensity: "soft",
      kicker: "Las cercanías exteriores",
      label: "Ventana",
      title: "La ventana",
      text: "Tu lugar para observar el exterior. De ahí, una solitaria carretera permanece en silencio.",
      x: 42.0,
      y: 31.4,
      w: 30.1,
      h: 37.3
    },
    {
      key: "laptop",
      intensity: "hard",
      kicker: "Comunicación mundial",
      label: "Laptop",
      title: "El laptop",
      text: "Tu dispositivo de comunicación global.\nCon luz, te permite conocer las noticias del mundo. Quizás necesites baterías para cuando ya no haya luz.",
      x: 32.9,
      y: 63.8,
      w: 10.6,
      h: 12.9
    },
    {
      key: "radio",
      intensity: "hard",
      kicker: "Comunicación local",
      label: "Radio",
      title: "La radio",
      text: "Tu fiel y vieja radio, que conservas por pura nostalgia, ahora es un buen aliado informativo de tu localidad.",
      x: 51.6,
      y: 66.6,
      w: 8.4,
      h: 8.9
    },
    {
      key: "tv",
      intensity: "hard",
      kicker: "Comunicación nacional",
      label: "Televisión",
      title: "La televisión",
      text: "En ella puedes perder el tiempo o ver las noticias nacionales. Quizás te ayude a descifrar qué está pasando realmente.",
      x: 75.3,
      y: 54.7,
      w: 28.6,
      h: 29.2
    },
    {
      key: "history",
      intensity: "mid",
      kicker: "Contexto",
      label: "Historia",
      title: "Historia",
      text: "Eres un profesional de la salud mental, que debe gestionar sus recursos en los albores del fin del mundo. ¿Guerras? ¿Pestes? ¿Aliens? Todos tienen su versión de los hechos. Y tú decidirás si dejarás entrar a extraños a tu hogar, o si preferirás aislarte de todos... Aunque quizás no sea buena idea.",
      x: 72.8,
      y: 77.8,
      w: 18.8,
      h: 22.0
    }
  ];
  return `
    <section class="df30-room" aria-label="Refugio interactivo de 30 días para el fin">
      <div class="df30-room__bg" role="img" aria-label="Salón del refugio"></div>
      <div class="df30-room__shade"></div>
      <article class="df30-room__intro df30-info--mid" data-df30-panel>
        ${renderDf30Panel("Concepto", "30 días para el fin", "Es un juego de supervivencia, gestión y narrativa de suspence, que nos plantea dudas acerca de la información, la confianza y la sanidad mental en tiempos de crisis.")}
      </article>
      <div class="df30-room__hotspots" aria-label="Zonas interactivas del refugio">
        ${zones.map((zone) => `
          <button type="button" class="df30-room__hotspot df30-room__hotspot--${zone.key}" style="--x:${zone.x}%; --y:${zone.y}%; --w:${zone.w}%; --h:${zone.h}%" data-title="${escapeHtml(zone.title)}" data-text="${escapeHtml(zone.text)}" data-kicker="${escapeHtml(zone.kicker)}" data-intensity="${escapeHtml(zone.intensity)}" aria-label="${escapeHtml(zone.label)}">
            <span>${escapeHtml(zone.label)}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function initDf30Room(root) {
  const panel = root.querySelector("[data-df30-panel]");
  const room = root.querySelector(".df30-room");
  if (!panel || !room) return;
  startDf30Ambient(room);
  root.querySelectorAll(".df30-room__hotspot").forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      const key = [...hotspot.classList].find((name) => name.startsWith("df30-room__hotspot--"))?.replace("df30-room__hotspot--", "");
      playDf30HotspotSound(key);
      root.querySelectorAll(".df30-room__hotspot").forEach((item) => item.classList.toggle("is-active", item === hotspot));
      panel.classList.remove("df30-info--soft", "df30-info--mid", "df30-info--hard", "is-switching");
      void panel.offsetWidth;
      panel.classList.add("is-selected", `df30-info--${hotspot.dataset.intensity || "mid"}`, "is-switching");
      panel.innerHTML = renderDf30Panel(hotspot.dataset.kicker || "Registro del refugio", hotspot.dataset.title, hotspot.dataset.text, true);
      window.setTimeout(() => panel.classList.remove("is-switching"), 520);
    });
  });
}

function renderSlide(project, index) {
  currentSlide = (index + project.slides.length) % project.slides.length;
  const slide = project.slides[currentSlide];

  if (project.mode === "scene") {
    fields.media.innerHTML = `
      <section class="am-book-full" style="--book-bg: url('${project.sceneBackground}')">
        <div class="am-book-full__page am-book-full__page--left">
          <h2>Archeology Master</h2>
          <p class="am-book-full__intro">Prototipo sobre observar, limpiar e interpretar piezas antiguas hasta convertir un hallazgo en hipótesis.</p>
          <nav class="am-book-full__index" aria-label="Textos clave de Archeology Master">
            ${project.slides.map((item, i) => `<button type="button" class="am-index-item am-index-item--${i}${i === currentSlide ? " is-active" : ""}" data-slide="${i}">${item.title}</button>`).join("")}
          </nav>
        </div>
        <article class="am-book-full__page am-book-full__page--right">
          <div class="am-book-full__note">
            <p>Nota de campo</p>
            <h3>${slide.title}</h3>
            <span class="am-ink-text">${renderInkText(slide.text)}</span>
          </div>
          ${slide.dossier ? renderDossier(slide) : `
          <figure class="am-book-full__image${slide.tools?.length ? " has-tools" : ""}${slide.views?.length ? " has-artifact-views" : ""}${slide.largeViews ? " has-large-views" : ""}${slide.lightbox ? " has-lightbox" : ""}">
            ${renderArtifactViews(slide)}
            ${renderToolHotspots(slide)}
            ${slide.caption ? `<figcaption class="am-image-caption">${escapeHtml(slide.caption)}</figcaption>` : ""}
          </figure>`}
        </article>
      </section>
    `;

    fields.media.querySelectorAll(".am-index-item").forEach((tab) => {
      tab.addEventListener("click", () => {
        const nextSlide = project.slides[Number(tab.dataset.slide)];
        playAmPageSounds(nextSlide.text);
        renderSlide(project, Number(tab.dataset.slide));
      });
    });
    initArtifactViews(fields.media);
    initDossier(fields.media);
    initLightbox(fields.media);
    return;
  }

  if (project.mode === "shelter") {
    fields.media.innerHTML = renderShelterScene(project);
    initDf30Room(fields.media);
    return;
  }

  fields.media.innerHTML = `
    <figure class="project-slider">
      <img src="${slide.src}" alt="${slide.alt}">
      <figcaption>
        <strong>${slide.title}</strong>
        <span>${slide.text}</span>
      </figcaption>
    </figure>
    <div class="project-slider__controls" aria-label="Controles del slider">
      ${project.slides.map((item, i) => `<button type="button" class="slider-dot${i === currentSlide ? " is-active" : ""}" data-slide="${i}" aria-label="Ver ${item.title}"></button>`).join("")}
    </div>
  `;

  fields.media.querySelectorAll(".slider-dot").forEach((dot) => {
    dot.addEventListener("click", () => renderSlide(project, Number(dot.dataset.slide)));
  });
}

function requestGamesLandscape() {
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  const orientation = window.screen?.orientation;
  if (typeof orientation?.lock !== "function") return;
  orientation.lock("landscape").catch(() => {});
}

function releaseGamesLandscape() {
  if (!window.matchMedia("(max-width: 760px)").matches) return;
  window.screen?.orientation?.unlock?.();
}

function renderProject(key) {
  const project = projects[key] || projects.hub;
  stopAllAudio();
  currentProjectKey = key;
  currentSlide = 0;
  stage.classList.remove("is-switching");
  void stage.offsetWidth;
  stage.classList.add("is-switching");

  body.className = `theme-${project.theme}`;
  if (key === "hub") releaseGamesLandscape();
  else requestGamesLandscape();
  fields.kicker.textContent = project.kicker;
  fields.title.textContent = project.title;
  fields.lead.textContent = project.lead;

  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.project === key);
  });

  if (key === "hub") {
    fields.logoBox.hidden = true;
    hubPanel.hidden = false;
    projectView.hidden = true;
    return;
  }

  fields.logo.src = project.logo;
  fields.logo.alt = project.logoAlt;
  fields.logoBox.hidden = false;
  hubPanel.hidden = true;
  projectView.hidden = false;
  fields.subtitle.textContent = project.subtitle;
  fields.description.textContent = project.description;
  renderSlide(project, 0);
  fields.features.innerHTML = project.features.map(([title, text]) => `
    <article><strong>${title}</strong><span>${text}</span></article>
  `).join("");
  fields.meter.innerHTML = project.meters.map((item) => `<span>${item}</span>`).join("");
}

buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    const source = button.dataset.project === "am" ? amSounds.preview : df30Sounds.preview;
    playProjectPreviewSound(source);
  });
  button.addEventListener("mouseleave", stopProjectPreviewSound);
  button.addEventListener("click", () => renderProject(button.dataset.project));
});

window.addEventListener("pagehide", stopAllAudio);

stage.addEventListener("animationend", (event) => {
  if (event.animationName === "signalSwap") stage.classList.remove("is-switching");
});

renderProject("hub");
