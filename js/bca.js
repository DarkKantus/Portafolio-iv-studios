/* BCA v2.0 — one interaction owner for hero, roster and both modals. */
const BCA_V2_ASSETS = {
  "g-m.png": { hero: "assets/web/img/BCA/g-m.webp", hex: "assets/web/img/BCA/g4.webp", crest: "assets/web/img/BCA/s-guerrero.webp", color: "#d77b2a", glow: "rgba(215,123,42,.64)", arena: "assets/web/img/BCA/campaña/fondos/Posada.webp" },
  "g-f.png": { hero: "assets/web/img/BCA/g-f.webp", hex: "assets/web/img/BCA/gf.webp", crest: "assets/web/img/BCA/s-guerrero.webp", color: "#d77b2a", glow: "rgba(215,123,42,.64)", arena: "assets/web/img/BCA/campaña/fondos/Posada.webp" },
  "d-m.png": { hero: "assets/web/img/BCA/d-m.webp", hex: "assets/web/img/BCA/dm.webp", crest: "assets/web/img/BCA/s-druida.webp", color: "#87914c", glow: "rgba(135,145,76,.62)", arena: "assets/web/img/BCA/campaña/fondos/Torre del alquimista.webp" },
  "d-f.png": { hero: "assets/web/img/BCA/d-f.webp", hex: "assets/web/img/BCA/df.webp", crest: "assets/web/img/BCA/s-druida.webp", color: "#87914c", glow: "rgba(135,145,76,.62)", arena: "assets/web/img/BCA/campaña/fondos/Torre del alquimista.webp" },
  "p-m.png": { hero: "assets/web/img/BCA/p-m.webp", hex: "assets/web/img/BCA/pm.webp", crest: "assets/web/img/BCA/s-paladin.webp", color: "#c5a25e", glow: "rgba(197,162,94,.66)", arena: "assets/web/img/BCA/campaña/fondos/Finca Extraña.webp" },
  "p-f.png": { hero: "assets/web/img/BCA/p-f.webp", hex: "assets/web/img/BCA/pf.webp", crest: "assets/web/img/BCA/s-paladin.webp", color: "#c5a25e", glow: "rgba(197,162,94,.66)", arena: "assets/web/img/BCA/campaña/fondos/Finca Extraña.webp" },
  "as-m.png": { hero: "assets/web/img/BCA/as-m.webp", hex: "assets/web/img/BCA/asm.webp", crest: "assets/web/img/BCA/s-asesino.webp", color: "#c9363f", glow: "rgba(201,54,63,.68)", arena: "assets/web/img/BCA/campaña/fondos/Cripta Peculiar.webp" },
  "as-f.png": { hero: "assets/web/img/BCA/as-f.webp", hex: "assets/web/img/BCA/asf.webp", crest: "assets/web/img/BCA/s-asesino.webp", color: "#c9363f", glow: "rgba(201,54,63,.68)", arena: "assets/web/img/BCA/campaña/fondos/Cripta Peculiar.webp" },
  "ba-m.png": { hero: "assets/web/img/BCA/ba-m.webp", hex: "assets/web/img/BCA/bam.webp", crest: "assets/web/img/BCA/s-ballestero.webp", color: "#19b9c7", glow: "rgba(25,185,199,.68)", arena: "assets/web/img/BCA/campaña/fondos/Posada.webp" },
  "ba-f.png": { hero: "assets/web/img/BCA/ba-f.webp", hex: "assets/web/img/BCA/baf.webp", crest: "assets/web/img/BCA/s-ballestero.webp", color: "#19b9c7", glow: "rgba(25,185,199,.68)", arena: "assets/web/img/BCA/campaña/fondos/Posada.webp" },
  "bl-m.png": { hero: "assets/web/img/BCA/bl-m.webp", hex: "assets/web/img/BCA/bm.webp", crest: "assets/web/img/BCA/s-blindado.webp", color: "#243f9f", glow: "rgba(36,63,159,.68)", arena: "assets/web/img/BCA/campaña/fondos/Cripta Peculiar.webp" },
  "bl-f.png": { hero: "assets/web/img/BCA/bl-f.webp", hex: "assets/web/img/BCA/bf.webp", crest: "assets/web/img/BCA/s-blindado.webp", color: "#243f9f", glow: "rgba(36,63,159,.68)", arena: "assets/web/img/BCA/campaña/fondos/Cripta Peculiar.webp" }
};

