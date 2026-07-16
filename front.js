/* ---------------- SLIDER LOGIC ---------------- */
const slides = document.querySelectorAll(".slide");
const dotsWrap = document.getElementById("sliderDots");
let current = 0;
let autoSlide;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = index;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function nextSlide() {
  goToSlide((current + 1) % slides.length);
}

function prevSlide() {
  goToSlide((current - 1 + slides.length) % slides.length);
}

document.getElementById("nextBtn").addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});
document.getElementById("prevBtn").addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 4000);
}
resetAutoSlide();

/* ---------------- MOBILE MENU ---------------- */
document.getElementById("hamburgerBtn").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("show");
});

/* ---------------- FORM SUBMIT (demo only) ---------------- */
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const first = document.getElementById("firstName").value;
  alert("Welcome, " + first + "! (Demo only — connect a backend to save data.)");
  this.reset();
});