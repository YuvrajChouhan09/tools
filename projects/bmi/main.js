
  // GSAP Animation
  window.addEventListener('DOMContentLoaded', () => {
    gsap.from("nav", { y: -30, opacity: 0, duration: 0.6 });
    gsap.from(".calculator", { y: 50, opacity: 0, duration: 1, delay: 0.2, ease: "power2.out" });
    gsap.from(".input-group, .calculate-btn", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      delay: 0.4
    });

    // Show last saved BMI on load
    const last = localStorage.getItem("lastBMI");
    if (last) {
      const data = JSON.parse(last);
    }
  });

  // Theme Toggle
  const icon = document.getElementById('theme-icon');
  const toggleBtn = document.getElementById('theme-toggle');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    icon.textContent = 'light_mode';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    icon.textContent = isDark ? 'light_mode' : 'bedtime';
  });

  // BMI Calculator + Save to localStorage
  function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const result = document.getElementById('result');

    if (!height || !weight || height <= 0 || weight <= 0) {
      result.textContent = "Please enter valid values.";
      result.className = "result";
      return;
    }

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let message = "", className = "", category = "";

    if (bmi < 18.5) {
      message = `Your BMI is ${bmi} (Underweight)`;
      className = "underweight";
      category = "Underweight";
    } else if (bmi < 24.9) {
      message = `Your BMI is ${bmi} (Normal weight)`;
      className = "normal";
      category = "Normal weight";
    } else if (bmi < 29.9) {
      message = `Your BMI is ${bmi} (Overweight)`;
      className = "overweight";
      category = "Overweight";
    } else {
      message = `Your BMI is ${bmi} (Obese)`;
      className = "obese";
      category = "Obese";
    }

    result.textContent = message;
    result.className = `result ${className}`;

    // Save to localStorage
    const bmiData = {
      value: bmi,
      category: category,
      className: className,
      date: new Date().toLocaleString()
    };
    localStorage.setItem("lastBMI", JSON.stringify(bmiData));
  }