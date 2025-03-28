document.addEventListener('DOMContentLoaded', function() {
  // Initialize Swiper for testimonials
  const testimonialSwiper = new Swiper('.testimonials-slider', {
    spaceBetween: 30,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });

  // Platform tabs functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to current button and panel
      button.classList.add('active');
      document.querySelector(`.tab-panel[data-tab="${tabId}"]`).classList.add('active');
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.createElement('div');
  mobileNav.classList.add('mobile-nav');
  
  // Clone the nav and actions for mobile
  const mainNav = document.querySelector('.main-nav').cloneNode(true);
  const headerActions = document.querySelector('.header-actions').cloneNode(true);
  headerActions.classList.add('mobile-actions');
  
  mobileNav.appendChild(mainNav);
  mobileNav.appendChild(headerActions);
  document.body.appendChild(mobileNav);
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });

  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.to(text, {
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        onEnter: () => text.classList.add('revealed')
      }
    });
  });

  gsap.utils.toArray('.reveal-card').forEach(card => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        onEnter: () => card.classList.add('revealed')
      }
    });
  });

  // Staggered animations for lists
  gsap.utils.toArray('.stagger-children').forEach(container => {
    const children = container.children;
    
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        onEnter: () => {
          Array.from(children).forEach(child => {
            child.classList.add('visible');
          });
        }
      }
    });
  });

  // Create placeholder for images (would normally be replaced with real images)
  const placeholderImg = document.createElement('img');
  placeholderImg.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300"%3E%3Crect fill="%236C757D" width="500" height="300"/%3E%3Ctext fill="%23DEE2E6" font-family="sans-serif" font-size="30" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EPlaceholder%3C/text%3E%3C/svg%3E';
  placeholderImg.alt = 'Placeholder Image';
  
  document.querySelectorAll('.hero-image img, .tab-image img').forEach(img => {
    img.src = placeholderImg.src;
  });
});