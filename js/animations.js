/* SAURAM — GSAP animation layer (progressive enhancement).
   Loaded after js/main.js (+ js/pages.js on interior pages) and the vendored
   GSAP files in js/vendor/. Everything here is an *addition*: if GSAP is
   missing or the visitor prefers reduced motion, the page falls back to the
   existing CSS/IntersectionObserver behavior untouched. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !window.gsap) return;

  gsap.registerPlugin(ScrollTrigger, SplitText);

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Scroll progress hairline ---------- */
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  gsap.to(bar, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.4 }
  });

  /* ---------- Headline reveals (masked line rise) ----------
     Split after fonts load so line breaks are measured correctly. */
  function splitRise(el, opts) {
    var split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    gsap.from(split.lines, Object.assign({
      yPercent: 115, duration: 1.1, stagger: 0.12, ease: 'power4.out'
    }, opts || {}));
    return split;
  }

  document.fonts.ready.then(function () {
    /* Home hero: take ownership from the CSS `rise` keyframes */
    var heroTitle = $('.hero-title');
    if (heroTitle) {
      document.documentElement.classList.add('gsap-split');
      splitRise(heroTitle, { delay: 0.15 });
      gsap.from(['.hero-sub', '.hero-actions'], {
        y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.14, delay: 0.65, ease: 'power3.out'
      });
    }

    /* Interior page heroes */
    var pageTitle = $('.page-title');
    if (pageTitle) {
      splitRise(pageTitle, { delay: 0.1 });
      var lede = $('.page-lede');
      if (lede) gsap.from(lede, { y: 18, autoAlpha: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
    }
  });

  /* ---------- Interior hero sun: slow parallax drift ----------
     (#heroSun on the homepage is already driven by js/main.js — skip it.) */
  $$('.page-hero-sun').forEach(function (sun) {
    gsap.to(sun, {
      yPercent: 26, ease: 'none',
      scrollTrigger: { trigger: sun.closest('.page-hero'), start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  /* ---------- Why-choose photos: gentle parallax inside their frame ---------- */
  $$('.why-photo img').forEach(function (img) {
    gsap.fromTo(img,
      { yPercent: -7, scale: 1.14 },
      {
        yPercent: 7, scale: 1.14, ease: 'none',
        scrollTrigger: { trigger: img.closest('.why-photo'), start: 'top bottom', end: 'bottom top', scrub: true }
      });
  });

  /* ---------- Staggered card entrances ----------
     Only for grids that have no CSS .reveal of their own. Both the product
     listing and the gallery masonry get filtered/re-paged by js/pages.js
     (display:none toggles GSAP can't see), so on the first user interaction
     we hand control back: clear inline styles, kill the triggers. */
  function staggerGrid(items, interactionRoots) {
    if (!items.length) return;
    gsap.set(items, { y: 36, autoAlpha: 0 });
    var triggers = ScrollTrigger.batch(items, {
      once: true, start: 'top 88%',
      onEnter: function (batch) {
        gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09, ease: 'power3.out', overwrite: true });
      }
    });
    var released = false;
    function release() {
      if (released) return;
      released = true;
      triggers.forEach(function (t) { t.kill(); });
      gsap.set(items, { clearProps: 'opacity,visibility,transform' });
    }
    (interactionRoots || []).forEach(function (root) {
      if (!root) return;
      root.addEventListener('input', release, true);
      root.addEventListener('change', release, true);
      root.addEventListener('click', release, true);
    });
  }

  var productGrid = $('#productGrid');
  if (productGrid) {
    staggerGrid($$('.product-card:not(.hidden)', productGrid), [
      $('#filtersBox'), $('#catalogSearch'), $('#catalogSort'), $('#pagination'), $('#clearFilters')
    ]);
  }

  var galleryGrid = $('#galleryGrid');
  if (galleryGrid) {
    staggerGrid($$('.masonry-item:not(.hidden)', galleryGrid), [
      $('[data-gfilter]') && $('[data-gfilter]').parentElement, $('#loadMore')
    ]);
  }

  /* ---------- Magnetic buttons (fine pointers only) ---------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('.btn-gold, .btn-olive').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      });
      btn.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }
})();
