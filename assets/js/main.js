/**
 * Obsidian Kinetic - Main Frontend Script
 * -----------------------------------------
 * Handles navigation, mobile drawer, project modal, form validation,
 * WhatsApp integration, scroll-reveal animations, and telemetry counters.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.AGENCY_CONFIG || {};

  // 1. Initialize Dynamic Config & Links
  initAgencyConfig(config);

  // 2. Initialize Navigation & Mobile Drawer
  initNavigation();

  // 3. Initialize Interactive Project Showcase Modal
  initProjectModal(config);

  // 4. Initialize Contact Form Validation & Handling
  initContactForm(config);

  // 5. Initialize Scroll Reveal & Telemetry Counters
  initScrollAnimations();

  // 6. Initialize Scroll-to-top button
  initScrollToTop();
});

/**
 * Hydrates UI elements from agency-config.js
 */
function initAgencyConfig(config) {
  if (!config.contact) return;

  const phone = config.contact.whatsappNumber || "15550192834";
  const defaultMsg = config.contact.whatsappPrefillMessage || "Hello! I'd like to discuss a web project.";
  const encodedMsg = encodeURIComponent(defaultMsg);
  const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  // Update all WhatsApp links
  document.querySelectorAll('a[data-action="whatsapp"]').forEach(el => {
    el.href = waUrl;
  });

  // Update all Mailto links
  if (config.contact.email) {
    document.querySelectorAll('a[data-action="email"]').forEach(el => {
      el.href = `mailto:${config.contact.email}`;
    });
    document.querySelectorAll('[data-bind="agency-email"]').forEach(el => {
      el.textContent = config.contact.email;
    });
  }

  // Update Legal & Brand
  if (config.brand) {
    document.querySelectorAll('[data-bind="agency-year"]').forEach(el => {
      el.textContent = config.brand.year || new Date().getFullYear();
    });
    document.querySelectorAll('[data-bind="agency-legal"]').forEach(el => {
      el.textContent = config.brand.legalName || config.brand.name;
    });
  }
}

/**
 * Handles desktop ScrollSpy and Mobile Drawer
 */
function initNavigation() {
  const header = document.querySelector('header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Toggle Mobile Menu
  function openMobileMenu() {
    mobileDrawer.classList.add('is-open');
    mobileBackdrop.classList.remove('hidden');
    setTimeout(() => mobileBackdrop.classList.add('opacity-100'), 10);
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('is-open');
    mobileBackdrop.classList.remove('opacity-100');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(() => mobileBackdrop.classList.add('hidden'), 350);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Header background blur intensification on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('bg-surface-container-lowest/90', 'shadow-lg');
      header.classList.remove('bg-surface-container-lowest/70');
    } else {
      header.classList.add('bg-surface-container-lowest/70');
      header.classList.remove('bg-surface-container-lowest/90', 'shadow-lg');
    }
  }, { passive: true });

  // ScrollSpy for Active Desktop Nav Pill
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('bg-surface-container-high', 'text-on-surface');
              link.classList.remove('text-on-surface-variant');
            } else if (href && href.startsWith('#')) {
              link.classList.remove('bg-surface-container-high', 'text-on-surface');
              link.classList.add('text-on-surface-variant');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => observer.observe(sec));
  }
}

/**
 * Interactive Project Modal Dialog
 */
