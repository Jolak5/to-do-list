/* eslint-disable no-unused-vars */
const containerElement = document.querySelector('.containerTodo');
const ulElement = document.querySelector('.ulElement');

const Task = class {
  constructor(description, completed = false, index = 0) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.tasks = [
      {
        description: 'wash the dogs',
        completed: false,
        index: 0,
      },
      {
        description: 'Complete To Do list project',
        completed: false,
        index: 1,
      },
    ];
  }

  populateField = () => {
    let i = 0;
    this.tasks.forEach((task) => {
      i += 1;
      task.index = i;
    });
    localStorage.setItem('savedTasks', JSON.stringify(this.tasks));
  };

  addTask = (newTask) => {
    this.tasks.push(newTask);
    this.populateField();
    this.showTasks();
  };

  removeTask(task) {
    const result = this.tasks.filter((b) => b !== task);
    this.tasks = result;
    this.populateField();
  }

  showTasks = () => {
    ulElement.innerHTML = '';
    this.tasks.map((task) => {
      const li = document.createElement('li');
      const itemElement = document.createElement('div');
      const checkbox = document.createElement('input');
      const checkboxContainer = document.createElement('div');
      checkboxContainer.classList.add('checkboxContainer');
      const label = document.createElement('label');
      const icon = document.createElement('div');
      const textInput = document.createElement('input');
      textInput.classList.add('textInput', 'hidden');
      icon.classList.add('iconContainer');
      itemElement.classList.add('itemElement');
      icon.innerHTML = '<i class="fas fa-trash-alt"></i>';
      const iconMenu = '<i class="fas fa-ellipsis-v"></i>';
      const iconDelete = '<i class="fas fa-trash-alt"></i>';
      textInput.value = task.description;
      checkbox.type = 'checkbox';
      checkbox.id = `check${task.index}`;
      label.innerHTML = task.description;
      checkbox.checked = task.completed;

      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
      }

      label.addEventListener('click', () => {
        label.classList.add('hidden');
        textInput.classList.remove('hidden');
        li.classList.add('editing');
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
        textInput.focus();
      });

      textInput.addEventListener('focus', () => {
        this.populateField();
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
      });

      textInput.addEventListener('change', (e) => {
        task.description = e.target.value;
        label.innerHTML = task.description;
        this.populateField();
        icon.innerHTML = iconDelete;
        icon.style.cursor = 'pointer';
      });

      textInput.addEventListener('blur', () => {
        label.classList.remove('hidden');
        textInput.classList.add('hidden');
        li.classList.remove('editing');
        setTimeout(() => {
          icon.innerHTML = iconDelete;
          icon.style.cursor = 'menu';
        }, 150);
      });

      checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
          label.style.textDecoration = 'line-through';
          task.completed = checkbox.checked;
          this.populateField();
        } else {
          label.style.textDecoration = 'none';
          task.completed = checkbox.checked;
          this.populateField();
        }
      });

      icon.addEventListener('click', () => {
        if (icon) {
          this.removeTask(task);
          ulElement.removeChild(li);
        }
      });

      li.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          checkbox.focus();
          textInput.classList.add('hidden');
          label.classList.remove('hidden');
          li.classList.remove('editing');
        }
      });

      checkboxContainer.append(checkbox, label, textInput);
      itemElement.append(checkboxContainer, icon);

      li.appendChild(itemElement);
      ulElement.appendChild(li);
      return ulElement;
    });
    containerElement.appendChild(ulElement);
    return containerElement;
  };
};

export default Task;
