let todoArray = [];
let filteredArray = [];

const addBtn = document.querySelector('.add-btn');
const inputBox = document.getElementById('create-task');
const todoTasks = document.querySelector('.todo-tasks-wrap');
const itemsLeft = document.querySelector('.items-left');

// theme switching
const themeCont = document.querySelector('.img-container');
const themeImg = document.querySelector('.theme-img');

// sorting buttons
const sortBtns = document.querySelectorAll('.sort-btn');
const allBtn = document.querySelector('.sort-all');
const activeBtn = document.querySelector('.sort-active');
const completedBtn = document.querySelector('.sort-completed');
const clearBtn = document.querySelector('.clear-completed');

// modal variables
const deleteTasksBtn = document.querySelector('.delete-btn');
const cancelDeletingBtn = document.querySelector('.cancel-btn');
const modalMessage = document.querySelector('.modal-message');
const alertWrap = document.querySelector('.alert-wrap');


// add new task to todotasks
function createTask(item) {
  // let tasks = [...todoTasks.querySelectorAll('.todo-task')];

  let newTask = document.createElement('div');
  newTask.setAttribute('data-id', item.id);
  newTask.setAttribute('draggable', true);
  newTask.classList.add('todo-task', 'flex');

  if (item.completed === true) {
    newTask.classList.add('completed');
  }

  newTask.innerHTML = `
    <button class="task-btn circle ${item.completed && 'checked'} flex" aria-label="Mark task as complete" data-id="${item.id}">
      <img src="${item.completed ? 'images/icon-check.svg' : ''}" alt="${item.completed ? 'check icon' : ''}" class="check-img">
    </button>
    <p class="task">${item.value}</p>
    <button class="delete-task" aria-label="delete task" data-id="${item.id}">
      <img src="images/icon-cross.svg" alt="cross icon" class="check-img">
    </button>
  `;

  todoTasks.appendChild(newTask);
  createCheckEvent(newTask);
  createDeleteEvent(newTask);
  setItemsLeft();
  newTask.addEventListener('dragstart', dragstart_handler);
  newTask.addEventListener('dragend', (ev) => {
    ev.target.classList.remove('dragging');
  });
  localStorage.setItem('myTasks', JSON.stringify(todoArray));
}

function createCheckEvent(container) {
  let btn = container.querySelector('.task-btn');
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('checked')) {
          btn.classList.add('checked');
          btn.firstElementChild.src = 'images/icon-check.svg';
          btn.firstElementChild.alt = 'check icon';
          btn.parentElement.classList.add('completed');
          setCompleted(btn);
          setItemsLeft();
        } else {
          btn.classList.remove('checked');
          btn.firstElementChild.src = '';
          btn.firstElementChild.alt = '';
          btn.parentElement.classList.remove('completed');
          setUncompleted(btn);
          setItemsLeft();
        }
    });
}

function setCompleted(btn) {
  // get attribute returns a string, convert to number
  let id = parseInt(btn.getAttribute('data-id'));

  todoArray.forEach(item => {
    if (item.id === id) {
      item.completed = true;
    }
  });

  localStorage.setItem('myTasks', JSON.stringify(todoArray));
}

function setUncompleted(btn) {
  // get attribute returns a string, convert to number
  let id = parseInt(btn.getAttribute('data-id'));

  todoArray.forEach(item => {
    if (item.id === id) {
      item.completed = false;
    }
  });

  localStorage.setItem('myTasks', JSON.stringify(todoArray));
}

// adding event listeners for deleting tasks
function createDeleteEvent(container) {
  const deleteBtn = container.querySelector('.delete-task');

  deleteBtn.addEventListener('click', () => {
    let element = deleteBtn.parentElement;

    todoArray.forEach(item => {
      if (item.id == deleteBtn.getAttribute('data-id')) {
        const index = todoArray.indexOf(item);
        todoArray.splice(index, 1);
        todoTasks.removeChild(element);
        localStorage.setItem('myTasks', JSON.stringify(todoArray));
        setItemsLeft();
      }
    });    
  });
}

function inputReset() {
  inputBox.value = '';
  addBtn.classList.remove('checked');
  addBtn.firstElementChild.src = '';
  addBtn.firstElementChild.alt = '';
}

// items left
function setItemsLeft() {
  const checkBtn = document.querySelectorAll('.task-btn');
  let remaining = 0;

  checkBtn.forEach(btn => {
    if (!btn.classList.contains('checked')) {
      remaining++;
    }
  });

  itemsLeft.textContent = remaining;
}

inputBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    let newItem = {
      value: inputBox.value,
      completed: false,
      id: todoArray.length + 1
    }
    todoArray.push(newItem);
    createTask(newItem);
    inputBox.value = '';
  }
});

// *** sorting buttons logic ***
function removeActive() {
  sortBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
    }
  });
}

allBtn.addEventListener('click', () => {
  removeActive();
  allBtn.classList.add('active');

  let tasks = [...todoTasks.querySelectorAll('.todo-task')];

  tasks.forEach(task => {
    todoTasks.removeChild(task);
  });

  todoArray.forEach(item => {
    createTask(item);
  });
})

activeBtn.addEventListener('click', () => {
  removeActive();
  activeBtn.classList.add('active');

  let tasks = [...todoTasks.querySelectorAll('.todo-task')];

  tasks.forEach(task => {
    todoTasks.removeChild(task);
  });

  todoArray.forEach(item => {
    if (item.completed === false) {
      createTask(item);
    }
  });
});

