    const display = document.getElementById('display');
    const preview = document.getElementById('preview');
    

    function appendNumber(num) {
      display.value += num;
      livePreview();
    }

    function appendOperator(op) {
      const lastChar = display.value.slice(-1);
      if ('+-*/%'.includes(lastChar)) return;
      display.value += op;
      preview.textContent = '';
    }

    function clearDisplay() {
      display.value = '';
      preview.textContent = '';
    }

    function deleteLast() {
      display.value = display.value.slice(0, -1);
      livePreview();
    }

    function calculate() {
      try {
        display.value = eval(display.value);
        preview.textContent = '';
      } catch {
        display.value = 'Error';
        preview.textContent = '';
      }
    }

    function livePreview() {
  try {
    const result = eval(display.value);
    if (display.value !== '' && result !== undefined) {
      preview.textContent = '= ' + result;
      preview.style.opacity = '0.85';
      preview.style.transform = 'translateY(0)';
    } else {
      preview.textContent = '';
      preview.style.opacity = '0';
      preview.style.transform = 'translateY(4px)';
    }
  } catch {
    preview.textContent = '';
    preview.style.opacity = '0';
  }
}

    

    // Animate with GSAP
    window.addEventListener('DOMContentLoaded', () => {
      gsap.from("nav", { y: -30, opacity: 0, duration: 0.6 });
      gsap.from(".calculator", { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power2.out" });
      gsap.from(".buttons button", {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        delay: 0.6
      });
    });

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
