const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

let todos = [];

// Add new todo
function addTodo() {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText.length === 0) return;
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    }
    todos.push(todo); // add the new todo to the end of the array
    todoInput.value = '';
    renderTodos();
    saveTodos();
}

// Remove todo
function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    saveTodos();
}


// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.slice().reverse().forEach(todo => { // loop through the todos in reverse order
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = !todo.completed;
            renderTodos();
            saveTodos();
        });
        const span = document.createElement('span');
        span.textContent = todo.text;
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.addEventListener('click', () => {
            removeTodo(todo.id);
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(button);
        todoList.appendChild(li);
    });
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
    }
    renderTodos();
}

loadTodos();

form.addEventListener('submit', addTodo);