/**
 * 成长知识库 - 公共脚本
 */

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // Navigation
  // ========================================
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

  // Scroll effect for navbar
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Hamburger menu toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      if (mobileNavOverlay) {
        mobileNavOverlay.classList.toggle('open');
        mobileNavOverlay.style.display = mobileNavOverlay.classList.contains('open') ? 'block' : 'none';
      }
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on overlay click
    if (mobileNavOverlay) {
      mobileNavOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileNavOverlay.classList.remove('open');
        setTimeout(() => { mobileNavOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
      });
    }

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        if (mobileNavOverlay) {
          mobileNavOverlay.classList.remove('open');
          setTimeout(() => { mobileNavOverlay.style.display = 'none'; }, 300);
        }
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // Tab Component
  // ========================================
  document.querySelectorAll('.tabs').forEach(function (tabContainer) {
    const buttons = tabContainer.querySelectorAll('.tab-btn');
    const panels = tabContainer.querySelectorAll('.tab-panel');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-tab');

        // Deactivate all
        buttons.forEach(function (b) { b.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });

        // Activate selected
        btn.classList.add('active');
        const targetPanel = tabContainer.querySelector('[data-tab-panel="' + target + '"]');
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  });

  // ========================================
  // Accordion / Collapsible
  // ========================================
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item = header.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      // Optional: close siblings (single open mode)
      const accordion = item.closest('.accordion');
      if (accordion && accordion.hasAttribute('data-single')) {
        accordion.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const openBody = openItem.querySelector('.accordion-body');
            if (openBody) openBody.style.maxHeight = '0';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        if (body) body.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Initialize open accordion items
  document.querySelectorAll('.accordion-item.open').forEach(function (item) {
    const body = item.querySelector('.accordion-body');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  });

  // ========================================
  // Back to Top Button
  // ========================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  // Smooth scroll for anchor links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // Intersection Observer for animations
  // ========================================
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

});
