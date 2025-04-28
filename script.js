document.addEventListener("DOMContentLoaded", function() {
    // ===== COUNTDOWN TIMER =====
    function startCountdown() {
      // Get countdown elements
      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');
  
      // Check if elements exist
      if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error("Countdown elements missing!");
        return;
      }
  
      // Set end time (7 days from now)
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
  
      function updateTimer() {
        const now = new Date();
        const diff = endDate - now;
  
        // Calculate time remaining
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        // Update display
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
  
        // Stop when time expires
        if (diff <= 0) {
          clearInterval(timer);
          daysEl.textContent = '00';
          hoursEl.textContent = '00';
          minutesEl.textContent = '00';
          secondsEl.textContent = '00';
          
          // Optional: Add expired message
          const countdownTitle = document.querySelector('.deal-countdown h4');
          if (countdownTitle) {
            countdownTitle.textContent = "Offer Expired!";
          }
        }
      }
  
      // Run immediately and then every second
      updateTimer();
      const timer = setInterval(updateTimer, 1000);
    }
  
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenu = document.getElementById("mobile-menu");
    const nav = document.getElementById("nav");
    const menuIcon = mobileMenu?.querySelector("i");
  
    function toggleMenu() {
      const isExpanded = nav.classList.toggle("active");
      if (mobileMenu && menuIcon) {
        mobileMenu.setAttribute("aria-expanded", isExpanded);
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-times");
      }
    }
  
    if (mobileMenu) {
      mobileMenu.addEventListener("click", toggleMenu);
      mobileMenu.setAttribute("aria-label", "Toggle navigation menu");
      mobileMenu.setAttribute("aria-controls", "nav");
    }
  
    // Close menu when clicking a nav link
    document.addEventListener("click", function(e) {
      if (e.target.closest("nav ul li a")) {
        nav.classList.remove("active");
        if (mobileMenu && menuIcon) {
          mobileMenu.setAttribute("aria-expanded", "false");
          menuIcon.classList.remove("fa-times");
          menuIcon.classList.add("fa-bars");
        }
      }
    });
  
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById("back-to-top");
  
    function handleScroll() {
      if (backToTop) {
        const show = window.scrollY > 300;
        backToTop.classList.toggle("active", show);
        backToTop.setAttribute("aria-hidden", !show);
      }
    }
  
    window.addEventListener("scroll", function() {
      clearTimeout(window.scrollTimer);
      window.scrollTimer = setTimeout(handleScroll, 100);
    }, { passive: true });
  
    if (backToTop) {
      backToTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.blur();
      });
    }
  
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        const header = document.querySelector("header");
  
        if (target && header) {
          e.preventDefault();
          const offset = header.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
  
          setTimeout(() => target.focus(), 600);
        }
      });
    });
  
    // ===== FADE-IN ANIMATIONS =====
    const fadeElements = document.querySelectorAll(".fade-in");
  
    if (fadeElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });
  
      fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
      });
    }
  
    // ===== CART COUNT =====
    const cartCount = document.querySelector(".cart-count");
  
    function updateCartCount() {
      if (cartCount) {
        const count = localStorage.getItem("cartCount") || 0;
        cartCount.textContent = count;
        cartCount.setAttribute("aria-live", "polite");
      }
    }
  
    // Initialize everything
    startCountdown();
    updateCartCount();
    handleScroll(); // Run once to set initial state
  });