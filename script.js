// ✅ script.js
ScrollReveal().reveal('.section h2, .skill, .project-card, form', {
  duration: 800,
  distance: '40px',
  origin: 'bottom',
  interval: 100
});

// TypeIt animations
new TypeIt("#typed-text", {
  speed: 50,
  loop: false,
  waitUntilVisible: true,
})
.type("Hey there! I'm <strong>Shashank B S</strong> — a passionate full-stack developer and computer science engineer...")
.go();

new TypeIt(".typing-text", {
  strings: ["Full Stack Developer"," & ", "Problem Solver"],
  speed: 100,
  breakLines: false,
  loop: true
}).go();

ScrollReveal().reveal('.fade-up', {
  duration: 800,
  distance: '40px',
  origin: 'bottom',
  interval: 150
});

// ✅ Contact form submission

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
  const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
  const message = this.querySelector('textarea').value.trim();

  fetch("https://portfolio-backend-fv5k.onrender.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message); // ✅ Shows: Data saved to Excel!
      this.reset();
    })
    .catch((err) => {
      console.error("Submission failed:", err);
      alert("❌ Something went wrong.");
    });
});
