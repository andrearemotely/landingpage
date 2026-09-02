document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const hero = document.getElementById("hero");
const blobWrap = document.getElementById("blobWrap");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && blobWrap && canHover && !prefersReducedMotion) {
  const maxOffset = 34;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    const tx = (relX * 2 * maxOffset).toFixed(1);
    const ty = (relY * 2 * maxOffset).toFixed(1);
    blobWrap.style.transform = `translate(${tx}px, ${ty}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    blobWrap.style.transform = "translate(0px, 0px)";
  });
}

const offerCarousel = document.getElementById("offerCarousel");
const offerGrid = document.getElementById("offerGrid");
const offerDots = document.querySelectorAll(".offer-dot");

if (offerCarousel && offerGrid) {
  // Listen on the full-width wrapper, not just the narrow centered card,
  // so a scroll anywhere near the carousel (not only precisely over it)
  // advances the cards.
  offerCarousel.addEventListener(
    "wheel",
    (event) => {
      const atStart = offerGrid.scrollLeft <= 0;
      const atEnd = offerGrid.scrollLeft + offerGrid.clientWidth >= offerGrid.scrollWidth - 1;
      const scrollingForward = event.deltaY > 0;

      if ((scrollingForward && !atEnd) || (!scrollingForward && !atStart)) {
        event.preventDefault();
        offerGrid.scrollLeft += event.deltaY;
      }
    },
    { passive: false }
  );
}

if (offerGrid && offerDots.length) {
  const cardWidth = () => offerGrid.firstElementChild.getBoundingClientRect().width + 24;

  offerDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      offerGrid.scrollTo({ left: index * cardWidth(), behavior: "smooth" });
    });
  });

  let scrollTimeout;
  offerGrid.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const index = Math.round(offerGrid.scrollLeft / cardWidth());
      offerDots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    }, 80);
  });
}
