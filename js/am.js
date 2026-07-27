document.addEventListener("DOMContentLoaded", () => {
  const tools = document.querySelectorAll(".am-tool");
  const cards = document.querySelectorAll(".am-artefact-card, .am-dossier-card");

  tools.forEach((tool, index) => {
    tool.addEventListener("mouseenter", () => {
      tool.style.transform = `translateY(-14px) rotate(${index % 2 ? -10 : 10}deg) scale(1.08)`;
    });
    tool.addEventListener("mouseleave", () => {
      tool.style.transform = "";
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.18 });

  cards.forEach((card) => observer.observe(card));
});
