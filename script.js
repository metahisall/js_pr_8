// Function to load todos from Local Storage
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

// Function to save todos to Local Storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Initial load of todos from Local Storage
let todos = [];
loadTodos();

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  const text = prompt('Enter a new TODO:');
  if (text) {
    const todo = {
      id: Date.now(),
      text: text,
      checked: false,
    };
    todos.push(todo);
    render();
    updateCounter();
    saveTodos();
  }
}

function renderTodo(todo) {
  const checkedClass = todo.checked ? 'text-success text-decoration-line-through' : '';
  const checkedAttribute = todo.checked ? 'checked' : '';

  const li = document.createElement('li');
  li.className = 'list-group-item';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input me-2';
  checkbox.id = todo.id;
  checkbox.checked = todo.checked;
  checkbox.addEventListener('change', () => checkTodo(todo.id));

  const label = document.createElement('label');
  label.htmlFor = todo.id;
  
  const span = document.createElement('span');
  span.className = checkedClass;
  span.textContent = todo.text;

  label.appendChild(span);

  const button = document.createElement('button');
  button.className = 'btn btn-danger btn-sm float-end';
  button.textContent = 'delete';
  button.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);

  return li;
}

function render() {
  list.innerHTML = '';
  todos.forEach(todo => {
    list.appendChild(renderTodo(todo));
  });
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveTodos();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    updateCounter();
    saveTodos();
  }
}

// Initial render and counter update
render();
updateCounter();