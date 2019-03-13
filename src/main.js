import makeFilter from './make-filter.js';
import getRandomNumber from './util.js';
import getTask from './get-task.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';

const FILTERS = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

const CardsAmount = {
  DEFAULT: 7,
  MAX: 10
};

const filtersBar = document.querySelector(`.main__filter`);
const taskBoard = document.querySelector(`.board__tasks`);
const task = new Task(getTask());
const editTask = new TaskEdit(getTask());

const removeChildren = (parent) => {
  parent.innerHTML = ``;
};

removeChildren(filtersBar);
removeChildren(taskBoard);

const renderFilters = () => {
  for (const filter of FILTERS) {
    filtersBar.insertAdjacentHTML(`beforeend`, makeFilter(filter, getRandomNumber(0, CardsAmount.MAX)));
  }
};

renderFilters();
taskBoard.appendChild(task.render());

task.onEdit = () => {
  editTask.render();
  taskBoard.replaceChild(editTask.element, task.element);
  task.unrender();
};

editTask.onSubmit = () => {
  task.render();
  taskBoard.replaceChild(task.element, editTask.element);
  editTask.unrender();
};
