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

/* ---------------- EMAILJS SETUP ---------------- */
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID below
// 3. Create an Email Template -> copy its Template ID below
// 4. Go to Account > General -> copy your Public Key below
// Until these three values are filled in, sending will fail with an auth error.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

/* ---------------- FORM SUBMIT: sends a confirmation email ---------------- */
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const first = document.getElementById("firstName").value;
  const last = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const submitBtn = this.querySelector(".submit-btn");

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating account...";

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name: first + " " + last,
      to_email: email,
      phone: phone,
    })
    .then(() => {
      alert("Welcome, " + first + "! A confirmation email is on its way to " + email + ".");
      document.getElementById("registerForm").reset();
    })
    .catch((error) => {
      console.error("Email send failed:", error);
      alert("Account created, but the confirmation email couldn't be sent. Check the EmailJS setup in script.js.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Create Account";
    });
});

/* ---------------- LOGIN MODAL ---------------- */
const loginModal = document.getElementById("loginModal");
const registerSection = document.getElementById("registerSection");

function openLoginModal() {
  loginModal.classList.add("open");
}
function closeLoginModal() {
  loginModal.classList.remove("open");
}
function scrollToRegister() {
  registerSection.scrollIntoView({ behavior: "smooth" });
}

// Sign In buttons (top nav + hero) open the login modal
document.getElementById("navSignIn").addEventListener("click", openLoginModal);
document.getElementById("heroLoginBtn").addEventListener("click", openLoginModal);

// Get Started / Start for free buttons scroll down to the registration form
document.getElementById("navGetStarted").addEventListener("click", scrollToRegister);
document.getElementById("heroStartBtn").addEventListener("click", scrollToRegister);

// Close modal via the X button, clicking the overlay background, or Escape key
document.getElementById("closeModal").addEventListener("click", closeLoginModal);
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) closeLoginModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLoginModal();
});

// "Create an account" link inside the modal closes it and scrolls to sign-up
document.getElementById("switchToSignup").addEventListener("click", (e) => {
  e.preventDefault();
  closeLoginModal();
  scrollToRegister();
});

/* ---------------- LOGIN FORM SUBMIT (demo only, no backend) ---------------- */
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  alert("Logged in as " + email + " (demo only, connect a real backend for actual authentication).");
  this.reset();
  closeLoginModal();
});