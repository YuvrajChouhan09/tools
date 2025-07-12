  const icon = document.getElementById('theme-icon');
  const toggleBtn = document.getElementById('theme-toggle');

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    icon.textContent = 'light_mode';
  } else {
    document.body.classList.remove('dark');
    icon.textContent = 'bedtime';
  }

  // Toggle and save
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.textContent = isDark ? 'light_mode' : 'bedtime';
  });


    // GSAP Animations
    window.addEventListener('load', () => {
      gsap.from("#title", {
        duration: 1,
        y: -30,
        opacity: 0,
        ease: "power2.out"
      });

      gsap.from("#subtitle", {
        duration: 1.2,
        y: -10,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out"
      });

      gsap.to(".card", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    });
