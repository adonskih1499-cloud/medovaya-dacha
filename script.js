/* ============================================
   Медовая дача — интерактивность
   ============================================ */

(function () {
  'use strict';

  /* ---------- Navbar scrolled state ---------- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.add('open');
      iconOpen.classList.add('hidden');
      iconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.remove('open');
      iconOpen.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', function () {
    toggleMenu();
  });
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  /* ---------- Falling drops (Hero) ---------- */
  const dropsContainer = document.getElementById('drops');
  const dropConfigs = [
    { left: '12%', delay: '0s', dur: '8s' },
    { left: '22%', delay: '1.5s', dur: '10s' },
    { left: '35%', delay: '3s', dur: '9s' },
    { left: '68%', delay: '0.8s', dur: '11s' },
    { left: '78%', delay: '2.4s', dur: '9.5s' },
    { left: '88%', delay: '4s', dur: '10s' },
  ];
  dropConfigs.forEach(function (d) {
    const drop = document.createElement('span');
    drop.className = 'absolute top-0 w-[3px] h-3 rounded-full animate-drop';
    drop.style.left = d.left;
    drop.style.background = 'rgba(245, 222, 179, 0.7)';
    drop.style.animationDelay = d.delay;
    drop.style.animationDuration = d.dur;
    dropsContainer.appendChild(drop);
  });

  /* ---------- Reveal animation on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger children by index for nicer effect
          const siblings = Array.from(entry.target.parentElement.children).filter(function (el) {
            return el.classList.contains('reveal');
          });
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (Math.min(idx, 6) * 0.08) + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Gallery ---------- */
  const photos = [
    {
      src: 'images/cabin-outside.jpg',
      alt: 'Домик «Медовой дачи» снаружи',
      caption: 'Наш домик в лесу',
      span: 'span-2x2',
    },
    {
      src: 'images/window-hive.jpg',
      alt: 'Вид из спального места на пчелиные соты',
      caption: 'Вид на живые соты',
      span: '',
    },
    {
      src: 'images/ceiling-bees.jpg',
      alt: 'Тепло дерева и пчёл в каждом уголке',
      caption: 'Эстетика внутри домика для сна',
      span: '',
    },
    {
      src: 'images/tea-table.jpg',
      alt: 'Чаепитие на веранде с мёдом',
      caption: 'Чаепитие на веранде',
      span: 'span-2',
    },
    {
      src: 'images/window-forest.jpg',
      alt: 'Вид из окна на лес',
      caption: 'Вид на хвойный лес',
      span: '',
    },
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  photos.forEach(function (p) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gallery-item ' + p.span;
    btn.setAttribute('data-src', p.src);
    btn.setAttribute('data-caption', p.caption);
    btn.setAttribute('data-alt', p.alt);

    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.alt;
    img.loading = 'lazy';
    btn.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    btn.appendChild(overlay);

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = p.caption;
    btn.appendChild(caption);

    btn.addEventListener('click', function () {
      openLightbox(p);
    });

    galleryGrid.appendChild(btn);
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxAlt = document.getElementById('lightbox-alt');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(photo) {
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    lightboxCaption.textContent = photo.caption;
    lightboxAlt.textContent = photo.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  /* ---------- Booking form ---------- */
  const form = document.getElementById('booking-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  let toastTimer = null;
  function showToast(title, desc) {
    toastTitle.textContent = title;
    toastDesc.textContent = desc;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitText.textContent = 'Отправляем…';

    // Simulate submission
    setTimeout(function () {
      submitBtn.disabled = false;
      submitText.textContent = 'Отправить заявку';
      form.reset();
      showToast(
        'Заявка отправлена!',
        'Мы свяжемся с вами в течение дня, чтобы уточнить время сеанса.'
      );
    }, 800);
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  // Already handled by CSS scroll-behavior + scroll-padding-top,
  // but we add JS fallback for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