const initializeBca = () => {
  const $ = (selector) => document.querySelector(selector);
  const heroBtn = $(".btn-entrar");
  const selectStage = $(".bca-select");
  const championModal = $("#champion-modal");
  const imageModal = $("#img-modal");
  const hexItems = [...document.querySelectorAll(".hex-item")];
  const reviewCards = [...document.querySelectorAll(".review-card")];
  const closeChampion = $(".close-modal");
  const closeImage = $(".close-img-modal");
  const imageTarget = $("#img-modal-target");
  let activeIndex = -1;
  let backdropCurrent = null;
  let backdropRemovalTimer = null;

  const sourceKey = (item) => (item.dataset.imgFull || "").split("/").pop().replace(/\.webp$/, ".png");
  const configFor = (item) => BCA_V2_ASSETS[sourceKey(item)] || null;
  const setStage = (config) => {
    if (!config || !selectStage) return;
    const imageUrl = new URL(config.arena, document.baseURI).href;
    selectStage.style.setProperty("--arena-glow", config.glow);
    if (backdropCurrent?.dataset.src === imageUrl) return;

    let backdrop = selectStage.querySelector(".bca-stage-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "bca-stage-backdrop";
      backdrop.setAttribute("aria-hidden", "true");
      selectStage.prepend(backdrop);
    }

    const next = document.createElement("span");
    next.className = "bca-stage-backdrop__image";
    next.dataset.src = imageUrl;
    next.style.backgroundImage = `url("${imageUrl}")`;
    backdrop.append(next);
    requestAnimationFrame(() => next.classList.add("is-visible"));

    if (backdropCurrent) {
      backdropCurrent.classList.remove("is-visible");
      clearTimeout(backdropRemovalTimer);
      const previous = backdropCurrent;
      backdropRemovalTimer = window.setTimeout(() => previous.remove(), 950);
    }
    backdropCurrent = next;
  };

  hexItems.forEach((item, index) => {
    const config = configFor(item);
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-selected", "false");
    if (config) {
      item.style.setProperty("--class-color", config.color);
      item.style.setProperty("--class-glow", config.glow);
      item.style.setProperty("--champion-art", `url("${new URL(config.hex, document.baseURI).href}")`);
      item.dataset.v2Hero = config.hero;
      item.dataset.v2Crest = config.crest;
    }
    const open = () => openChampion(index);
    item.addEventListener("click", open);
    item.addEventListener("mouseenter", () => setStage(config));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
    });
  });

  setStage(configFor(hexItems[0]));

  function fillChampion(item) {
    const data = item.dataset;
    const config = configFor(item);
    $("#card-name").textContent = data.name || "Campeón";
    $("#card-rol").textContent = data.rol || "Clase desconocida";
    $("#card-lore").textContent = data.lore || "Historia no disponible.";
    $("#card-armor-text").textContent = data.armorText || "";
    $("#card-hero-img").src = data.v2Hero || data.imgFull || "";
    $("#card-hero-img").alt = data.name || "Campeón";
    $("#card-w-common").src = data.wCommon || "";
    $("#card-w-common-name").textContent = data.wCommonName || "";
    $("#card-w-special").src = data.wSpecial || "";
    $("#card-w-special-name").textContent = data.wSpecialName || "";
    $("#card-armor-icon").src = data.armorIcon || "";
    $("#card-skill1").textContent = data.skill1 || "—";
    $("#card-skill2").textContent = data.skill2 || "—";
    championModal.querySelectorAll(".flag-emblem img").forEach((image) => {
      image.src = data.v2Crest || data.emblem || "";
      image.alt = `Emblema de ${data.name || "campeón"}`;
    });
    championModal.style.setProperty("--champion-color", config?.color || "#d6b56d");
    championModal.style.setProperty("--champion-glow", config?.glow || "rgba(214,181,109,.6)");
  }

  function openChampion(index) {
    if (!hexItems.length) return;
    activeIndex = (index + hexItems.length) % hexItems.length;
    const item = hexItems[activeIndex];
    fillChampion(item);
    setStage(configFor(item));
    hexItems.forEach((hex, hexIndex) => {
      const selected = hexIndex === activeIndex;
      hex.classList.toggle("active", selected);
      hex.setAttribute("aria-selected", String(selected));
    });
    championModal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeChampionModal() {
    championModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    hexItems.forEach((item) => { item.classList.remove("active"); item.setAttribute("aria-selected", "false"); });
  }

  function openImageModal(card) {
    imageTarget.src = card.dataset.fullImg || card.querySelector("img")?.src || "";
    imageModal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeImageModal() {
    imageModal.classList.remove("active");
    imageTarget.src = "";
    document.body.classList.remove("modal-open");
  }

  heroBtn?.addEventListener("click", (event) => { event.preventDefault(); $("#review")?.scrollIntoView({ behavior: "smooth" }); });
  closeChampion?.addEventListener("click", closeChampionModal);
  closeImage?.addEventListener("click", closeImageModal);
  championModal?.addEventListener("click", (event) => { if (event.target === championModal) closeChampionModal(); });
  imageModal?.addEventListener("click", (event) => { if (event.target === imageModal) closeImageModal(); });
  reviewCards.forEach((card) => card.addEventListener("click", () => openImageModal(card)));
  document.addEventListener("keydown", (event) => {
    if (imageModal?.classList.contains("active")) { if (event.key === "Escape") closeImageModal(); return; }
    if (!championModal?.classList.contains("active")) return;
    if (event.key === "Escape") closeChampionModal();
    if (event.key === "ArrowRight" || event.key === "ArrowDown") openChampion(activeIndex + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") openChampion(activeIndex - 1);
  });
};

initializeBca();
