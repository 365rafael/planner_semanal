const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const weekContainer = document.getElementById("week");

function saveTasks(day, tasks) {
  localStorage.setItem("planner_" + day, JSON.stringify(tasks));
}

function loadTasks(day) {
  const data = localStorage.getItem("planner_" + day);
  return data ? JSON.parse(data) : [];
}

function createDayColumn(day) {
  let tasks = loadTasks(day);

  const dayDiv = document.createElement("div");
  dayDiv.className = "day";

  const title = document.createElement("h2");
  title.innerHTML = `${day} <button class="clear-btn">🧹</button>`;
  dayDiv.appendChild(title);

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Nova tarefa...";
  dayDiv.appendChild(input);

  const addBtn = document.createElement("button");
  addBtn.textContent = "+";
  dayDiv.appendChild(addBtn);

  const ul = document.createElement("ul");
  ul.className = "task-list";
  dayDiv.appendChild(ul);

  const clearBtn = title.querySelector(".clear-btn");
  clearBtn.onclick = () => {
    tasks = [];
    saveTasks(day, tasks);
    renderTasks();
  };

  function renderTasks() {
    ul.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.text;
      if (task.done) span.classList.add("done");

      span.onclick = () => {
        task.done = !task.done;
        saveTasks(day, tasks);
        renderTasks();
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        saveTasks(day, tasks);
        renderTasks();
      };

      li.appendChild(span);
      li.appendChild(delBtn);
      ul.appendChild(li);
    });
  }

  addBtn.onclick = () => {
    if (input.value.trim()) {
      tasks.push({ text: input.value.trim(), done: false });
      input.value = "";
      saveTasks(day, tasks);
      renderTasks();
    }
  };

  renderTasks();
  weekContainer.appendChild(dayDiv);
}

days.forEach(createDayColumn);
