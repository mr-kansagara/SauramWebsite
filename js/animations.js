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
  if (window.Flip) gsap.registerPlugin(Flip);

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

  /* ---------- FLIP layout animation for filter / sort / paginate ----------
     js/pages.js updates the grids by toggling .hidden and re-appending nodes,
     which normally snaps. We snapshot the layout in the capture phase (before
     pages.js's own bubble-phase handlers mutate the DOM), then animate every
     card to its new position on the next frame. Items entering/leaving the
     result set scale-fade in and out. */
  function flipLayout(container, getItems, interactionRoots) {
    if (!window.Flip) return;
    var pending = false;
    function snapshot() {
      if (pending) return;
      pending = true;
      var state = Flip.getState(getItems());
      var prevHeight = container.offsetHeight;
      requestAnimationFrame(function () {
        pending = false;
        /* While Flip absolutizes the cards the container would collapse and
           the footer would ride up over the grid — so we pin its height and
           tween it to the new layout's height alongside the cards. */
        var newHeight = container.offsetHeight;
        /* clip while animating so cards can never paint past the container
           into the footer; position:relative makes the clip apply to the
           absolutized cards too */
        gsap.set(container, { position: 'relative', overflow: 'clip' });
        gsap.fromTo(container,
          { height: prevHeight },
          { height: newHeight, duration: 0.55, ease: 'power3.inOut', overwrite: 'auto' });
        Flip.from(state, {
          duration: 0.55, ease: 'power3.inOut', stagger: 0.015, absolute: true,
          onEnter: function (els) {
            return gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
          },
          onLeave: function (els) {
            return gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.3, ease: 'power2.in' });
          },
          /* release the pinned height only after every staggered card has
             landed and been restored to normal flow — clearing it any earlier
             lets the grid collapse for a frame and the footer jump up */
          onComplete: function () { gsap.set(container, { clearProps: 'height,position,overflow' }); }
        });
      });
    }
    interactionRoots.forEach(function (root) {
      if (!root) return;
      ['input', 'change', 'click'].forEach(function (ev) { root.addEventListener(ev, snapshot, true); });
    });
  }

  var productGrid = $('#productGrid');
  if (productGrid) {
    var productControls = [
      $('#filtersBox'), $('#catalogSearch'), $('#catalogSort'), $('#pagination'), $('#clearFilters')
    ];
    staggerGrid($$('.product-card:not(.hidden)', productGrid), productControls);
    flipLayout(productGrid, function () { return $$('.product-card', productGrid); }, productControls);
  }

  var galleryGrid = $('#galleryGrid');
  if (galleryGrid) {
    var galleryControls = [
      $('[data-gfilter]') && $('[data-gfilter]').parentElement, $('#loadMore')
    ];
    staggerGrid($$('.masonry-item:not(.hidden)', galleryGrid), galleryControls);
    flipLayout(galleryGrid, function () { return $$('.masonry-item', galleryGrid); }, galleryControls);
  }

  /* ---------- Product cards: cursor-tracked 3D tilt (fine pointers) ----------
     GSAP owns the card's transform on hover (lift + tilt); the CSS :hover
     shadow still applies underneath. */
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('.product-card').forEach(function (card) {
      var rxTo = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      var ryTo = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      card.addEventListener('mouseenter', function () {
        gsap.set(card, { transformPerspective: 900 });
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
      });
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        ryTo(((e.clientX - r.left) / r.width - 0.5) * 7);
        rxTo(-((e.clientY - r.top) / r.height - 0.5) * 5);
      });
      card.addEventListener('mouseleave', function () {
        rxTo(0); ryTo(0);
        gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
      });
    });
  }

  /* ---------- Gallery lightbox: crossfade between images ----------
     pages.js swaps lbImg.src instantly; our listeners are registered after
     its handlers (script order), so the pop plays right after each swap. */
  var lb = $('#lightbox'), lbImg = $('#lbImg');
  if (lb && lbImg) {
    function pop() {
      gsap.fromTo(lbImg, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }
    ['#lbPrev', '#lbNext'].forEach(function (s) { var b = $(s); if (b) b.addEventListener('click', pop); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') pop();
    });
    $$('#galleryGrid .masonry-item[data-full]').forEach(function (it) {
      it.addEventListener('click', pop);
      it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') pop(); });
    });
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