completedBtn.addEventListener('click', () => {
  removeActive();
  completedBtn.classList.add('active');

  let tasks = [...todoTasks.querySelectorAll('.todo-task')];

  tasks.forEach(task => {
    todoTasks.removeChild(task);
  });

  todoArray.forEach(item => {
    if (item.completed === true) {
      createTask(item);
    }
  });

  setItemsLeft();
});

// *** clearing completed tasks ***
clearBtn.addEventListener('click', () => {

  let completed = 0;

  // remove completed items from the todo array
  const newArray = todoArray.filter(item => {
    if (item.completed === false) {
      return item;
    } else {
      completed++;
    }
  });

  if (completed === 0) {
    return;
  }

  // store filtered array globally to use in delete button if needed
  filteredArray = newArray;
  modalMessage.textContent = `Are you sure you want to delete ${completed} ${completed > 1 ? 'tasks': 'task'}?`
  alertWrap.classList.add('visible');

});

deleteTasksBtn.addEventListener('click', () => {
  todoArray = filteredArray;
  // store new array after removing completed tasks
  localStorage.setItem('myTasks', JSON.stringify(todoArray));

  let tasks = [...todoTasks.querySelectorAll('.todo-task')];
  tasks.forEach(task => {
    if (task.classList.contains('completed')) {
      todoTasks.removeChild(task);
    }
  });

  alertWrap.classList.remove('visible');
});

cancelDeletingBtn.addEventListener('click', () => {
  alertWrap.classList.remove('visible');
});

// *** adding a new task ***

addBtn.addEventListener('click', () => {
  if (!addBtn.classList.contains('checked')) {
    addBtn.classList.add('checked');
    addBtn.firstElementChild.src = 'images/icon-check.svg';
    addBtn.firstElementChild.alt = 'check icon';
    createTask(inputBox.value);
    inputReset();
  } else {
    addBtn.classList.remove('checked');
    addBtn.firstElementChild.src = '';
    addBtn.firstElementChild.alt = '';
  }
});

// *** theme toggle ***
function updateTheme() {
  let theme = localStorage.getItem('theme-preference');

  if (theme === 'light-theme') {
    updateLightTheme();
  } else if (theme === 'dark-theme') {
    updateDarkTheme();
  }
}

function updateLightTheme() {
  document.body.classList.add('light-theme');
  document.body.classList.remove('dark-theme');
  themeImg.src = 'images/icon-moon.svg';
  themeImg.alt = 'moon icon';
  themeImg.ariaLabel = 'toggle to dark theme';
  localStorage.setItem('theme-preference', 'light-theme');
}

function updateDarkTheme() {
  document.body.classList.remove('light-theme');
  document.body.classList.add('dark-theme');
  themeImg.src = 'images/icon-sun.svg';
  themeImg.alt = 'sun icon';
  themeImg.ariaLabel = 'toggle to light theme';
  localStorage.setItem('theme-preference', 'dark-theme');
}

themeCont.addEventListener('click', () => {
  if (document.body.classList.contains('light-theme')) {
    updateDarkTheme();
  } else {
    updateLightTheme();
  }
});

// *** dragging functionality ***

todoTasks.addEventListener('dragover', dragover_handler);
todoTasks.addEventListener('drop', drop_handler);

function dragstart_handler(ev) {
  ev.dataTransfer.setData('text/plain', ev.target.dataset.id);
  ev.target.classList.add('dragging');
  ev.dataTransfer.effectAllowed = "move";
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";


  let y = ev.clientY;

  let afterElement = findAfterElement(todoTasks, y);
  const currentElement = ev.dataTransfer.getData('text/plain');

  // if there's no after element, append dragging element to bottom of the container
  if (afterElement === null) {
    todoTasks.appendChild(currentElement);
  } else {
    // places dragging element before element most directly after it
    todoTasks.insertBefore(todoTasks.querySelector(`[data-id="${currentElement}"]`), afterElement);
  }
}

// determine which element is most directly after the current mouse position
function findAfterElement(container, yPos) {

  const todos = [...container.querySelectorAll('.todo-task:not(.dragging)')];
  
  return todos.reduce((closest, current) => {
    // get dimensions of current element being iterated over
    const element = current.getBoundingClientRect();

    // find offset between cursor and horizontal-center of the element
    const offset = yPos - element.top - element.height / 2;

    // the closer the element's offset is to 0, the closer it is to its center
    if (offset < 0 && offset > closest.offset) {
      // if the element's offset is closer than the original closest, it becomes the new closest element
      return { offset: offset, element: current }
    } else {
      return closest;
    }

  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function drop_handler(ev) {
  ev.preventDefault();
}

window.addEventListener('load', () => {
  let tasks = JSON.parse(localStorage.getItem('myTasks'));
  updateTheme();

  if (tasks.length !== 0) {
    todoArray = tasks;
    tasks.forEach(task => {
      createTask(task);
    });
    
    const todos = [...todoTasks.querySelectorAll('.todo-task')];

    todos.forEach(todo => {
      todo.addEventListener('dragstart', dragstart_handler);
      todo.addEventListener('dragend', (ev) => {
        ev.target.classList.remove('dragging');
      });
    });

    todoTasks.addEventListener('dragover', dragover_handler);
    todoTasks.addEventListener('drop', drop_handler);
  }
});  