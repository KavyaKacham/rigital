/* ---------------- SLIDER LOGIC ---------------- */
const slides = document.querySelectorAll(".slide");
const dotsWrap = document.getElementById("sliderDots");
let current = 0;
let autoSlide;

if (slides.length && dotsWrap) {
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
}

/* ---------------- MOBILE MENU ---------------- */
const hamburgerBtn = document.getElementById("hamburgerBtn");
if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("show");
  });
}

/* ---------------- GET STARTED -> SCROLL TO REGISTRATION ---------------- */
// Works from any page: on index.html it scrolls down; on other pages
// (like login.html) the browser first navigates to index.html#registerSection.
function goToRegister(e) {
  const registerSection = document.getElementById("registerSection");
  if (registerSection) {
    e.preventDefault();
    registerSection.scrollIntoView({ behavior: "smooth" });
  }
  // if registerSection doesn't exist on this page, the href="index.html#registerSection"
  // fallback on the element itself will just navigate normally
}

const navGetStarted = document.getElementById("navGetStarted");
if (navGetStarted) navGetStarted.addEventListener("click", goToRegister);

const heroStartBtn = document.getElementById("heroStartBtn");
if (heroStartBtn) heroStartBtn.addEventListener("click", goToRegister);

/* ---------------- REGISTRATION FORM: sends a confirmation email ---------------- */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const first = document.getElementById("firstName").value;
    const last = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const submitBtn = this.querySelector(".submit-btn");

    submitBtn.disabled = true;
    submitBtn.textContent = "Creating account...";

    trySendConfirmationEmail(first, last, email, phone)
      .then(() => {
        alert("Welcome, " + first + "! A confirmation email is on its way to " + email + ".");
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        alert("Account created for " + first + ", but the confirmation email couldn't be sent yet. Finish the EmailJS setup in script.js to enable it.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Create Account";
        registerForm.reset();
      });
  });
}

/* ---------------- EMAILJS SETUP (isolated so it can never block other buttons) ---------------- */
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID below
// 3. Create an Email Template -> copy its Template ID below
// 4. Go to Account > General -> copy your Public Key below
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

function trySendConfirmationEmail(first, last, email, phone) {
  const notConfigured =
    EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
    EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
    EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID";

  if (notConfigured || typeof emailjs === "undefined") {
    return Promise.reject(new Error("EmailJS is not configured yet."));
  }

  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name: first + " " + last,
      to_email: email,
      phone: phone,
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

/* ---------------- LOGIN FORM (on login.html): demo only, no backend ---------------- */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    alert("Logged in as " + email + " (demo only, connect a real backend for actual authentication).");
    this.reset();
  });
}