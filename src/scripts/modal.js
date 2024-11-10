import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';

const modalSortButton = document.querySelector('.modal-sort__button');
const modalSortContent = document.querySelector('.modal-sort__content');
const modalSortButtonText = modalSortButton.querySelector('.modal-sort__button-text');
const modalSortContentButtons = document.querySelectorAll('.modal-sort__content-button');

function openModalSort() {
  openWrapperBackground();
  modalSortContent.classList.add('modal-sort__content_opened');
  setModalEventListeners();
}

function closeModalSort() {
  closeWrapperBackground();
  modalSortContent.classList.remove('modal-sort__content_opened');
  removeModalEventListeners();
}

function handleScroll() {
  closeModalSort();
}

function handleEscKeyboard(evt) {
  if (evt.code === 'Escape') {
    closeModalSort();
  }
}

function handleClick(evt) {
  if (evt.target.classList.contains('modal-sort__content-button')) {
    modalSortContentButtons.forEach(button => {
      button.classList.remove('modal-sort__content-button_active');
    });
    evt.target.classList.add('modal-sort__content-button_active');
    modalSortButtonText.textContent = evt.target.textContent;
  }
  closeModalSort();
}

function setModalEventListeners() {
  setTimeout(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscKeyboard);
    document.addEventListener('scroll', handleScroll);
  }, 0);
}

function removeModalEventListeners() {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEscKeyboard);
  document.removeEventListener('scroll', handleScroll);
}

modalSortButton.addEventListener('click', () => {
  openModalSort();
});
