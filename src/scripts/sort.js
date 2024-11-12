import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';

const sortButton = document.querySelector('.sort__button');
const sortContent = document.querySelector('.sort__content');
const sortButtonText = sortButton.querySelector('.sort__button-text');
const sortContentButtons = document.querySelectorAll('.sort__content-button');

function openSort() {
  openWrapperBackground();
  sortContent.classList.add('sort__content_opened');
  setSortEventListeners();
}

function closeSort() {
  closeWrapperBackground();
  sortContent.classList.remove('sort__content_opened');
  removeSortEventListeners();
}

function handleScroll() {
  closeSort();
}

function handleEscKeyboard(evt) {
  if (evt.code === 'Escape') {
    closeSort();
  }
}

function handleClick(evt) {
  if (evt.target.classList.contains('sort__content-button')) {
    sortContentButtons.forEach(button => {
      button.classList.remove('sort__content-button_active');
    });
    evt.target.classList.add('sort__content-button_active');
    sortButtonText.textContent = evt.target.textContent;
  }
  closeSort();
}

function setSortEventListeners() {
  setTimeout(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscKeyboard);
    document.addEventListener('scroll', handleScroll);
  }, 0);
}

function removeSortEventListeners() {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEscKeyboard);
  document.removeEventListener('scroll', handleScroll);
}

sortButton.addEventListener('click', () => {
  openSort();
});
