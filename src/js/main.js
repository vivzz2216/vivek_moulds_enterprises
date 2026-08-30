document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Set active nav link
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(link => {
    // Basic active state setting
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/index.html')) {
      link.classList.add('active');
    }
  });

  // Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Basic Form Validation (Contact Page)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple visual feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your enquiry. We will get back to you shortly.');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // ReactBits Inspired: Reveal on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      
      // If the revealed element contains count-up elements, trigger them
      const countUpElements = entry.target.querySelectorAll('.count-up');
      countUpElements.forEach(el => {
        if (!el.classList.contains('counted')) {
          startCountUp(el);
          el.classList.add('counted'); // Ensure it only runs once
        }
      });
      
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // ReactBits Inspired: CountUp Logic
  function startCountUp(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const fps = 60;
    const steps = duration / (1000 / fps);
    const increment = target / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = Math.ceil(current);
      }
    }, 1000 / fps);
  }

  // ==========================================
  // ReactBits Inspired Component Logic
  // ==========================================

  // 1. BlurText
  const blurTexts = document.querySelectorAll('.blur-text');
  blurTexts.forEach(title => {
    const text = title.innerText;
    title.innerText = '';
    const words = text.split(' ');
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.innerText = word + ' '; // keep space
      span.className = 'blur-word';
      // Stagger the animation delay based on index
      span.style.animationDelay = `${index * 0.15}s`;
      title.appendChild(span);
    });
  });

  // 2. Spotlight Card
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Tilt Card (3D Hover)
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation. Max rotation is 15 degrees.
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      // Add a transition just for resetting
      card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      // Remove transition so it tracks mouse instantly
      card.style.transition = 'none';
    });
  });

});
