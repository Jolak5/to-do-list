/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';
import Task from './modules/crud.js';

const objTask = new Task();
const inTask = {};

if (localStorage.savedTasks) {
  objTask.tasks = JSON.parse(localStorage.getItem('savedTasks'));
}

const all = document.querySelector('.all');
const ulElement = document.querySelector('.ulElement');
const inputElement = document.querySelector('.inputElement');
const btnCom = document.createElement('button');
btnCom.innerHTML = 'Clear all completed';
btnCom.classList.add('btnCom');

inputElement.addEventListener('change', () => {
  inTask.description = inputElement.value;
  inTask.completed = false;
  inTask.index = objTask.tasks.length;
  objTask.addTask(new Task(inTask.description, inTask.completed, inTask.index));
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    inputElement.value = '';
  }
});

btnCom.addEventListener('click', () => {
  const result = objTask.tasks.filter((task) => task.completed === false);
  objTask.tasks = result;
  objTask.populateField();
  ulElement.innerHTML = '';
  all.innerHTML = `
  <div class="title-div title">
        <p>Today's To Do</p>
        
      </div>
   
  `;
  all.append(objTask.showTasks(), btnCom);
});

objTask.showTasks();
all.append(btnCom);
