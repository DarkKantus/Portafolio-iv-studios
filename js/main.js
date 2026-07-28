// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Año dinámico en el footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const radialMenu = document.querySelector('.radial-menu');
  if (!radialMenu) return;

  const items = radialMenu.querySelectorAll('.radial-item');
  const orbitSvg = radialMenu.querySelector('.radial-orbit');
  const core = radialMenu.querySelector('.radial-core');
  const coreTitle = core?.querySelector('.core-title');
  const coreSubtitle = core?.querySelector('.core-subtitle');
  const coreLogo = core?.querySelector('.core-logo');
  const coreDefault = core?.querySelector('.core-default');
  const portalBg = document.querySelector('.portal-bg');

  // Título superior (header)
  const headerTitleEl = document.querySelector('.site-header h1');
  const headerSubtitleEl = document.querySelector('.site-subtitle');
  const defaultHeaderTitle = headerTitleEl?.textContent ?? '';
  const defaultHeaderSubtitle = headerSubtitleEl?.textContent ?? '';

  if (!items.length || !orbitSvg) return;

  // Un solo estado compartido: evita apagar el Core al pasar de un nodo a otro.
  let activeHoverCount = 0;
  let isCoreHovered = false;
  let coreChargeTimer = null;
  const shouldKeepCoreCharged = () => activeHoverCount > 0 || isCoreHovered;

  const beginCoreCharge = () => {
    if (!core) return;
    window.clearTimeout(coreChargeTimer);
    core.classList.remove('core-fully-charged');
    radialMenu.classList.remove('core-fully-charged');
    core.classList.add('core-active');
    radialMenu.classList.add('core-charging');
    // La transición CSS alcanza el máximo a los 3 s; recién entonces empieza el pulso exterior pleno.
    coreChargeTimer = window.setTimeout(() => {
      if (shouldKeepCoreCharged()) {
        core.classList.add('core-fully-charged');
        radialMenu.classList.add('core-fully-charged');
      }
    }, 3000);
  };

  const endCoreCharge = () => {
    if (!core) return;
    window.clearTimeout(coreChargeTimer);
    // Separar la salida del pulso pleno y el enfriamiento: así box-shadow sí interpola 3 s.
    core.classList.remove('core-fully-charged');
    radialMenu.classList.remove('core-fully-charged');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!shouldKeepCoreCharged()) {
          core.classList.remove('core-active');
          radialMenu.classList.remove('core-charging');
        }
      });
    });
  };

  // Configuración de la órbita
  const ns = 'http://www.w3.org/2000/svg';
  const center = 50;
  const orbitRadius = 44;
  const total = items.length;
  const step = (Math.PI * 2) / total;
  const startAngle = -Math.PI / 2;

  // Limpiar SVG
  orbitSvg.innerHTML = '';

  // Círculo principal
  const circle = document.createElementNS(ns, 'circle');
  circle.setAttribute('cx', center);
  circle.setAttribute('cy', center);
  circle.setAttribute('r', orbitRadius);
  circle.classList.add('orbit-circle');
  orbitSvg.appendChild(circle);

  // Gradientes SVG reutilizables para que el pulso de energía se desvanezca en los bordes.
  const orbitDefs = document.createElementNS(ns, 'defs');
  orbitSvg.appendChild(orbitDefs);

  // Crear líneas, nodos y posicionar cada hex
  items.forEach((item, index) => {
    const angle = startAngle + index * step;
    const x = center + orbitRadius * Math.cos(angle);
    const y = center + orbitRadius * Math.sin(angle);

    // Posición del hex
    item.style.left = `${x}%`;
    item.style.top = `${y}%`;
    item.style.transform = 'translate(-50%, -50%)';

    // Línea base gris
    const baseRay = document.createElementNS(ns, 'line');
    baseRay.setAttribute('x1', center);
    baseRay.setAttribute('y1', center);
    baseRay.setAttribute('x2', x);
    baseRay.setAttribute('y2', y);
    baseRay.classList.add('orbit-ray');
    orbitSvg.appendChild(baseRay);

    // Línea de pulso (del hex al centro)
    const pulseRay = document.createElementNS(ns, 'line');
    pulseRay.setAttribute('x1', x);
    pulseRay.setAttribute('y1', y);
    pulseRay.setAttribute('x2', center);
    pulseRay.setAttribute('y2', center);
    pulseRay.classList.add('orbit-ray-pulse');
    orbitSvg.appendChild(pulseRay);

    // Nodo de energía: el gradiente evita el disco amarillo plano al pulsar.
    const energyGradientId = `orbit-energy-${index}`;
    const energyGradient = document.createElementNS(ns, 'radialGradient');
    energyGradient.setAttribute('id', energyGradientId);
    [
      ['0%', '0.52'],
      ['42%', '0.24'],
      ['100%', '0']
    ].forEach(([offset, opacity]) => {
      const stop = document.createElementNS(ns, 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', '#f2c14f');
      stop.setAttribute('stop-opacity', opacity);
      energyGradient.appendChild(stop);
    });
    orbitDefs.appendChild(energyGradient);

    const node = document.createElementNS(ns, 'circle');
    node.setAttribute('cx', x);
    node.setAttribute('cy', y);
    node.setAttribute('r', 1.4);
    node.style.fill = `url(#${energyGradientId})`;
    node.classList.add('orbit-node');
    orbitSvg.appendChild(node);

    // -------- HOVER --------
    item.addEventListener('mouseenter', () => {
      // pulso en la línea + nodo
      pulseRay.classList.add('is-active');
      node.classList.add('is-active');

      // núcleo se "carga" mientras haya hovers
      activeHoverCount += 1;
      if (core && activeHoverCount === 1) {
        beginCoreCharge();
      }

      // fondo por sección
      if (portalBg) {
        const bgUrl = item.dataset.bg;
        if (bgUrl) {
          portalBg.style.backgroundImage = `url('${bgUrl}')`;
          portalBg.classList.add('is-visible');
        }
      }

      // logo en el centro (si tiene data-core-logo)
      const coreLogoUrl = item.dataset.coreLogo;
      if (coreLogo && coreLogoUrl) {
        coreLogo.src = coreLogoUrl;
        core.style.setProperty('--core-image', `url("../${coreLogoUrl}")`);
        const label = item.querySelector('.radial-label');
        coreLogo.alt = label ? label.textContent : '';
        coreLogo.classList.add('is-visible');
        coreDefault?.classList.add('is-hidden');
        coreTitle?.classList.add('is-dimmed');
        coreSubtitle?.classList.add('is-dimmed');
      }

      // TÍTULO SUPERIOR dinámico
      if (headerTitleEl && headerSubtitleEl) {
        const label = item.querySelector('.radial-label');
        const itemTitle =
          item.dataset.title ||
          (label ? label.textContent.trim() : defaultHeaderTitle);
        const itemSubtitle =
          item.dataset.subtitle || defaultHeaderSubtitle;

        headerTitleEl.textContent = itemTitle;
        headerSubtitleEl.textContent = itemSubtitle;
      }
    });

    item.addEventListener('mouseleave', () => {
      // parar pulso
      pulseRay.classList.remove('is-active');
      node.classList.remove('is-active');

      // núcleo se enfría cuando ya no queda ningún hover
      activeHoverCount = Math.max(0, activeHoverCount - 1);
      if (core && activeHoverCount === 0) {
        endCoreCharge();
      }

      // ocultar fondo
      if (portalBg) {
        portalBg.classList.remove('is-visible');
      }

      // ocultar logo y devolver texto al núcleo
      if (coreLogo) {
        coreLogo.classList.remove('is-visible');
        coreDefault?.classList.remove('is-hidden');
        coreTitle?.classList.remove('is-dimmed');
        coreSubtitle?.classList.remove('is-dimmed');
      }

      // restaurar título superior SOLO si ya no hay ningún hover
      if (headerTitleEl && headerSubtitleEl && activeHoverCount === 0) {
        headerTitleEl.textContent = defaultHeaderTitle;
        headerSubtitleEl.textContent = defaultHeaderSubtitle;
      }
    });

    // Paneo suave del fondo según movimiento dentro del hex
    item.addEventListener('mousemove', (ev) => {
      if (!portalBg || !portalBg.classList.contains('is-visible')) return;
      const rect = item.getBoundingClientRect();
      const relX = (ev.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
      const relY = (ev.clientY - rect.top) / rect.height - 0.5;
      const xPercent = 50 + relX * 6;
      const yPercent = 50 + relY * 6;
      portalBg.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });

    // (Opcional) manejar click para debug
    item.addEventListener('click', () => {
      const section = item.dataset.section;
      console.log('Click en sección:', section);
    });
  });

  // El Core nativo también activa exactamente la misma carga; sólo cambia el encabezado.
  core?.addEventListener('mouseenter', () => {
    isCoreHovered = true;
    beginCoreCharge();
    if (headerTitleEl && headerSubtitleEl) {
      headerTitleEl.textContent = 'Sobre mí';
      headerSubtitleEl.textContent = 'Contacto, biografía y redes';
    }
  });
  core?.addEventListener('mouseleave', () => {
    isCoreHovered = false;
    if (!shouldKeepCoreCharged()) endCoreCharge();
    if (headerTitleEl && headerSubtitleEl && activeHoverCount === 0) {
      headerTitleEl.textContent = defaultHeaderTitle;
      headerSubtitleEl.textContent = defaultHeaderSubtitle;
    }
  });
});
