/* ---------------- SLIDER LOGIC (only runs if a slider exists on this page) ---------------- */
const slides = document.querySelectorAll(".slide");
const dotsWrap = document.getElementById("sliderDots");

if (slides.length && dotsWrap) {
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

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoSlide(); });

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4000);
  }
  resetAutoSlide();
}

/* ---------------- MOBILE MENU (only runs if the hamburger exists) ---------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("show");
  });
}

/* ---------------- REGISTRATION FORM (only runs on index.html) ---------------- */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const first = document.getElementById("firstName").value.trim();
    // Send the name to success.html via the URL so it can show a personalized message.
    window.location.href = "success.html?name=" + encodeURIComponent(first);
  });
}

/* ---------------- LOGIN FORM (only runs on login.html) ---------------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Demo only: no real backend, so this just takes the user back to the homepage.
    window.location.href = "index.html";
  });
}

/* ---------------- SUCCESS PAGE PERSONALIZATION (only runs on success.html) ---------------- */
const successHeading = document.getElementById("successHeading");
if (successHeading) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (name) {
    successHeading.textContent = "Welcome, " + name + "!";
    document.getElementById("successMessage").textContent =
      "Your Rigitaldemo account has been created successfully.";
  }
}