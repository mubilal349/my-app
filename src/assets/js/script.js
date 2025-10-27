const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
//  slider
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let current = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

// Auto-slide
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 7000);

document.querySelectorAll(".comparison-container").forEach((container) => {
  const afterImage = container.querySelector(".comparison-after");
  const line = container.querySelector(".slider-line");
  const icon = container.querySelector(".slider-icon");

  let isDragging = false;

  const updatePosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = (offsetX / rect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    line.style.left = `${percent}%`;
    icon.style.left = `${percent}%`;
  };

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    updatePosition(e.clientX);
  });
  window.addEventListener("mouseup", () => (isDragging = false));
  window.addEventListener("mousemove", (e) => {
    if (isDragging) updatePosition(e.clientX);
  });

  // Touch Support
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    updatePosition(e.touches[0].clientX);
  });
  window.addEventListener("touchend", () => (isDragging = false));
  window.addEventListener("touchmove", (e) => {
    if (isDragging) updatePosition(e.touches[0].clientX);
  });
});
