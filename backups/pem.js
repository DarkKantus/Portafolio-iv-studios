const navGroups = document.querySelectorAll(".pem-nav__group");
const navTriggers = document.querySelectorAll(".pem-nav__trigger");
const submenuItems = document.querySelectorAll(".pem-submenu__item");

const panelKicker = document.getElementById("pemPanelKicker");
const panelTitle = document.getElementById("pemPanelTitle");
const panelText = document.getElementById("pemPanelText");
const panelVisual = document.getElementById("pemVisual");

let closeMenuTimeout = null;

// ======================================
// SLIDER DE IMÁGENES
// ======================================
const IMG_BASE = "./assets/img/pem";
let sliderInterval = null;
let sliderPaused = false;
const EXT_LIST = ["png", "jpg", "webp", "jpeg"];

// cache de URLs verificadas
const imagesCache = new Map();

async function checkImage(visual, index) {
  for (const ext of EXT_LIST) {
    const url = `${IMG_BASE}/${visual}-${index}.${ext}`;
    if (imagesCache.has(url)) return imagesCache.get(url);
    const img = new Image();
    try {
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      imagesCache.set(url, url);
      console.log(`[slider] imagen OK: ${url}`);
      return url;
    } catch {
      // prueba siguiente extensión
    }
  }
  console.log(`[slider] no encontrada: ${visual}-${index} (probadas ${EXT_LIST.join(",")})`);
  return null;
}

async function buildSlider(visual) {
  // limpia interval anterior
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }

  // detecta cuántas imágenes existen probando hasta 20
  const slides = [];
  for (let i = 1; i <= 20; i++) {
    const url = await checkImage(visual, i);
    if (url) slides.push(url);
    else break;
  }

  if (slides.length === 0) {
    // fallback: imagen única sin número (e.g. conceptual.png)
    for (const ext of EXT_LIST) {
      const url = `${IMG_BASE}/${visual}.${ext}`;
      const cached = imagesCache.get(url);
      if (cached) {
        panelVisual.innerHTML = `<div class="pem-visual" style="background-image:url('${cached}');background-size:cover;background-position:center;"></div>`;
        return;
      }
    }
    const url = `${IMG_BASE}/${visual}.png`;
    panelVisual.innerHTML = `<div class="pem-visual" style="background-image:url('${url}');background-size:cover;background-position:center;"></div>`;
    return;
  }

  panelVisual.innerHTML = `<div class="pem-visual__slider">
    ${slides.map((src, i) => `
      <div class="pem-visual__slide${i === 0 ? " is-active" : ""}"
           style="background-image: url('${src}');"></div>
    `).join("")}
  </div>`;

  // pausa en hover
  const slider = panelVisual.querySelector(".pem-visual__slider");
  if (slider) {
    slider.addEventListener("mouseenter", () => { sliderPaused = true; });
    slider.addEventListener("mouseleave", () => { sliderPaused = false; });
  }

  // auto-advance: transición controlada para que el último -> primero no salte
  let current = 0;
  sliderInterval = setInterval(() => {
    const allSlides = panelVisual.querySelectorAll(".pem-visual__slide");
    if (sliderPaused || allSlides.length <= 1) return;

    const next = (current + 1) % allSlides.length;
    const currentSlide = allSlides[current];
    const nextSlide = allSlides[next];

    slider.classList.add("is-glitching");
    currentSlide.classList.add("is-leaving");
    nextSlide.classList.add("is-active", "is-entering");

    window.setTimeout(() => {
      currentSlide.classList.remove("is-active", "is-leaving");
      nextSlide.classList.remove("is-entering");
      slider.classList.remove("is-glitching");
      current = next;
    }, 720);
  }, 3200);
}

// slider inicial — Contexto
buildSlider("contexto");

// ======================================
// NAVEGACIÓN
// ======================================

function clearCloseMenuTimer() {
  if (closeMenuTimeout) {
    clearTimeout(closeMenuTimeout);
    closeMenuTimeout = null;
  }
}

function startCloseMenuTimer() {
  clearCloseMenuTimer();
  closeMenuTimeout = setTimeout(() => {
    closeAllMenus();
  }, 800);
}

function closeAllMenus() {
  navGroups.forEach(group => group.classList.remove("is-open"));
  navTriggers.forEach(btn => btn.classList.remove("is-active"));
}

function setActiveTrigger(trigger) {
  navTriggers.forEach(btn => btn.classList.remove("is-active"));
  trigger.classList.add("is-active");
}

