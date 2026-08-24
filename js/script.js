document.addEventListener("DOMContentLoaded", function () {
  /* Mobile navigation toggle */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* Certificate lightbox */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll("[data-lightbox-trigger]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var src = trigger.getAttribute("data-image");
        var caption = trigger.getAttribute("data-caption") || "";
        lightboxImg.setAttribute("src", src);
        lightboxImg.setAttribute("alt", caption);
        lightboxCaption.textContent = caption;
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* Scroll-reveal effect for cards & sections (nice on mobile/tablet scroll) */
  var revealSelectors = [
    ".folder-card", ".stamp-card", ".polaroid", ".exp-item", ".highlight-card",
    ".goal-box", ".mini-timeline li", ".contact-info-card",
    ".note-grid .sticky-note", ".tool-chip-row .tool-chip", ".cta-band",
    ".section-head", ".contact-form"
  ];
  var revealEls = document.querySelectorAll(revealSelectors.join(","));
  if (revealEls.length && "IntersectionObserver" in window) {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* Scroll-to-top button */
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      function () {
        scrollTopBtn.classList.toggle("is-visible", window.scrollY > 420);
      },
      { passive: true }
    );
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Dummy contact form submit */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var successMsg = document.getElementById("formSuccess");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (successMsg) {
        successMsg.classList.add("is-visible");
        successMsg.setAttribute("role", "status");
      }
      contactForm.reset();
    });
  }
});
