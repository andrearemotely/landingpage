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

const offerGrid = document.querySelector(".offer-grid");

if (offerGrid) {
  offerGrid.addEventListener(
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
