(function () {
  if (location.hostname.endsWith("github.io")) {
    var bar = document.createElement("div");
    bar.className = "preview-bar";
    bar.textContent = "Design preview for Alta General Contracting Ltd.";
    document.body.insertBefore(bar, document.body.firstChild);
    var meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (figure) {
    figure.addEventListener("click", function () {
      var img = figure.querySelector("img");
      var box = document.querySelector(".lightbox");
      if (!img || !box) return;
      box.querySelector("img").src = img.src;
      box.querySelector("img").alt = img.alt;
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelectorAll("[data-compare]").forEach(function (figure) {
    var section = figure.closest(".hero, .banner");
    var before = figure.querySelector(".compare-before");
    var line = figure.querySelector(".compare-line");
    var labelBefore = figure.querySelector(".compare-label-before");
    var labelAfter = figure.querySelector(".compare-label-after");
    if (!section || !before || !line) return;

    var dragging = false;

    function place(clientX) {
      var rect = figure.getBoundingClientRect();
      var ratio = (clientX - rect.left) / rect.width;
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      var split = ratio * 100;
      before.style.clipPath = "inset(0 " + (100 - split) + "% 0 0)";
      line.style.left = split + "%";
      line.style.opacity = split < 1.2 || split > 98.8 ? "0" : "1";
      if (labelBefore) labelBefore.style.opacity = split < 6 ? "0" : "1";
      if (labelAfter) labelAfter.style.opacity = split > 94 ? "0" : "1";
    }

    function reset() {
      before.style.clipPath = "";
      line.style.left = "";
      line.style.opacity = "";
      if (labelBefore) labelBefore.style.opacity = "";
      if (labelAfter) labelAfter.style.opacity = "";
    }

    section.addEventListener("pointermove", function (event) {
      if (event.pointerType === "touch") return;
      place(event.clientX);
    });
    section.addEventListener("pointerleave", function (event) {
      if (event.pointerType === "touch") return;
      reset();
    });

    figure.addEventListener("touchstart", function (event) {
      if (!event.touches.length) return;
      dragging = true;
      event.preventDefault();
      place(event.touches[0].clientX);
    }, { passive: false });
    figure.addEventListener("touchmove", function (event) {
      if (!dragging || !event.touches.length) return;
      event.preventDefault();
      place(event.touches[0].clientX);
    }, { passive: false });
    figure.addEventListener("touchend", function () {
      dragging = false;
    });
    figure.addEventListener("touchcancel", function () {
      dragging = false;
    });
  });

  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    lightbox.addEventListener("click", function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        lightbox.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

})();
