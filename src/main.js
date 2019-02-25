import makeFilter from './make-filter.js';
import makeTask from './make-task.js';
import getRandomNumber from './util.js';

const FILTERS = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];

const CardsAmount = {
  DEFAULT: 7,
  MAX: 10
};

const filtersBar = document.querySelector(`.main__filter`);
const taskBoard = document.querySelector(`.board__tasks`);

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

const renderTasks = (amount) => {
  for (let i = 0; i < amount; i++) {
    taskBoard.insertAdjacentHTML(`beforeend`, makeTask());
  }
};

renderTasks(CardsAmount.DEFAULT);

const onFiltersBarClick = (evt) => {
  let amount = document.querySelector(`.${evt.target.id}-count`).innerHTML;

  removeChildren(taskBoard);
  renderTasks(amount);
};

filtersBar.addEventListener(`click`, onFiltersBarClick);
