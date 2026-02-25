/*================================================================
  RC ARGONET — Main JavaScript
  Covers: index.html & about.html
================================================================*/

/*=============== NAV TOGGLE (Mobile) ===============*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));

// Close menu when a link is clicked
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*=============== HEADER SCROLL EFFECT ===============*/
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  header?.classList.toggle('scrolled', scrolled);
  scrollUp?.classList.toggle('show', window.scrollY > 400);
});

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active', 'active-link');
        if (link.getAttribute('href') === `#${id}` ||
          link.getAttribute('href') === `index.html#${id}`) {
          link.classList.add('active', 'active-link');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink(); // run on load

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-card, .reveal-top, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/*=============== STAGGER PROJECT CARDS ===============*/
// Stagger delay for project-card elements (about page)
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.transitionDelay = `${(index % 3) * 80}ms`;
});

// Stagger delay for process cards (index page)
document.querySelectorAll('.process__card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});

// Stagger delay for unit cards (about page)
document.querySelectorAll('.unit__card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 70}ms`;
});

// Stagger delay for expert cards (about page)
document.querySelectorAll('.expert__card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});

// Stagger delay for donor cards (index page)
document.querySelectorAll('.donor__card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});

// Stagger delay for pillar cards (index page)
document.querySelectorAll('.pillar__card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 80}ms`;
});

/*=============== COUNTER ANIMATION (Impact Section) ===============*/
const counters = document.querySelectorAll('.impact__number[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const target = parseInt(el.dataset.target);

    // Format: values >= 1000 displayed as e.g. "10,000+"
    const isLarge = target >= 1000;
    const displayVal = isLarge ? Math.floor(target / 1000) : target;
    const suffix = isLarge ? ',000+' : '+';

    let count = 0;
    const step = Math.ceil(displayVal / 60);

    const timer = setInterval(() => {
      count = Math.min(count + step, displayVal);
      el.textContent = count + suffix;
      if (count >= displayVal) clearInterval(timer);
    }, 25);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

/*=============== RESOURCE FILTER CHIPS ===============*/
const filterChips = document.querySelectorAll('.filter__chip');
const resourceCards = document.querySelectorAll('.resource__card[data-category]');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    // Update active chip
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter || chip.textContent.trim().toLowerCase().replace(/\s+/g, '-');

    resourceCards.forEach(card => {
      const categories = card.dataset.category || '';
      const show = filter === 'all' || categories.includes(filter);

      card.style.transition = 'opacity 0.3s, transform 0.3s';
      if (show) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (card.style.opacity === '0') card.style.display = 'none';
        }, 300);
      }
    });
  });
});

/*=============== EXPERT CARD TOGGLE (About Page) ===============*/
// Original about.html had a card__button to toggle card__menu
document.querySelectorAll('.card__button').forEach(btn => {
  btn.addEventListener('click', () => {
    const article = btn.closest('.card__article');
    article?.classList.toggle('show-menu');

    const moreIcon = btn.querySelector('.card__more');
    const closeIcon = btn.querySelector('.card__close');
    if (moreIcon && closeIcon) {
      moreIcon.style.display = article.classList.contains('show-menu') ? 'none' : 'block';
      closeIcon.style.display = article.classList.contains('show-menu') ? 'block' : 'none';
    }
  });
});

/*=============== BROKEN IMAGE FALLBACK (Experts) ===============*/
document.querySelectorAll('.expert__avatar-wrap img').forEach(img => {
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const placeholder = this.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  });
});

/*=============== SMOOTH SCROLL FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // header height offset
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/*=============== NEWSLETTER FORM ===============*/
const newsletterForm = document.querySelector('.newsletter__form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('.newsletter__input');
  if (input?.value.trim()) {
    input.value = '';
    // Simple feedback — swap button text temporarily
    const btn = newsletterForm.querySelector('.button');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--first-color-alt)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
      }, 2500);
    }
  }
});

/*================================================================
  INFINITE CAROUSEL — JavaScript
  Auto-clones cards so the loop is seamless at any screen size.
  No dependencies required.
================================================================*/

(function () {
  'use strict';

  function initCarousel(carousel) {
    const track = carousel.querySelector('.carousel__content');
    if (!track) return;

    const originalCards = Array.from(track.querySelectorAll('.carousel__card'));
    if (!originalCards.length) return;

    /* -----------------------------------------------------------
       1. CLONE all original cards and append them to the track.
          CSS animates translateX(-50%) which lands exactly back
          at the start because both halves are identical.
    ----------------------------------------------------------- */
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    /* -----------------------------------------------------------
       2. SPEED — recalculate duration based on total content width
          so cards always move at a consistent px/s regardless of
          how many cards there are.
    ----------------------------------------------------------- */
    const PX_PER_SECOND = 80; // adjust to taste: lower = slower

    function setDuration() {
      // Only measure the original half (before clones)
      const halfWidth = track.scrollWidth / 2;
      const duration = halfWidth / PX_PER_SECOND;
      track.style.animationDuration = `${duration}s`;
    }

    setDuration();

    /* -----------------------------------------------------------
       3. PAUSE on hover / focus (accessibility)
    ----------------------------------------------------------- */
    carousel.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    carousel.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });

    // Also pause when a card receives keyboard focus
    track.addEventListener('focusin', () => {
      track.style.animationPlayState = 'paused';
    });

    track.addEventListener('focusout', () => {
      track.style.animationPlayState = 'running';
    });

    /* -----------------------------------------------------------
       4. TOUCH / DRAG — drag to scroll manually, release to resume
    ----------------------------------------------------------- */
    let isDragging = false;
    let startX = 0;
    let startOffset = 0;
    let currentTranslate = 0;

    function getTranslateX() {
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      return matrix.m41;
    }

    carousel.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.clientX;
      startOffset = getTranslateX();
      track.style.animationPlayState = 'paused';
      carousel.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      currentTranslate = startOffset + delta;
      track.style.transform = `translateX(${currentTranslate}px)`;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.cursor = '';
      // Snap back to CSS animation: remove inline transform and resume
      track.style.transform = '';
      track.style.animationPlayState = 'running';
    });

    // Touch events
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startOffset = getTranslateX();
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    carousel.addEventListener('touchmove', e => {
      const delta = e.touches[0].clientX - startX;
      currentTranslate = startOffset + delta;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      track.style.transform = '';
      track.style.animationPlayState = 'running';
    });

    /* -----------------------------------------------------------
       5. RESIZE — recalculate duration if window resizes
    ----------------------------------------------------------- */
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setDuration, 200);
    });

    /* -----------------------------------------------------------
       6. VISIBILITY — pause when tab is hidden to save resources
    ----------------------------------------------------------- */
    document.addEventListener('visibilitychange', () => {
      track.style.animationPlayState =
        document.hidden ? 'paused' : 'running';
    });
  }

  /* -----------------------------------------------------------
     Init all carousels on the page
  ----------------------------------------------------------- */
  function initAll() {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();

/*=============== KNOWLEDGE BASE MODAL ===============*/
function openKbModal() {
  document.getElementById('kbModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeKbModal(e) {
  if (!e || e.target === document.getElementById('kbModal')) {
    document.getElementById('kbModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeKbModal();
});