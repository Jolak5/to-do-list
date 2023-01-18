/* eslint-disable no-plusplus */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import './style.css';

const arr = [
  {
    description: 'was the dishes',
    completed: true,
    index: 1,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 2,
  },
];

const list = document.querySelector('ul');
function createList() {
  list.insertAdjacentHTML(
    'afterbegin',
    ' <hr > <div class="single-list"><div class="li-div"> <input type="checkbox" name="check" value="checkbox"> <li class="list-item"> </div><img src="/dots.svg" alt=""><i class="fa-solid fa-ellipsis-vertical fa-2x"></i></div>',
  );
}

for (let i = 1; i >= 0; i--) {
  createList();
  const listItem = document.querySelector('.list-item');

  listItem.textContent = arr[i].description;
}
