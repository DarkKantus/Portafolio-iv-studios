document.addEventListener("DOMContentLoaded", () => {
    
    // ===============================================
    // 1. LÓGICA DE LA BARRA DE NAVEGACIÓN (Botón HERO)
    // ===============================================
    const heroBtn = document.querySelector(".btn-entrar");
    if (heroBtn) {
        heroBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Detiene el salto instantáneo
            const targetId = heroBtn.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Hace scroll suave a la sección
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===============================================
    // 2. LÓGICA DEL MODAL DE IMAGEN (SECCIÓN REVIEW)
    // ===============================================
    const imgModal = document.getElementById("img-modal");
    const imgModalTarget = document.getElementById("img-modal-target");
    const closeImgBtn = document.querySelector(".close-img-modal");
    
    // Seleccionamos todas las tarjetas de review
    document.querySelectorAll(".review-card").forEach(card => {
        card.addEventListener("click", () => {
            // Usa el atributo data-full-img (si lo tienes), si no usa la imagen interna
            const imgSrc = card.dataset.fullImg || card.querySelector("img").src;
            
            if (imgSrc) {
                imgModalTarget.src = imgSrc;
                imgModal.classList.add("active");
            }
        });
    });

    // Cerrar modal de imagen
    closeImgBtn.addEventListener("click", () => imgModal.classList.remove("active"));
    imgModal.addEventListener("click", (e) => {
        if(e.target === imgModal) imgModal.classList.remove("active");
    });


    // ===============================================
    // 3. LÓGICA DE CAMPEONES (SECCIÓN HEX)
    // ===============================================
    const champModal = document.getElementById("champion-modal");
    const closeChampBtn = champModal.querySelector(".close-modal");

    // Seleccionamos todos los hexágonos
    document.querySelectorAll(".hex-item").forEach(hex => {
        hex.addEventListener("click", () => {
            
            // 1. Obtener datos del HTML (dataset)
            const d = hex.dataset;
            // Emblemas de clase (las dos banderas del modal)
const emblemSrc = d.emblem || "assets/img/sello guerrero.png";
champModal.querySelectorAll(".flag-emblem img").forEach(img => {
    img.src = emblemSrc;
});


            // 2. Inyectar datos en la tarjeta
            document.getElementById("card-name").textContent = d.name || "Campeón";
            document.getElementById("card-rol").textContent = d.rol || "Clase desconocida";
            document.getElementById("card-lore").textContent = d.lore || "Historia no disponible.";
            document.getElementById("card-armor-text").textContent = d.armorText || "";
            
            // Imagen central
            const smallImg = hex.querySelector(".champ-icon").src;
            document.getElementById("card-hero-img").src = d.imgFull || smallImg;

            // Iconos (Armadura y armas)
            document.getElementById("card-armor-icon").src = d.armorIcon || "assets/img/icon-default-armor.png";
            document.getElementById("card-w-common").src = d.wCommon || "";
            document.getElementById("card-w-common-name").textContent = d.wCommonName || "";
            document.getElementById("card-w-special").src = d.wSpecial || "";
            document.getElementById("card-w-special-name").textContent = d.wSpecialName || "";

            // Habilidades
            document.getElementById("card-skill1").textContent = d.skill1 || "---";
            document.getElementById("card-skill2").textContent = d.skill2 || "---";

            // 3. Mostrar el modal
            champModal.classList.add("active");
        });
    });

    // Cerrar modal de campeón
    closeChampBtn.addEventListener("click", () => champModal.classList.remove("active"));
    champModal.addEventListener("click", (e) => {
        if(e.target === champModal) champModal.classList.remove("active");
    });
    
    // Scroll Reveal (Animaciones al bajar)
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hex-item', { interval: 100, distance: '20px', origin: 'bottom' });
        ScrollReveal().reveal('.review-card', { interval: 150, distance: '20px', origin: 'left' });
    }
});