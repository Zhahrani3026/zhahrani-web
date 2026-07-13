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

  /* Animate skill bars into view */
  var skillBars = document.querySelectorAll(".skill-bar-fill");
  if (skillBars.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            el.style.width = el.getAttribute("data-level") + "%";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillBars.forEach(function (bar) {
      observer.observe(bar);
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