navTriggers.forEach(trigger => {
  trigger.addEventListener("click", (e) => {
    const group = e.currentTarget.closest(".pem-nav__group");
    const isOpen = group.classList.contains("is-open");

    clearCloseMenuTimer();
    closeAllMenus();

    if (!isOpen) {
      group.classList.add("is-open");
      setActiveTrigger(trigger);
      startCloseMenuTimer();
    }
  });
});

navGroups.forEach(group => {
  group.addEventListener("mouseenter", () => {
    if (window.innerWidth > 720) {
      clearCloseMenuTimer();
      closeAllMenus();
      group.classList.add("is-open");

      const trigger = group.querySelector(".pem-nav__trigger");
      if (trigger) setActiveTrigger(trigger);
    }
  });

  group.addEventListener("mouseleave", () => {
    if (window.innerWidth > 720) {
      startCloseMenuTimer();
    }
  });

  group.addEventListener("mousemove", () => {
    if (window.innerWidth > 720) {
      clearCloseMenuTimer();
    }
  });
});

submenuItems.forEach(item => {
  item.addEventListener("click", () => {
    submenuItems.forEach(btn => btn.classList.remove("is-active"));
    item.classList.add("is-active");

    const title = item.dataset.panelTitle || "";
    const kicker = item.dataset.panelKicker || "";
    const text = item.dataset.panelText || "";
    const visual = item.dataset.panelVisual || "contexto";

    panelKicker.textContent = kicker;
    panelTitle.textContent = title;
    panelText.textContent = text;

    // slider async
    buildSlider(visual);

    const parentGroup = item.closest(".pem-nav__group");
    const trigger = parentGroup?.querySelector(".pem-nav__trigger");

    if (trigger) {
      setActiveTrigger(trigger);
    }

    startCloseMenuTimer();
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".pem-nav")) {
    clearCloseMenuTimer();
    closeAllMenus();
  }
});

// ======================================
// MARTE HOLOGRÁFICO
// ======================================

function createMarsGlobe(container, options = {}) {
  if (!container) return null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(2, options.segments || 16, options.segments || 16);
  const material = new THREE.MeshBasicMaterial({
    color: options.color || 0xc4622d,
    wireframe: true
  });

  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  camera.position.z = options.cameraZ || 5;

  let targetX = 0;
  let targetY = 0;
  let autoAngle = options.initialY || 0;
  const autoSpin = options.autoSpin === false ? 0 : (options.autoSpin || 0.004);
  const mouseInfluence = options.mouseInfluence ?? 0.42;
  const returnToCenter = options.returnToCenter !== false;
  const dragEnabled = options.drag === true;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let manualRotationX = options.initialX || 0;
  let manualRotationY = options.initialY || 0;
  let frameCallback = null;

  function resize() {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  container.addEventListener("pointerdown", (event) => {
    if (!dragEnabled) return;
    isDragging = true;
    lastPointerX = event.clientX;
    lastPointerY = event.clientY;
    container.setPointerCapture?.(event.pointerId);
  });

  container.addEventListener("pointerup", (event) => {
    if (!dragEnabled) return;
    isDragging = false;
    container.releasePointerCapture?.(event.pointerId);
  });

  container.addEventListener("pointermove", (event) => {
    const rect = container.getBoundingClientRect();

    if (dragEnabled && isDragging) {
      const dx = event.clientX - lastPointerX;
      const dy = event.clientY - lastPointerY;
      manualRotationY += dx * 0.008;
      manualRotationX += dy * 0.006;
      manualRotationX = Math.max(-0.9, Math.min(0.9, manualRotationX));
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      targetY = manualRotationY;
      targetX = manualRotationX;
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const hoverY = (x - 0.5) * mouseInfluence;
    const hoverX = (y - 0.5) * mouseInfluence;
    targetY = dragEnabled ? manualRotationY + hoverY : hoverY;
    targetX = dragEnabled ? manualRotationX + hoverX : hoverX;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
    if (dragEnabled) {
      targetY = manualRotationY;
      targetX = manualRotationX;
      return;
    }
    if (!returnToCenter) return;
    targetX = 0;
    targetY = 0;
  });

  function animate() {
    requestAnimationFrame(animate);
    autoAngle += autoSpin;
    globe.rotation.y += ((autoAngle + targetY) - globe.rotation.y) * 0.08;
    globe.rotation.x += (targetX - globe.rotation.x) * 0.08;
    renderer.render(scene, camera);
    frameCallback?.({ globe, camera, container });
  }

  resize();
  animate();
  window.addEventListener("resize", resize);

  return {
    resize,
    setFrameCallback(fn) {
      frameCallback = fn;
    }
  };
}

const smallGlobe = createMarsGlobe(document.getElementById("mars-globe"), {
  autoSpin: 0.004,
  mouseInfluence: 0.35,
  segments: 16
});

const largeGlobe = createMarsGlobe(document.getElementById("mars-globe-large"), {
  cameraZ: 4.8,
  autoSpin: false,
  mouseInfluence: 0.10,
  drag: true,
  returnToCenter: false,
  segments: 24
});

const globeTrigger = document.getElementById("mars-globe");
const commandMain = document.querySelector(".pem-command__main");
const planetModule = document.getElementById("pemPlanetModule");

if (globeTrigger && commandMain && planetModule) {
  globeTrigger.addEventListener("click", () => {
    const isOpen = commandMain.classList.toggle("is-planet-open");
    planetModule.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) clearPlanetSelection();
    window.setTimeout(() => largeGlobe?.resize(), 680);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && commandMain.classList.contains("is-planet-open")) {
      commandMain.classList.remove("is-planet-open");
      planetModule.setAttribute("aria-hidden", "true");
    }
  });
}

