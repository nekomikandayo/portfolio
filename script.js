document.addEventListener("DOMContentLoaded", function () {
  
  /* -----------------------------------------------
     1. Scroll Animation (Intersection Observer)
     ----------------------------------------------- */
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15 // 15%見えたら発火
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // 一度表示したら監視をやめる（パフォーマンス向上）
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll(".fade-up");
  elements.forEach(el => observer.observe(el));


  /* -----------------------------------------------
     2. Dynamic Header (Glass Effect on Scroll)
     ----------------------------------------------- */
  const header = document.getElementById("header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  /* -----------------------------------------------
     3. Smooth Scroll for Anchor Links
        (Optional: standard CSS scroll-behavior is usually enough,
         but this ensures cross-browser compatibility)
     ----------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Headerの高さ分ずらす計算
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

});
