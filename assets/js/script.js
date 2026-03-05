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
const modalContentData = {
  'ai': {
    icon: 'ri-robot-line',
    badge: 'Digital Innovation',
    title: 'AI & Digital Innovation',
    text: 'Explore our latest AI projects, implementation guides, and digital transformation tools designed to drive sustainable growth.',
    buttons: [
      /* { text: 'LMS AGRONET Hub - Innovation Lab', link: 'https://lms-platform-ai.vercel.app/', icon: 'ri-rocket-line', primary: true }, */
      { text: 'Test your ESG performance', link: 'https://esg-baseline.netlify.app/', icon: 'ri-line-chart-line', primary: true }
    ]
  },
  'training': {
    icon: '🚧',
    badge: 'Coming Soon',
    title: 'Training Repository',
    text: 'Our team is working hard to bring you a curated library of trainings and educational resources. Please check back soon.',
    buttons: []
  },
  'funding': {
    icon: '🚧',
    badge: 'Coming Soon',
    title: 'Funding Opportunities',
    text: 'A catalog of open calls and grants is currently in development. We are aggregating the latest financial instruments for your projects.',
    buttons: []
  },
  'publications': {
    icon: 'ri-article-line',
    badge: 'Library',
    title: 'Publications',
    text: 'Access our repository of technical reports, research papers, and educational presentations on sustainable agriculture and digital innovation.',
    buttons: [
      { text: 'Sljiva - Zaboravljeni potencijal', link: 'assets/publications/Sljiva-zaboravljeni-potencijal.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Crveni pauk', link: 'assets/publications/Crveni-pauk.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Tehnologija uzgoja jabuke', link: 'assets/publications/Tehnologija-uzgoja-jabuke.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Tehnologija uzgoja sljive', link: 'assets/publications/Tehnologija-uzgoja-sljive.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Kruškina buva', link: 'assets/publications/kruškina-buva.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Hemijsko prorjeđivanjе i gibberelini', link: 'assets/publications/hemijsko-prorjeđivanjе-i-gibberelini.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true },
      { text: 'Mašine za održavanje zemljišta', link: 'assets/publications/Masine-za-odrzavanje-zemljista-u-vocnjacima.pdf', icon: 'ri-file-pdf-line', preview: true, primary: true, dual: true }
    ]
  }
};

function openKbModal(section) {
  const modal = document.getElementById('kbModal');
  const content = document.getElementById('modalContent');
  const data = modalContentData[section] || modalContentData['training'];

  let buttonsHtml = '';
  if (data.buttons && data.buttons.length > 0) {
    buttonsHtml = `<div class="kb-modal__actions">
      ${data.buttons.map(btn => {
      if (btn.dual) {
        return `
            <div class="kb-resource-item">
              <span class="kb-resource-title">${btn.text}</span>
              <div class="kb-resource-actions">
                <a href="javascript:void(0)" 
                   class="kb-tool-btn kb-tool-btn--primary" 
                   onclick="${btn.preview ? `openPdfModal('${btn.link}')` : `window.open('${btn.link}', '_blank')`}">
                  <i class="ri-eye-line"></i> Preview
                </a>
                <a href="${btn.link}" class="kb-tool-btn" download target="_blank">
                  <i class="ri-download-line"></i> Download
                </a>
              </div>
            </div>
          `;
      }
      return `
          <a href="${btn.preview ? 'javascript:void(0)' : btn.link}" 
             class="kb-tool-btn ${btn.primary ? 'kb-tool-btn--primary' : ''}" 
             ${btn.preview ? `onclick="openPdfModal('${btn.link}')"` : 'target="_blank"'}>
            ${btn.icon ? `<i class="${btn.icon}"></i>` : ''} ${btn.text}
          </a>
        `;
    }).join('')}
    </div>`;
  }

  content.innerHTML = `
    <span class="kb-modal__icon">${data.icon.startsWith('ri-') ? `<i class="${data.icon}"></i>` : data.icon}</span>
    <div class="kb-modal__badge">${data.badge}</div>
    <h3 class="kb-modal__title">${data.title}</h3>
    <p class="kb-modal__text">${data.text}</p>
    ${buttonsHtml}
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeKbModal(e) {
  const modal = document.getElementById('kbModal');
  if (!e || e.target === modal || e.target.closest('.kb-modal__close')) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeKbModal();
    closePdfModal();
  }
});

/*=============== PDF PREVIEW MODAL ===============*/
function openPdfModal(url) {
  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfIframe');
  if (modal && iframe) {
    iframe.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePdfModal(e) {
  const modal = document.getElementById('pdfModal');
  const iframe = document.getElementById('pdfIframe');

  if (!e || e.target === modal || e.target.closest('.pdf-modal__close-btn')) {
    if (modal) modal.classList.remove('active');
    if (iframe) iframe.src = ''; // Clear src to stop loading
    document.body.style.overflow = '';
  }
}