const titleInput = document.getElementById('title');
    const descInput = document.getElementById('description');
    const dateInput = document.getElementById('date');
    const taskList = document.getElementById('task-list');
    const statsEl = document.getElementById('stats');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
      taskList.innerHTML = '';
      let total = tasks.length;
      let completed = tasks.filter(t => t.done).length;
      let pending = total - completed;
      statsEl.innerText = `📋 Total: ${total} | ✅ Completed: ${completed} | ⏳ Pending: ${pending}`;

      tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task' + (task.done ? ' done' : '');
        taskDiv.innerHTML = `
          <strong>${task.title}</strong><br/>
          <small>${task.description}</small><br/>
          <em>${task.date}</em>
          <div class="actions">
            <span class="material-icons-outlined" onclick="toggleTask(${index})">check_circle</span>
            <span class="material-icons-outlined" onclick="deleteTask(${index})">delete</span>
          </div>
        `;
        taskList.appendChild(taskDiv);
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
      const title = titleInput.value.trim();
      const description = descInput.value.trim();
      const date = dateInput.value;

      if (!title || !date ) {
        alert('Please fill in at least Title and  Date');
        return;
      }

      tasks.push({ title, description, date, done: false });
      titleInput.value = '';
      descInput.value = '';
      dateInput.value = '';
      renderTasks();
    }

    function toggleTask(index) {
      tasks[index].done = !tasks[index].done;
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    // Theme toggle
    const icon = document.getElementById('theme-icon');
    const toggleBtn = document.getElementById('theme-toggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      icon.textContent = 'light_mode';
    } else {
      icon.textContent = 'bedtime';
    }

    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      icon.textContent = isDark ? 'light_mode' : 'bedtime';
    });

    // GSAP Animations
    window.addEventListener('DOMContentLoaded', () => {
      gsap.from('nav', { y: -30, opacity: 0, duration: 0.6 });
      gsap.from('.task-input', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 });
    });

    renderTasks();