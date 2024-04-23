// Retrieve tasks from local storage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.setAttribute('draggable', true);
        li.setAttribute('ondragstart', `dragTask(event, ${index})`);
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            <span ${task.completed ? 'style="text-decoration: line-through;"' : ''}>${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text !== '') {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Drag task
function dragTask(event, index) {
    event.dataTransfer.setData('text/plain', index);
}

// Allow drop
function allowDrop(event) {
    event.preventDefault();
}

// Drop task
function dropTask(event) {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData('text/plain');
    const toIndex = tasks.length;

    if (fromIndex !== '' && fromIndex !== toIndex) {
        const [movedTask] = tasks.splice(fromIndex, 1);
        tasks.splice(toIndex, 0, movedTask);
        renderTasks();
    }
}

// Initial render
renderTasks();
