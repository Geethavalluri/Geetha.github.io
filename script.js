const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

// Load tasks from local storage on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".todo-item").forEach(item => {
    tasks.push({
      text: item.querySelector("span").textContent,
      completed: item.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  renderTask(taskText, false);
  taskInput.value = "";
  saveTasks();
}

function renderTask(text, completed) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}