function initProjectModal(config) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContent = document.getElementById('modalDynamicContent');
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');

  const projects = config.projects || [];
  let currentProjectIndex = 0;
  let lastFocusedElement = null;

  function renderProject(index) {
    if (!projects[index]) return;
    currentProjectIndex = index;
    const p = projects[index];

    modalContent.innerHTML = `
      <div class="space-y-space-xl">
        <!-- Header -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${p.accentColor}"></span>
            <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">${p.category}</span>
          </div>
          <h2 class="font-headline-lg text-headline-lg text-on-surface mb-1">${p.title}</h2>
          <div class="flex items-center gap-3">
            <span class="font-label-sm text-label-sm text-primary font-mono">${p.domain}</span>
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-label-sm uppercase tracking-wider text-tertiary hover:underline">
                <span>Visit Live Website</span>
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            ` : ''}
          </div>
        </div>

        <!-- High-res Mockup Image -->
        <div class="rounded-xl overflow-hidden bg-surface-container-low border border-white/10 shadow-2xl">
          <div class="bg-surface-container-high px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div class="flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full bg-error/70"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-surface-bright"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface-variant font-mono">${p.displayUrl}</span>
            <span class="material-symbols-outlined text-sm text-on-surface-variant">lock</span>
          </div>
          <div class="relative aspect-[16/10] bg-surface-container-lowest">
            <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover object-top" loading="lazy">
          </div>
        </div>

        <!-- Case Study Summary & Narrative -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          <div class="p-space-lg rounded-xl bg-surface-container-low/70 border border-white/5">
            <h3 class="font-headline-md text-headline-md text-on-surface text-[18px] mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">flag</span>
              The Challenge
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${p.challenge}</p>
          </div>
          <div class="p-space-lg rounded-xl bg-surface-container-low/70 border border-white/5">
            <h3 class="font-headline-md text-headline-md text-on-surface text-[18px] mb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[20px]">lightbulb</span>
              The Solution
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${p.solution}</p>
          </div>
        </div>

        <!-- Key Outcomes / Metrics -->
        <div class="p-space-lg rounded-xl bg-surface-container-low/80 border border-white/10">
          <h3 class="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary text-[20px]">monitoring</span>
            Verified Key Outcomes
          </h3>
          <ul class="space-y-2">
            ${p.impact.map(item => `
              <li class="flex items-start gap-2 text-on-surface font-body-sm text-body-sm">
                <span class="material-symbols-outlined text-tertiary text-[18px] mt-0.5">check_circle</span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Deliverables & Tags -->
        <div>
          <h4 class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-2">Capabilities & Stack</h4>
          <div class="flex flex-wrap gap-2">
            ${p.tags.map(t => `<span class="px-3 py-1 rounded-full bg-surface-container-high text-xs font-mono text-on-surface">${t}</span>`).join('')}
            ${p.deliverables.map(d => `<span class="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">${d}</span>`).join('')}
          </div>
        </div>

        <!-- Bottom Action CTA -->
        <div class="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <div class="flex items-center gap-3">
            <a href="#contact" onclick="closeProjectModal();" class="inline-flex items-center gap-2 px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-lg hover:shadow-primary/40 transition-all">
              <span>Commission a Similar Project</span>
              <span class="material-symbols-outlined text-[18px]">north_east</span>
            </a>
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label-sm uppercase tracking-wider border border-white/10 transition-colors">
                <span>Open Live Site</span>
                <span class="material-symbols-outlined text-[14px]">arrow_outward</span>
              </a>
            ` : ''}
          </div>
          <span class="text-xs text-on-surface-variant">Project ${index + 1} of ${projects.length}</span>
        </div>
      </div>
    `;
  }

  function openProjectModal(index) {
    lastFocusedElement = document.activeElement;
    renderProject(index);
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  }

  window.closeProjectModal = function() {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  // Attach click listeners to all project detail trigger buttons
  document.querySelectorAll('[data-project-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-trigger');
      const idx = projects.findIndex(p => p.id === projectId);
      openProjectModal(idx >= 0 ? idx : 0);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeProjectModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      window.closeProjectModal();
    }
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIdx = (currentProjectIndex - 1 + projects.length) % projects.length;
      renderProject(newIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIdx = (currentProjectIndex + 1) % projects.length;
      renderProject(newIdx);
    });
  }
}

/**
 * Handles Client-Side Form Validation and Submission Integration
 */
function initContactForm(config) {
  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const successBox = document.getElementById('formSuccess');
  const errorBox = document.getElementById('formError');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Helper for showing field errors
  function setFieldError(input, message) {
    input.classList.add('border-error', 'ring-1', 'ring-error');
    let err = input.parentElement.querySelector('.field-error-msg');
    if (!err) {
      err = document.createElement('div');
      err.className = 'field-error-msg text-error text-xs font-body-sm mt-1';
      input.parentElement.appendChild(err);
    }
    err.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('border-error', 'ring-1', 'ring-error');
    const err = input.parentElement.querySelector('.field-error-msg');
    if (err) err.remove();
  }

  // Clear errors on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => clearFieldError(field));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorBox) errorBox.classList.add('hidden');
    if (successBox) successBox.classList.add('hidden');

    const nameInput = form.querySelector('#clientName');
    const emailInput = form.querySelector('#clientEmail');
    const businessInput = form.querySelector('#clientBusiness');
    const serviceInput = form.querySelector('#clientService');
    const scopeInput = form.querySelector('#clientScope');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setFieldError(nameInput, 'Please provide your name or title.');
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      setFieldError(emailInput, 'Business email is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please enter a valid email address (e.g. name@company.com).');
      isValid = false;
    }

    // Validate Business Name
    if (!businessInput.value.trim()) {
      setFieldError(businessInput, 'Please enter your practice or company name.');
      isValid = false;
    }

    // Validate Project Scope
    if (!scopeInput.value.trim() || scopeInput.value.trim().length < 10) {
      setFieldError(scopeInput, 'Please provide at least a brief summary of your project (min 10 characters).');
      isValid = false;
    }

    if (!isValid) return;

    // Build payload
    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      business: businessInput.value.trim(),
      service: serviceInput.value,
      scope: scopeInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    // UI Loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
      <span>Transmitting Inquiry...</span>
    `;

    const endpoint = (config.contact && config.contact.formEndpoint) || "";

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          showSuccess(form, successBox, payload);
        } else {
          showError(errorBox, 'Failed to submit via endpoint. Please try contacting directly via WhatsApp or email.');
        }
      } catch (err) {
        console.error('Form submission network error:', err);
        showError(errorBox, 'A network error occurred while connecting to the form service. Please use WhatsApp or email directly.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    } else {
      // Demo / Mock Mode: Clear feedback that client-side validation passed
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showSuccess(form, successBox, payload);
      }, 700);
    }
  });

  function showSuccess(form, successBox, payload) {
    form.reset();
    if (successBox) {
      successBox.classList.remove('hidden');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    showToast(`Inquiry prepared for ${payload.name}. Direct concierge active.`);
  }

  function showError(errorBox, msg) {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.classList.remove('hidden');
    }
  }
}

/**
 * Scroll Reveal Animations and Counter Animation
 */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('reveal-visible'));
  }

  // Telemetry Number Counter
  const statElements = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && statElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetNum = parseInt(el.getAttribute('data-counter'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateNumber(el, targetNum, suffix);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(el => counterObserver.observe(el));
  }
}

function animateNumber(element, target, suffix) {
  let start = 0;
  const duration = 1200;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = `${target}${suffix}`;
      clearInterval(timer);
    } else {
      element.textContent = `${Math.floor(start)}${suffix}`;
    }
  }, stepTime);
}

/**
 * Scroll to top Floating Action Button
 */
function initScrollToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Reusable Toast Notification
 */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice px-4 py-2.5 rounded-full bg-surface-container-high/90 backdrop-blur-md text-on-surface text-xs font-label-md uppercase tracking-wider border border-white/10 shadow-2xl';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
