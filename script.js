// Nav: add background after scrolling
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = document.getElementById("burger");
const links = document.getElementById("links");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    burger.classList.remove("open");
    links.classList.remove("open");
  })
);

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
reveals.forEach((el) => io.observe(el));

// Count-up numbers
const counters = document.querySelectorAll("[data-count]");
const countIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => countIO.observe(c));

// Cursor glow (desktop only)
const glow = document.getElementById("glow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// Contact form -> opens WhatsApp with the message filled in
// CHANGE THIS to your number: country code + number, no + or spaces (India example: 919876543210)
const WHATSAPP_NUMBER = "919999999999";
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const biz = document.getElementById("biz").value.trim();
  const msg = document.getElementById("msg").value.trim();
  const text = `Hi, I'm ${name} from ${biz}.\n\n${msg}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  document.getElementById("note").textContent = "Opening WhatsApp...";
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
