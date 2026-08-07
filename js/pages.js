/* SAURAM interior pages — shared behaviors (vanilla JS, no dependencies).
   Loaded after js/main.js on every non-home page. */
(function () {
  'use strict';

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ================= Toast ================= */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ================= Product data =================
     MRPs are PLACEHOLDERS — confirm real pricing before launch.
     Nutrition values are taken from the current pack labels. */
  var PRODUCTS = {
    'toor-dal': {
      name: 'Toor Dal', note: '(Arhar Dal)', kind: 'Pulses', cat: 'pulses',
      img: 'Assets/pack-toor-dal.jpg',
      tagline: 'Sun-ripened arhar from Saurashtra farms — unpolished, protein-rich, cooks even and soft.',
      badges: ['100% Natural', 'Unpolished', 'No Preservatives'],
      sizes: [{ label: '250 g', mrp: 55 }, { label: '500 g', mrp: 95 }, { label: '1 kg', mrp: 180 }],
      def: 1,
      benefits: ['A wholesome source of plant protein and dietary fibre for everyday meals.', 'Cleaned and graded at source — even grain size means even cooking.', 'Naturally gluten free, with no artificial colours or polish.'],
      nutrition: [['Energy', '343 kcal'], ['Protein', '22.3 g'], ['Carbohydrate', '60.1 g'], ['Total sugars', '3.3 g'], ['Dietary fibre', '15.5 g'], ['Total fat', '1.6 g'], ['Sodium', '12 mg']],
      ingredients: 'Toor dal (arhar dal). Nothing else.',
      shelf: '9 months from packing',
      storage: 'Store in a cool, dry, hygienic place away from direct sunlight. Transfer to an airtight container after opening.',
      usage: 'Rinse thoroughly, soak 30 minutes, cook 1 part dal to 3 parts water until soft. Perfect for dal, sambar and khichdi.'
    },
    'mung-dal': {
      name: 'Mung Dal', note: '(Green Moong)', kind: 'Pulses', cat: 'pulses',
      img: 'Assets/pack-mung-dal.jpg',
      tagline: 'Light on the stomach, heavy on nutrition — the everyday dal for every age.',
      badges: ['100% Natural', 'High Protein', 'No Preservatives'],
      sizes: [{ label: '250 g', mrp: 60 }, { label: '500 g', mrp: 105 }, { label: '1 kg', mrp: 200 }],
      def: 1,
      benefits: ['Easy to digest — a first choice for children and elders alike.', 'High in protein and fibre; naturally low in fat.', 'Whole green moong with skin intact for full nutrition.'],
      nutrition: [['Energy', '347 kcal'], ['Protein', '24.0 g'], ['Carbohydrate', '62.6 g'], ['Total sugars', '3.0 g'], ['Dietary fibre', '16.3 g'], ['Total fat', '1.2 g'], ['Sodium', '15 mg']],
      ingredients: 'Green moong dal. Nothing else.',
      shelf: '9 months from packing',
      storage: 'Store in a cool, dry, hygienic place away from direct sunlight. Transfer to an airtight container after opening.',
      usage: 'Rinse, soak 30 minutes, pressure-cook 2–3 whistles. Ideal for khichdi, dal tadka and sprouting.'
    },
    'chana-dal': {
      name: 'Chana Dal', note: '(Split Bengal Gram)', kind: 'Pulses', cat: 'pulses',
      img: 'Assets/pack-chana-dal.jpg',
      tagline: 'Nutty, golden bengal gram — the backbone of dals, sweets and festive cooking.',
      badges: ['100% Natural', 'Rich in Fibre', 'No Preservatives'],
      sizes: [{ label: '250 g', mrp: 50 }, { label: '500 g', mrp: 90 }, { label: '1 kg', mrp: 170 }],
      def: 1,
      benefits: ['Low glycaemic index — releases energy slowly through the day.', 'Machine-graded twice so every grain cooks at the same pace.', 'A natural source of protein, fibre and folate.'],
      nutrition: [['Energy', '360 kcal'], ['Protein', '20.9 g'], ['Carbohydrate', '61.2 g'], ['Total sugars', '2.8 g'], ['Dietary fibre', '15.1 g'], ['Total fat', '5.3 g'], ['Sodium', '24 mg']],
      ingredients: 'Chana dal (split bengal gram). Nothing else.',
      shelf: '9 months from packing',
      storage: 'Store in a cool, dry, hygienic place away from direct sunlight. Transfer to an airtight container after opening.',
      usage: 'Soak 45–60 minutes for even cooking. Ideal for dal fry, puran poli, and tempering.'
    },
    'udad-dal': {
      name: 'Udad Dal', note: '(Black Matpe Beans)', kind: 'Pulses', cat: 'pulses',
      img: 'Assets/pack-udad-dal.jpg',
      tagline: 'The soul of soft idlis, crisp dosas and rich dal makhani.',
      badges: ['100% Natural', 'High Protein', 'No Preservatives'],
      sizes: [{ label: '250 g', mrp: 65 }, { label: '500 g', mrp: 115 }, { label: '1 kg', mrp: 220 }],
      def: 1,
      benefits: ['Ferments beautifully — the secret to airy idli and dosa batter.', 'Rich in protein, iron and folic acid.', 'Whole, uniform grains with a naturally creamy texture.'],
      nutrition: [['Energy', '341 kcal'], ['Protein', '25.0 g'], ['Carbohydrate', '58.9 g'], ['Total sugars', '2.2 g'], ['Dietary fibre', '18.3 g'], ['Total fat', '1.6 g'], ['Sodium', '38 mg']],
      ingredients: 'Udad dal (black matpe beans). Nothing else.',
      shelf: '9 months from packing',
      storage: 'Store in a cool, dry, hygienic place away from direct sunlight. Transfer to an airtight container after opening.',
      usage: 'Soak 4–6 hours for batters; 30 minutes for dals. Grind cold for the fluffiest ferment.'
    },
    'whole-jeera': {
      name: 'Whole Jeera', note: '(Cumin Seeds)', kind: 'Whole Spices', cat: 'spices',
      img: 'Assets/pack-whole-jeera.jpg',
      tagline: 'Plump Gujarat cumin, sun-dried whole so the essential oils stay in the seed.',
      badges: ['100% Natural', 'Sun-Dried', 'No Additives'],
      sizes: [{ label: '100 g', mrp: 75 }, { label: '250 g', mrp: 165 }, { label: '500 g', mrp: 310 }],
      def: 1,
      benefits: ['Whole seeds keep aroma locked until the moment they hit hot ghee.', 'Machine-cleaned and hand-checked — no stems, no stones.', 'Traditionally used to aid digestion in everyday Indian cooking.'],
      nutrition: [['Energy', '375 kcal'], ['Protein', '17.8 g'], ['Carbohydrate', '44.2 g'], ['Total sugars', '2.2 g'], ['Dietary fibre', '10.5 g'], ['Total fat', '22.3 g'], ['Sodium', '168 mg']],
      ingredients: 'Whole cumin seeds. Nothing else.',
      shelf: '12 months from packing',
      storage: 'Keep aroma-sealed pack closed; store airtight, away from moisture and sunlight.',
      usage: 'Temper whole in hot oil or ghee, or dry-roast and grind fresh for maximum flavour.'
    },
    'whole-coriander': {
      name: 'Coriander Seeds', note: '(Whole Dhana)', kind: 'Whole Spices', cat: 'spices',
      img: 'Assets/pack-coriander.jpg',
      tagline: 'Citrusy, honey-hued dhana — the quiet workhorse of every Indian masala.',
      badges: ['100% Natural', 'Sun-Dried', 'No Additives'],
      sizes: [{ label: '100 g', mrp: 45 }, { label: '250 g', mrp: 95 }, { label: '500 g', mrp: 175 }],
      def: 1,
      benefits: ['Sun-dried whole so volatile oils stay intact until you grind.', 'Uniform bold seeds — cleaner flavour, no bitterness.', 'Grind fresh with jeera for a masala base that transforms sabzi.'],
      nutrition: [['Energy', '298 kcal'], ['Protein', '12.4 g'], ['Carbohydrate', '54.9 g'], ['Total sugars', '1.9 g'], ['Dietary fibre', '41.9 g'], ['Total fat', '17.8 g'], ['Sodium', '35 mg']],
      ingredients: 'Whole coriander seeds. Nothing else.',
      shelf: '12 months from packing',
      storage: 'Keep aroma-sealed pack closed; store airtight, away from moisture and sunlight.',
      usage: 'Dry-roast lightly and grind for fresh dhana powder, or temper whole for a citrus note.'
    },
    'groundnut-oil': {
      name: 'Groundnut Oil', note: '(Kachi Ghani)', kind: 'Cold Press Oil', cat: 'oil',
      img: 'Assets/pack-groundnut-oil.jpg',
      tagline: 'Pressed slow on wooden ghanis from the finest Saurashtra groundnuts — unrefined, aromatic, honest.',
      badges: ['Cold Pressed', 'Wood Extracted', 'Zero Cholesterol', 'No Preservatives'],
      sizes: [{ label: '500 ml', mrp: 220 }, { label: '1 L', mrp: 420 }, { label: '5 L', mrp: 1950 }],
      def: 1,
      benefits: ['Rich in MUFA and PUFA — the good fats your heart prefers.', 'Cold pressing keeps natural antioxidants and vitamin E intact.', 'High smoke point makes it ideal for everyday Indian frying and tadka.'],
      nutrition: [['Energy', '884 kcal'], ['Total fat', '100 g'], ['— Saturated fat', '18 g'], ['— MUFA', '46 g'], ['— PUFA', '32 g'], ['Trans fat', '0 g'], ['Cholesterol', '0 mg']],
      ingredients: '100% groundnut oil. Nothing else.',
      shelf: '12 months from packaging',
      storage: 'Store in a cool, dry place away from direct sunlight. Do not refrigerate.',
      usage: 'Use for everyday cooking, deep frying and tadka. A little goes further than refined oil.'
    },
    'gir-cow-ghee': {
      name: 'Gir Cow Ghee', note: '(A2 Bilona)', kind: 'Pure Ghee', cat: 'ghee',
      img: 'Assets/pack-ghee.jpg',
      tagline: 'Slow-cooked bilona ghee from the milk of healthy A2 Gir cows — grainy, golden, sacred to every kitchen.',
      badges: ['A2 Gir Cow Milk', 'Bilona Made', 'Rich Aroma', 'No Additives'],
      sizes: [{ label: '250 ml', mrp: 650 }, { label: '500 ml', mrp: 1200 }, { label: '1 L', mrp: 2300 }],
      def: 1,
      benefits: ['Made by the traditional bilona method — curd churned, then slow-cooked.', 'From A2 Gir cows of Saurashtra, raised on natural fodder.', 'Granular texture and nutty aroma that ghee lovers recognise instantly.'],
      nutrition: [['Energy', '897 kcal'], ['Total fat', '99.7 g'], ['— Saturated fat', '65.0 g'], ['Trans fat', '0 g'], ['Cholesterol', '220 mg'], ['Protein', '0 g'], ['Carbohydrate', '0 g']],
      ingredients: '100% Gir cow milk fat. Contains milk.',
      shelf: '9 months from packing',
      storage: 'Store in a cool, dry place away from direct sunlight. No refrigeration required.',
      usage: 'Finish dals, laddoos and rotis; use for tadka; or take a spoon with warm milk the traditional way.'
    }
  };
  window.SAURAM = { PRODUCTS: PRODUCTS, toast: toast };

  /* ================= Accordions ================= */
  $$('.acc-btn').forEach(function (btn) {
    btn.setAttribute('aria-expanded', btn.closest('.acc-item').classList.contains('open') ? 'true' : 'false');
    btn.addEventListener('click', function () {
      var item = btn.closest('.acc-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ================= Modals ================= */
  function openModal(m) {
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    m._prevFocus = document.activeElement;
    var c = $('.modal-close', m); if (c) c.focus();
  }
  function closeModal(m) {
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (m._prevFocus && m._prevFocus.focus) m._prevFocus.focus();
  }
  $$('.modal').forEach(function (m) {
    var bd = $('.modal-backdrop', m); if (bd) bd.addEventListener('click', function () { closeModal(m); });
    var cl = $('.modal-close', m); if (cl) cl.addEventListener('click', function () { closeModal(m); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { var open = $('.modal.open'); if (open) closeModal(open); }
  });

  /* ================= Wishlist / Compare (localStorage) ================= */
  function store(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
  }
  function saveStore(key, arr) { try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {} }
  function bindToggle(btnSel, key, labelOn, labelOff) {
    $$(btnSel).forEach(function (btn) {
      var slug = btn.getAttribute('data-slug');
      if (store(key).indexOf(slug) > -1) btn.classList.add('active');
      btn.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var arr = store(key), i = arr.indexOf(slug);
        if (i > -1) { arr.splice(i, 1); btn.classList.remove('active'); toast(labelOff); }
        else { arr.push(slug); btn.classList.add('active'); toast(labelOn); }
        saveStore(key, arr);
      });
    });
  }
  bindToggle('.wish-btn', 'sauram-wishlist', 'Added to wishlist', 'Removed from wishlist');
  bindToggle('.comp-btn', 'sauram-compare', 'Added to compare', 'Removed from compare');

  /* ================= Quick view ================= */
  var qv = $('#quickView');
  if (qv) {
    $$('.quick-view').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var slug = btn.getAttribute('data-slug');
        var p = PRODUCTS[slug]; if (!p) return;
        $('#qvKind', qv).textContent = p.kind;
        $('#qvName', qv).textContent = p.name + ' ' + p.note;
        $('#qvDesc', qv).textContent = p.tagline;
        $('#qvSizes', qv).textContent = p.sizes.map(function (s) { return s.label; }).join(' · ');
        $('#qvLink', qv).setAttribute('href', 'product-details.html?p=' + slug);
        var media = $('#qvMedia', qv);
        if (p.img) {
          media.innerHTML = '<img src="' + p.img + '" alt="SAURAM ' + p.name + ' pack">';
        } else {
          media.innerHTML = '<div class="ph" style="height:100%;border:0;border-radius:0"><span class="ph-label">Pack Photography</span><span class="ph-sub">Coming soon</span></div>';
        }
        openModal(qv);
      });
    });
  }

  /* ================= Product listing (filters / sort / search / pagination) ================= */
  var grid = $('#productGrid');
  if (grid) {
    /* filters start collapsed for mobile; open them on desktop */
    var fbox = $('#filtersBox');
    if (fbox && window.matchMedia('(min-width:1024px)').matches) fbox.setAttribute('open', '');
    var cards = $$('.product-card', grid);
    var searchIn = $('#catalogSearch');
    var sortSel = $('#catalogSort');
    var countEl = $('#resultsCount');
    var emptyEl = $('#emptyState');
    var pagEl = $('#pagination');
    var PER_PAGE = 6, page = 1;

    /* deep link ?cat= */
    var params = new URLSearchParams(location.search);
    var deepCat = params.get('cat');
    if (deepCat) {
      var box = $('input[data-filter="cat"][value="' + deepCat + '"]');
      if (box) box.checked = true;
    }

    function checkedVals(name) {
      return $$('input[data-filter="' + name + '"]:checked').map(function (i) { return i.value; });
    }
    function matches(card) {
      var cats = checkedVals('cat'), sizes = checkedVals('size'), avail = checkedVals('avail'), prices = $$('input[data-filter="price"]:checked');
      var q = (searchIn && searchIn.value || '').trim().toLowerCase();
      if (cats.length && cats.indexOf(card.dataset.cat) < 0) return false;
      if (avail.length && avail.indexOf(card.dataset.avail) < 0) return false;
      if (sizes.length) {
        var cardSizes = card.dataset.sizes.split(',');
        if (!sizes.some(function (s) { return cardSizes.indexOf(s) > -1; })) return false;
      }
      if (prices.length) {
        var pr = parseFloat(card.dataset.price);
        var ok = prices.some(function (i) { return pr >= parseFloat(i.dataset.min) && pr <= parseFloat(i.dataset.max); });
        if (!ok) return false;
      }
      if (q && card.dataset.name.toLowerCase().indexOf(q) < 0 && card.dataset.kind.toLowerCase().indexOf(q) < 0) return false;
      return true;
    }
    function apply(resetPage) {
      if (resetPage) page = 1;
      var vis = cards.filter(matches);
      var mode = sortSel ? sortSel.value : 'featured';
      if (mode !== 'featured') {
        vis.sort(function (a, b) {
          if (mode === 'name-az') return a.dataset.name.localeCompare(b.dataset.name);
          if (mode === 'name-za') return b.dataset.name.localeCompare(a.dataset.name);
          if (mode === 'price-low') return a.dataset.price - b.dataset.price;
          if (mode === 'price-high') return b.dataset.price - a.dataset.price;
          return 0;
        });
        vis.forEach(function (c) { grid.appendChild(c); });
      }
      var pages = Math.max(1, Math.ceil(vis.length / PER_PAGE));
      if (page > pages) page = pages;
      cards.forEach(function (c) { c.classList.add('hidden'); });
      vis.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (c) { c.classList.remove('hidden'); });
      if (countEl) countEl.innerHTML = 'Showing <strong>' + vis.length + '</strong> of ' + cards.length + ' products';
      if (emptyEl) emptyEl.classList.toggle('hidden', vis.length > 0);
      if (pagEl) {
        pagEl.innerHTML = '';
        if (pages > 1) {
          for (var i = 1; i <= pages; i++) {
            (function (n) {
              var b = document.createElement('button');
              b.className = 'page-btn' + (n === page ? ' active' : '');
              b.textContent = n;
              b.setAttribute('aria-label', 'Page ' + n);
              if (n === page) b.setAttribute('aria-current', 'page');
              b.addEventListener('click', function () { page = n; apply(false); grid.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); });
              pagEl.appendChild(b);
            })(i);
          }
        }
      }
    }
    $$('input[data-filter]').forEach(function (i) { i.addEventListener('change', function () { apply(true); }); });
    if (searchIn) searchIn.addEventListener('input', function () { apply(true); });
    if (sortSel) sortSel.addEventListener('change', function () { apply(true); });
    var clearBtn = $('#clearFilters');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      $$('input[data-filter]').forEach(function (i) { i.checked = false; });
      if (searchIn) searchIn.value = '';
      if (sortSel) sortSel.value = 'featured';
      apply(true);
    });
    apply(true);
  }

  /* ================= Product details page ================= */
  var pd = $('#pdPage');
  if (pd) {
    var slug = new URLSearchParams(location.search).get('p') || 'groundnut-oil';
    var p = PRODUCTS[slug] || PRODUCTS['groundnut-oil'];
    document.title = 'SAURAM — ' + p.name + ' ' + p.note;
    var md = $('meta[name="description"]');
    if (md) md.setAttribute('content', 'SAURAM ' + p.name + ' ' + p.note + ' — ' + p.tagline);

    $('#pdCrumb').textContent = p.name;
    $('#pdKind').textContent = p.kind;
    $('#pdTitle').innerHTML = p.name + ' <span class="product-note">' + p.note + '</span>';
    $('#pdTagline').textContent = p.tagline;
    $('#pdBadges').innerHTML = p.badges.map(function (b) { return '<span class="badge-soft">' + b + '</span>'; }).join('');
    $('#pdIngredients').textContent = p.ingredients;
    $('#pdShelf').textContent = p.shelf;
    $('#pdStorage').textContent = p.storage;
    $('#pdUsage').textContent = p.usage;
    $('#pdBenefits').innerHTML = p.benefits.map(function (b) { return '<li>' + b + '</li>'; }).join('');
    $('#pdNutrition').innerHTML = p.nutrition.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('');

    var mainWrap = $('#pdMain'), mainImg = $('#pdMainImg'), mainPh = $('#pdMainPh');
    function showMain(src, isPh, alt) {
      if (isPh || !src) { mainImg.classList.add('hidden'); mainPh.classList.remove('hidden'); mainWrap.style.cursor = 'default'; }
      else {
        mainPh.classList.add('hidden'); mainImg.classList.remove('hidden');
        mainImg.src = src; mainWrap.style.cursor = 'zoom-in';
        mainImg.alt = alt || ('SAURAM ' + p.name + ' ' + p.note + ' pack');
      }
    }
    showMain(p.img, !p.img);
    /* thumbs: real pack photo + two temporary placeholder views
       (swap the placeholder srcs for real lifestyle / texture shots per product) */
    var thumbs = $('#pdThumbs');
    var thumbDefs = [
      { src: p.img, ph: !p.img, label: 'Pack' },
      { src: 'Assets/placeholders/tadka-pan.jpg', ph: false, label: 'Lifestyle', alt: 'Cooked dish in a pan (temporary placeholder photograph)' },
      { src: 'Assets/placeholders/spices-flatlay.jpg', ph: false, label: 'Texture', alt: 'Whole spices laid out on a board (temporary placeholder photograph)' }
    ];
    thumbs.innerHTML = '';
    thumbDefs.forEach(function (t, i) {
      var b = document.createElement('button');
      b.className = 'pd-thumb' + (i === 0 ? ' active' : '');
      b.setAttribute('aria-label', t.label + ' view');
      b.innerHTML = t.ph
        ? '<span class="ph" style="width:100%;height:100%;border:0;border-radius:0;padding:.4rem"><span class="ph-sub" style="font-size:.6rem">' + t.label + '</span></span>'
        : '<img src="' + t.src + '" alt="">';
      b.addEventListener('click', function () {
        $$('.pd-thumb', thumbs).forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        showMain(t.src, t.ph, t.alt);
      });
      thumbs.appendChild(b);
    });

    /* hover zoom */
    if (!reduceMotion) {
      mainWrap.addEventListener('mousemove', function (e) {
        if (mainImg.classList.contains('hidden')) return;
        var r = mainWrap.getBoundingClientRect();
        mainImg.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
        mainImg.style.transform = 'scale(1.65)';
      });
      mainWrap.addEventListener('mouseleave', function () { mainImg.style.transform = ''; });
    }

    /* pack sizes + price */
    var packs = $('#pdPacks'), priceEl = $('#pdPrice'), sbSize = $('#sbSize');
    function setSize(i) {
      priceEl.textContent = '₹' + p.sizes[i].mrp;
      $('#sbName').textContent = p.name + ' ' + p.note;
      if (sbSize) sbSize.textContent = p.sizes[i].label + ' · ₹' + p.sizes[i].mrp + ' MRP*';
    }
    packs.innerHTML = '';
    p.sizes.forEach(function (s, i) {
      var l = document.createElement('label');
      l.className = 'pill-check';
      l.innerHTML = '<input type="radio" name="pack" value="' + s.label + '"' + (i === p.def ? ' checked' : '') + '><span>' + s.label + '</span>';
      l.querySelector('input').addEventListener('change', function () { setSize(i); });
      packs.appendChild(l);
    });
    setSize(p.def);

    /* related products */
    var rel = $('#pdRelated');
    if (rel) {
      var others = Object.keys(PRODUCTS).filter(function (k) { return k !== slug; });
      others.sort(function (a, b) {
        return (PRODUCTS[b].cat === p.cat ? 1 : 0) - (PRODUCTS[a].cat === p.cat ? 1 : 0);
      });
      rel.innerHTML = others.slice(0, 4).map(function (k) {
        var r = PRODUCTS[k];
        var media = r.img
          ? '<img src="' + r.img + '" alt="SAURAM ' + r.name + ' pack" loading="lazy">'
          : '<div class="ph" style="height:100%;border:0;border-radius:0"><span class="ph-label">Photo Soon</span></div>';
        return '<a class="product-card reveal in" href="product-details.html?p=' + k + '">' +
          '<div class="product-media">' + media + '</div>' +
          '<div class="product-body"><p class="product-kind">' + r.kind + '</p>' +
          '<h3>' + r.name + '</h3><p class="product-desc">' + r.tagline + '</p>' +
          '<div class="product-foot"><span class="product-size">' + r.sizes.map(function (s) { return s.label; }).join(' · ') + '</span><span class="text-link">View <span aria-hidden="true">→</span></span></div></div></a>';
      }).join('');
    }

    /* sticky buy bar */
    var sticky = $('#stickyBuy'), anchor = $('#pdCtas');
    if (sticky && anchor && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        sticky.classList.toggle('show', !en[0].isIntersecting && en[0].boundingClientRect.top < 0);
      }, { threshold: 0 }).observe(anchor);
    }

    /* share */
    $$('.share-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var kind = b.getAttribute('data-share');
        var url = location.href, text = 'SAURAM ' + p.name + ' ' + p.note;
        if (kind === 'native' && navigator.share) { navigator.share({ title: text, url: url }).catch(function () {}); return; }
        if (kind === 'whatsapp') { window.open('https://wa.me/?text=' + encodeURIComponent(text + ' — ' + url), '_blank', 'noopener'); return; }
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('Link copied to clipboard'); });
      });
    });
  }

  /* ================= Gallery (filter / lightbox / load more) ================= */
  var gwrap = $('#galleryGrid');
  if (gwrap) {
    var gitems = $$('.masonry-item', gwrap);
    var BATCH = 9, shown = BATCH, activeCat = 'all';
    var moreBtn = $('#loadMore');
    function refreshGallery() {
      var match = gitems.filter(function (it) { return activeCat === 'all' || it.dataset.gcat === activeCat; });
      gitems.forEach(function (it) { it.classList.add('hidden'); });
      match.slice(0, shown).forEach(function (it) { it.classList.remove('hidden'); });
      if (moreBtn) moreBtn.classList.toggle('hidden', match.length <= shown);
    }
    $$('[data-gfilter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('[data-gfilter]').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-gfilter');
        shown = BATCH;
        refreshGallery();
      });
    });
    if (moreBtn) moreBtn.addEventListener('click', function () { shown += BATCH; refreshGallery(); });
    refreshGallery();

    /* lightbox */
    var lb = $('#lightbox');
    if (lb) {
      var lbImg = $('#lbImg'), lbCap = $('#lbCaption'), current = 0;
      function visibleItems() { return gitems.filter(function (it) { return !it.classList.contains('hidden') && it.getAttribute('data-full'); }); }
      function showLb(i) {
        var vis = visibleItems();
        if (!vis.length) return;
        current = (i + vis.length) % vis.length;
        var it = vis[current];
        lbImg.src = it.getAttribute('data-full');
        lbImg.alt = it.getAttribute('data-caption') || '';
        lbCap.textContent = it.getAttribute('data-caption') || '';
      }
      gitems.forEach(function (it) {
        if (!it.getAttribute('data-full')) return;
        it.style.cursor = 'zoom-in';
        it.setAttribute('tabindex', '0');
        it.setAttribute('role', 'button');
        function activate() { showLb(visibleItems().indexOf(it)); openModal(lb); }
        it.addEventListener('click', activate);
        it.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
      });
      $('#lbPrev').addEventListener('click', function () { showLb(current - 1); });
      $('#lbNext').addEventListener('click', function () { showLb(current + 1); });
      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'ArrowLeft') showLb(current - 1);
        if (e.key === 'ArrowRight') showLb(current + 1);
      });
    }
  }

  /* ================= TOC scroll-spy (policies) ================= */
  var spyNav = $('[data-scrollspy]');
  if (spyNav && 'IntersectionObserver' in window) {
    var spyLinks = $$('a[href^="#"]', spyNav);
    var spyTargets = spyLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          spyLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    spyTargets.forEach(function (t) { spyObs.observe(t); });
  }

  /* ================= FAQ page (live search + categories) ================= */
  var faqWrap = $('#faqGroups');
  if (faqWrap) {
    var faqSearch = $('#faqSearch'), fCat = 'all';
    var groups = $$('.faq-group', faqWrap);
    function applyFaq() {
      var q = (faqSearch && faqSearch.value || '').trim().toLowerCase();
      var total = 0;
      groups.forEach(function (g) {
        var inCat = fCat === 'all' || g.dataset.fcat === fCat;
        var visibleInGroup = 0;
        $$('.acc-item', g).forEach(function (item) {
          var ok = inCat && (!q || item.textContent.toLowerCase().indexOf(q) > -1);
          item.classList.toggle('hidden', !ok);
          if (ok) visibleInGroup++;
          if (q && ok) { item.classList.add('open'); var b = $('.acc-btn', item); if (b) b.setAttribute('aria-expanded', 'true'); }
        });
        g.classList.toggle('hidden', visibleInGroup === 0);
        total += visibleInGroup;
      });
      var em = $('#faqEmpty'); if (em) em.classList.toggle('hidden', total > 0);
    }
    if (faqSearch) faqSearch.addEventListener('input', applyFaq);
    $$('[data-ffilter]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        $$('[data-ffilter]').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        fCat = chip.getAttribute('data-ffilter');
        applyFaq();
      });
    });
  }

  /* ================= Interactive steps (manufacturing) ================= */
  var stepsNav = $('#stepsNav');
  if (stepsNav) {
    var chips = $$('.step-chip', stepsNav), panels = $$('.step-panel');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (pn) { pn.classList.remove('active'); });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
        var target = $('#step-' + chip.getAttribute('data-step'));
        if (target) target.classList.add('active');
      });
    });
  }

  /* ================= Forms (validation + conditional sections) ================= */
  $$('form[data-validate]').forEach(function (form) {
    /* conditional fieldsets driven by a radio pill group */
    $$('input[data-switch]', form).forEach(function (radio) {
      radio.addEventListener('change', function () {
        $$('[data-show-for]', form).forEach(function (sec) {
          sec.classList.toggle('hidden', sec.getAttribute('data-show-for') !== radio.value);
        });
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      $$('.field', form).forEach(function (f) {
        var input = $('input,select,textarea', f);
        if (!input || f.closest('.hidden')) { f.classList.remove('invalid'); return; }
        var bad = false;
        if (input.hasAttribute('required') && !input.value.trim()) bad = true;
        if (input.type === 'email' && input.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value)) bad = true;
        f.classList.toggle('invalid', bad);
        if (bad) { ok = false; firstBad = firstBad || input; }
      });
      var msg = $('.form-msg', form);
      if (!ok) {
        if (msg) { msg.classList.remove('ok'); msg.textContent = 'Please complete the highlighted fields.'; }
        if (firstBad) firstBad.focus();
        return;
      }
      if (msg) { msg.classList.add('ok'); msg.textContent = form.getAttribute('data-success') || 'Thank you — we will get back to you within one business day.'; }
      toast('Inquiry sent — thank you!');
      form.reset();
      $$('[data-show-for]', form).forEach(function (sec) { sec.classList.add('hidden'); });
    });
  });
})();
