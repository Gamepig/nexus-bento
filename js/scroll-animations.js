/**
 * scroll-animations.js
 * Intersection Observer based scroll animations
 * NexusAI Bento Redesign 2025
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    once: true
  };

  // Initialize Intersection Observer
  function initScrollAnimations() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.classList.add('animated');
      });
      return;
    }

    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');

          // Unobserve if animation should only play once
          if (config.once) {
            observer.unobserve(entry.target);
          }
        } else if (!config.once) {
          entry.target.classList.remove('animated');
        }
      });
    }, {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    });

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize stagger animations for Bento grids
  function initBentoStagger() {
    document.querySelectorAll('.bento-grid[data-animate-stagger]').forEach(grid => {
      const items = grid.querySelectorAll('.bento-item');
      items.forEach((item, index) => {
        item.style.animationDelay = `${0.1 + index * 0.05}s`;
      });
    });
  }

  // Add hover effects to glass cards
  function initCardHoverEffects() {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Parallax effect for hero background
  function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroHeight = hero.offsetHeight;

          if (scrolled < heroHeight) {
            const translateY = scrolled * 0.3;
            const opacity = 1 - (scrolled / heroHeight) * 0.5;

            hero.style.setProperty('--parallax-offset', `${translateY}px`);
            hero.style.setProperty('--parallax-opacity', opacity);
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  // Nav scroll effect
  function initNavScrollEffect() {
    const nav = document.querySelector('.glass-nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class
      if (currentScroll > 50) {
        nav.classList.add('glass-nav--scrolled');
      } else {
        nav.classList.remove('glass-nav--scrolled');
      }

      // Hide/show nav on scroll
      if (currentScroll > lastScroll && currentScroll > 200) {
        nav.classList.add('glass-nav--hidden');
      } else {
        nav.classList.remove('glass-nav--hidden');
      }

      lastScroll = currentScroll;
    });
  }

  // Button ripple effect
  function initRippleEffect() {
    document.querySelectorAll('.glass-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple styles if not present
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        .glass-btn {
          position: relative;
          overflow: hidden;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Counter animation
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-counter'), 10);
          const duration = parseInt(counter.getAttribute('data-duration') || '2000', 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';

          animateCounter(counter, target, duration, prefix, suffix);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element, target, duration, prefix, suffix) {
    let current = 0;
    const increment = target / (duration / 16);
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-quad)
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      current = Math.floor(easeProgress * target);

      element.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // Toast notification system
  window.showToast = function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type} glass-card`;
    toast.innerHTML = `
      <span class="toast__message">${message}</span>
      <button class="toast__close">&times;</button>
    `;

    // Add styles if not present
    if (!document.querySelector('#toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .toast {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 250px;
          max-width: 400px;
        }
        .toast__message {
          flex: 1;
        }
        .toast__close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .toast__close:hover {
          opacity: 1;
        }
        .toast--success { border-left: 4px solid #22c55e; }
        .toast--error { border-left: 4px solid #ef4444; }
        .toast--warning { border-left: 4px solid #f59e0b; }
        .toast--info { border-left: 4px solid #6366f1; }
      `;
      document.head.appendChild(style);
    }

    // Get or create container
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    container.appendChild(toast);

    // Close handlers
    const closeToast = () => {
      toast.classList.add('closing');
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast__close').addEventListener('click', closeToast);

    if (duration > 0) {
      setTimeout(closeToast, duration);
    }

    return toast;
  };

  // Initialize all animations
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    initScrollAnimations();
    initBentoStagger();
    initCardHoverEffects();
    initSmoothScroll();
    initParallax();
    initNavScrollEffect();
    initRippleEffect();
    initCounterAnimation();

    // Mark page as loaded
    document.body.classList.add('page-loaded');
  }

  // Start initialization
  init();

})();