const planetNodes = document.querySelectorAll(".pem-planet-node");
const planetKicker = document.getElementById("pemPlanetKicker");
const planetTitle = document.getElementById("pemPlanetTitle");
const planetText = document.getElementById("pemPlanetText");
const planetBrief = document.querySelector(".pem-planet-brief");

const planetStage = document.querySelector(".pem-planet-stage");
const planetNodeVectors = new Map();

function latLonToVector(lat, lon, radius = 1.82) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

planetNodes.forEach(node => {
  const lat = Number(node.dataset.lat || 0);
  const lon = Number(node.dataset.lon || 0);
  planetNodeVectors.set(node, latLonToVector(lat, lon));
});

function updatePlanetNodePositions({ globe, camera, container }) {
  if (!planetStage) return;
  const stageRect = planetStage.getBoundingClientRect();
  const globeRect = container.getBoundingClientRect();

  planetNodes.forEach(node => {
    const base = planetNodeVectors.get(node);
    if (!base) return;

    const rotated = base.clone().applyEuler(globe.rotation);
    const projected = rotated.clone().project(camera);

    const x = (projected.x * 0.5 + 0.5) * globeRect.width + (globeRect.left - stageRect.left);
    const y = (-projected.y * 0.5 + 0.5) * globeRect.height + (globeRect.top - stageRect.top);
    const isFront = rotated.z > -0.1;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.opacity = isFront ? "1" : "0.13";
    node.style.pointerEvents = isFront ? "auto" : "none";
    node.style.transform = `translate(-50%, -50%) scale(${isFront ? 1 : 0.72})`;
  });
}

largeGlobe?.setFrameCallback(updatePlanetNodePositions);

function clearPlanetSelection() {
  commandMain?.classList.remove("has-planet-selection");
  planetBrief?.setAttribute("aria-hidden", "true");
  planetBrief?.style.setProperty("--planet-entry-image", "none");
  planetNodes.forEach(item => item.classList.remove("is-active"));
  if (planetKicker) planetKicker.textContent = "";
  if (planetTitle) planetTitle.textContent = "";
  if (planetText) planetText.textContent = "";
}


planetNodes.forEach(node => {
  node.addEventListener("click", () => {
    planetNodes.forEach(item => item.classList.remove("is-active"));
    node.classList.add("is-active");
    commandMain?.classList.add("has-planet-selection");
    planetBrief?.setAttribute("aria-hidden", "false");

    const image = node.dataset.nodeImage;
    const imageUrl = image ? new URL(image, document.baseURI).href : "";
    planetBrief?.style.setProperty("--planet-entry-image", imageUrl ? `url("${imageUrl}")` : "none");

    planetBrief?.classList.add("is-switching");
    window.setTimeout(() => planetBrief?.classList.remove("is-switching"), 620);

    if (planetKicker) planetKicker.textContent = node.dataset.nodeKicker || "Registro";
    if (planetTitle) planetTitle.textContent = node.dataset.nodeTitle || "Zona desconocida";
    if (planetText) planetText.textContent = node.dataset.nodeText || "Sin datos disponibles.";
  });
});


const themeToggle = document.getElementById("pemThemeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("pem-dark-mode");
    themeToggle.textContent = isDark ? "☀" : "☾";
  });
}
