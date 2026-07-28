const navGroups = document.querySelectorAll('.pem-nav__group');
const navTriggers = document.querySelectorAll('.pem-nav__trigger');
const submenuItems = document.querySelectorAll('.pem-submenu__item');
const panelKicker = document.getElementById('pemPanelKicker');
const panelTitle = document.getElementById('pemPanelTitle');
const panelText = document.getElementById('pemPanelText');
const panelVisual = document.getElementById('pemVisual');
const historyImages = [
  'assets/web/img/pem/Historia/asentamiento militar en ruinas.webp',
  'assets/web/img/pem/Historia/Centro hidroponico en ruinas.webp',
  'assets/web/img/pem/Historia/centro hidropónico local.webp',
  'assets/web/img/pem/Historia/fábrica infectada.webp',
  'assets/web/img/pem/Historia/Extractor de Marcurenio.webp',
  'assets/web/img/pem/Historia/Plataforma de despege.webp',
  'assets/web/img/pem/Historia/ultimo bastión de la humanidad.webp'
];
let sliderInterval = null;
let sliderPaused = false;
let closeMenuTimeout = null;

const pemSounds = {
  ambient: 'assets/sonidos/pem-ambient.mp3',
  button: 'assets/sonidos/pem-botones.mp3',
  static: 'assets/sonidos/pem-static.mp3'
};
let pemAmbientAudio;
const pemActiveAudio = new Set();

function trackPemAudio(audio) {
  pemActiveAudio.add(audio);
  audio.addEventListener('ended', () => pemActiveAudio.delete(audio), { once: true });
  return audio;
}

function stopPemAudio(audio) {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  pemActiveAudio.delete(audio);
}

function startPemAmbient() {
  if (pemAmbientAudio && !pemAmbientAudio.paused) return;
  if (!pemAmbientAudio) {
    pemAmbientAudio = trackPemAudio(new Audio(pemSounds.ambient));
    pemAmbientAudio.loop = true;
    pemAmbientAudio.volume = .12;
  }
  pemAmbientAudio.play().catch(() => {});
}

function playPemButtonSounds() {
  const buttonAudio = trackPemAudio(new Audio(pemSounds.button));
  buttonAudio.volume = .22;
  buttonAudio.play().catch(() => {});
  const staticAudio = trackPemAudio(new Audio(pemSounds.static));
  staticAudio.volume = .14;
  staticAudio.play().catch(() => {});
}

function stopAllPemAudio() {
  [...pemActiveAudio].forEach(stopPemAudio);
  pemAmbientAudio = undefined;
}

startPemAmbient();
document.addEventListener('pointerdown', startPemAmbient, { once: true });
document.addEventListener('click', (event) => {
  if (event.target.closest('button')) playPemButtonSounds();
});
window.addEventListener('pagehide', stopAllPemAudio);

function buildSlider(images) {
  if (sliderInterval) clearInterval(sliderInterval);
  sliderInterval = null;
  const slides = images.filter(Boolean).map((src) => new URL(src, document.baseURI).href);
  if (!slides.length) { panelVisual.innerHTML = ''; return; }
  panelVisual.innerHTML = `<div class="pem-visual__slider">${slides.map((src, i) => `<div class="pem-visual__slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${src}')"></div>`).join('')}</div>`;
  const slider = panelVisual.querySelector('.pem-visual__slider');
  slider.addEventListener('mouseenter', () => { sliderPaused = true; });
  slider.addEventListener('mouseleave', () => { sliderPaused = false; });
  let current = 0;
  sliderInterval = window.setInterval(() => {
    const all = panelVisual.querySelectorAll('.pem-visual__slide');
    if (sliderPaused || all.length < 2) return;
    const next = (current + 1) % all.length;
    slider.classList.add('is-glitching');
    all[current].classList.add('is-leaving');
    all[next].classList.add('is-active', 'is-entering');
    window.setTimeout(() => {
      all[current].classList.remove('is-active', 'is-leaving');
      all[next].classList.remove('is-entering');
      slider.classList.remove('is-glitching');
      current = next;
    }, 720);
  }, 3200);
}

function clearCloseMenuTimer() { if (closeMenuTimeout) clearTimeout(closeMenuTimeout); closeMenuTimeout = null; }
function closeAllMenus() { navGroups.forEach((group) => group.classList.remove('is-open')); }
function setActiveTrigger(trigger) { navTriggers.forEach((button) => button.classList.toggle('is-active', button === trigger)); }
function showPanel(source) {
  commandMain?.classList.remove('is-planet-open');
  planetModule?.setAttribute('aria-hidden', 'true');
  const images = (source.dataset.panelImages || '').split('|').filter(Boolean);
  panelKicker.textContent = source.dataset.panelKicker || '';
  panelTitle.textContent = source.dataset.panelTitle || '';
  panelText.textContent = source.dataset.panelText || '';
  buildSlider(images);
}
function openPlanet() {
  const commandMain = document.querySelector('.pem-command__main');
  const module = document.getElementById('pemPlanetModule');
  if (!commandMain || !module) return;
  largeGlobe?.setActive(true);
  commandMain.classList.add('is-planet-open');
  module.setAttribute('aria-hidden', 'false');
  clearPlanetSelection();
  window.setTimeout(() => largeGlobe?.resize(), 680);
}
function togglePlanet() {
  if (commandMain?.classList.contains('is-planet-open')) {
    largeGlobe?.setActive(false);
    commandMain.classList.remove('is-planet-open');
    planetModule?.setAttribute('aria-hidden', 'true');
    return;
  }
  openPlanet();
}

navTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const group = trigger.closest('.pem-nav__group');
    clearCloseMenuTimer();
    if (trigger.dataset.action === 'planet') {
      closeAllMenus(); setActiveTrigger(trigger); togglePlanet(); return;
    }
    if (group.classList.contains('pem-nav__group--direct')) {
      closeAllMenus(); setActiveTrigger(trigger); showPanel(trigger); return;
    }
    const wasOpen = group.classList.contains('is-open');
    closeAllMenus();
    if (!wasOpen) { group.classList.add('is-open'); setActiveTrigger(trigger); }
  });
});

navGroups.forEach((group) => {
  if (group.classList.contains('pem-nav__group--direct')) return;
  group.addEventListener('mouseenter', () => {
    if (window.innerWidth > 720) { closeAllMenus(); group.classList.add('is-open'); setActiveTrigger(group.querySelector('.pem-nav__trigger')); }
  });
  group.addEventListener('mouseleave', () => { if (window.innerWidth > 720) { clearCloseMenuTimer(); closeMenuTimeout = setTimeout(closeAllMenus, 800); } });
});
submenuItems.forEach((item) => item.addEventListener('click', () => {
  submenuItems.forEach((button) => button.classList.remove('is-active'));
  item.classList.add('is-active');
  setActiveTrigger(item.closest('.pem-nav__group').querySelector('.pem-nav__trigger'));
  showPanel(item);
  clearCloseMenuTimer();
  closeMenuTimeout = setTimeout(closeAllMenus, 800);
}));
document.addEventListener('click', (event) => { if (!event.target.closest('.pem-nav')) closeAllMenus(); });
buildSlider(historyImages);

function createMarsGlobe(container, options = {}) {
  if (!container || !window.THREE) return null;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  container.innerHTML = ''; container.appendChild(renderer.domElement);
  const geometry = new THREE.SphereGeometry(2, options.segments || 16, options.segments || 16);
  const material = new THREE.MeshBasicMaterial({ color: options.color || 0xc4622d, wireframe: true });
  const globe = new THREE.Mesh(geometry, material); scene.add(globe); camera.position.z = options.cameraZ || 5;

  // A single yaw state preserves a stable, horizontal equator. No free quaternion/roll.
  const autoSpin = options.autoSpin === false ? 0 : (options.autoSpin || 0.004);
  let autoYaw = 0, targetYaw = options.initialY || 0, hoverYaw = 0;
  let dragging = false, lastX = 0, frameCallback = null, frameId = null, active = options.active !== false;

  const wrapAngle = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));
  const shortestAngleDelta = (from, to) => wrapAngle(to - from);
  const requestRender = () => {
    if (!active || frameId !== null) return;
    frameId = requestAnimationFrame(renderFrame);
  };
  function resize() {
    const width = container.clientWidth || 1, height = container.clientHeight || 1;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    requestRender();
  }
  function renderFrame() {
    frameId = null;
    if (!active) return;
    autoYaw += autoSpin;
    const desiredYaw = targetYaw + hoverYaw + autoYaw;
    const yawDelta = shortestAngleDelta(globe.rotation.y, desiredYaw);
    globe.rotation.y += yawDelta * .11;
    globe.rotation.x = 0;
    globe.rotation.z = 0;
    renderer.render(scene, camera);
    frameCallback?.({ globe, camera, container });
    // The large globe wakes only for interaction/focus; the small globe keeps its ambient spin.
    if (autoSpin !== 0 || dragging || Math.abs(yawDelta) > .0004) requestRender();
  }

  container.addEventListener('pointerdown', (event) => {
    if (!options.drag) return;
    dragging = true;
    lastX = event.clientX;
    container.setPointerCapture?.(event.pointerId);
    requestRender();
  });
  container.addEventListener('pointerup', (event) => {
    dragging = false;
    container.releasePointerCapture?.(event.pointerId);
  });
  container.addEventListener('pointermove', (event) => {
    const rect = container.getBoundingClientRect();
    if (options.drag && dragging) {
      // Horizontal drag only: the equator remains the central visual guide.
      targetYaw += (event.clientX - lastX) * .008;
      lastX = event.clientX;
      requestRender();
      return;
    }
    if (!options.drag) {
      hoverYaw = ((event.clientX - rect.left) / rect.width - .5) * (options.mouseInfluence ?? .42);
      requestRender();
    }
  });
  container.addEventListener('mouseleave', () => {
    dragging = false;
    if (!options.drag) { hoverYaw = 0; requestRender(); }
  });

  resize();
  return {
    resize,
    setActive(isActive) {
      active = Boolean(isActive);
      if (active) requestRender();
    },
    focusVector(vector) {
      // Rotate only around Y until this longitude is camera-facing; latitude stays geographically true.
      targetYaw = Math.atan2(-vector.x, vector.z);
      requestRender();
    },
    setFrameCallback(fn) { frameCallback = fn; requestRender(); }
  };
}

