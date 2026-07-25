/* ==========================================================================
   script.js — IMAAIFE PORTFOLIO INTERACTIVITY & MOTION
   Powered by GSAP (GreenSock Animation Platform)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP Timeline with custom easing for a luxury feel
  const heroTL = gsap.timeline({
    defaults: {
      ease: "power4.out",
      duration: 1.2
    }
  });

  // Staggered sequence reveal for hero elements
  heroTL
    .to("#hero-tag", {
      opacity: 1,
      y: 0,
      delay: 0.2
    })
    .to("#hero-title", {
      opacity: 1,
      y: 0
    }, "-=0.9")
    .to("#hero-desc", {
      opacity: 1,
      y: 0
    }, "-=0.9")
    .to("#hero-cta", {
      opacity: 1,
      y: 0
    }, "-=0.9");

  // Optional: Subtle parallax tilt effect on CTA move for creative flare
  const heroSection = document.querySelector(".hero");
  const heroTitle = document.querySelector("#hero-title");

  if (window.innerWidth > 768) {
    heroSection.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse displacement normalized (-1 to 1)
      const xPos = (clientX / innerWidth - 0.5) * 15;
      const yPos = (clientY / innerHeight - 0.5) * 15;

      gsap.to(heroTitle, {
        rotationY: xPos,
        rotationX: -yPos,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      gsap.to(heroTitle, {
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power2.out"
      });
    });
  }
});

// Animate Section 2 About Me images on scroll
const aboutImages = document.querySelectorAll(".about__img-wrapper, .about__content");

const aboutObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.fromTo(
        entry.target,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

aboutImages.forEach((el) => {
  el.style.opacity = "0";
  aboutObserver.observe(el);
});