const smallGlobe = createMarsGlobe(document.getElementById('mars-globe'), { autoSpin: .004, mouseInfluence: .35, segments: 16 });
const largeGlobe = createMarsGlobe(document.getElementById('mars-globe-large'), { cameraZ: 4.8, autoSpin: false, drag: true, segments: 24, active: false });
const globeTrigger = document.getElementById('mars-globe');
const commandMain = document.querySelector('.pem-command__main');
const planetModule = document.getElementById('pemPlanetModule');
if (globeTrigger) globeTrigger.addEventListener('click', togglePlanet);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && commandMain?.classList.contains('is-planet-open')) { largeGlobe?.setActive(false); commandMain.classList.remove('is-planet-open'); planetModule?.setAttribute('aria-hidden', 'true'); } });

const planetNodes = document.querySelectorAll('.pem-planet-node');
const planetStage = document.querySelector('.pem-planet-stage');
const planetBrief = document.querySelector('.pem-planet-brief');
const planetKicker = document.getElementById('pemPlanetKicker');
const planetTitle = document.getElementById('pemPlanetTitle');
const planetText = document.getElementById('pemPlanetText');
const nodeVectors = new Map();
const projectedNode = new THREE.Vector3();
function latLonToVector(lat, lon, radius = 1.82) { const phi = THREE.MathUtils.degToRad(90 - lat), theta = THREE.MathUtils.degToRad(lon + 180); return new THREE.Vector3(-(radius * Math.sin(phi) * Math.cos(theta)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)); }
planetNodes.forEach((node) => nodeVectors.set(node, latLonToVector(Number(node.dataset.lat), Number(node.dataset.lon))));
function updatePlanetNodePositions({ globe, camera, container }) {
  if (!planetStage) return;
  const stageRect = planetStage.getBoundingClientRect(), globeRect = container.getBoundingClientRect();
  planetNodes.forEach((node) => {
    const rotated = projectedNode.copy(nodeVectors.get(node)).applyQuaternion(globe.quaternion);
    const front = rotated.z > -.1;
    rotated.project(camera);
    node.style.left = `${(rotated.x * .5 + .5) * globeRect.width + globeRect.left - stageRect.left}px`;
    node.style.top = `${(-rotated.y * .5 + .5) * globeRect.height + globeRect.top - stageRect.top}px`;
    node.style.opacity = front ? '1' : '.38'; node.style.pointerEvents = 'auto'; node.style.transform = `translate(-50%, -50%) scale(${front ? 1 : .78})`;
  });
}
largeGlobe?.setFrameCallback(updatePlanetNodePositions);
function clearPlanetSelection() { commandMain?.classList.remove('has-planet-selection'); planetBrief?.setAttribute('aria-hidden', 'true'); planetBrief?.style.setProperty('--planet-entry-image', 'none'); planetNodes.forEach((node) => node.classList.remove('is-active')); if (planetKicker) planetKicker.textContent = ''; if (planetTitle) planetTitle.textContent = ''; if (planetText) planetText.textContent = ''; }
planetNodes.forEach((node) => node.addEventListener('click', () => {
  largeGlobe?.focusVector(nodeVectors.get(node));
  planetNodes.forEach((item) => item.classList.remove('is-active'));
  node.classList.add('is-active');
  commandMain?.classList.add('has-planet-selection');
  planetBrief?.setAttribute('aria-hidden', 'false');
  const image = node.dataset.nodeImage;
  planetBrief?.style.setProperty('--planet-entry-image', image ? `url("${new URL(image, document.baseURI).href}")` : 'none');
  planetBrief?.classList.add('is-switching');
  window.setTimeout(() => planetBrief?.classList.remove('is-switching'), 620);
  if (planetKicker) planetKicker.textContent = node.dataset.nodeKicker || 'Registro';
  if (planetTitle) planetTitle.textContent = node.dataset.nodeTitle || 'Zona desconocida';
  if (planetText) planetText.textContent = node.dataset.nodeText || 'Sin datos disponibles.';
}));
const themeToggle = document.getElementById('pemThemeToggle');
if (themeToggle) themeToggle.addEventListener('click', () => { const dark = document.body.classList.toggle('pem-dark-mode'); themeToggle.textContent = dark ? '☀' : '☾'; });