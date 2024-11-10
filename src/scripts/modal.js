const modalSortButton = document.querySelector('.modal-sort__button');
const modalSortBackground = document.querySelector('.modal-sort__background');
const modalSortContent = document.querySelector('.modal-sort__content');
const modalSortButtonText = modalSortButton.querySelector('.modal-sort__button-text');

function openModalSort() {
  modalSortBackground.classList.add('modal-sort__background_opened');
  modalSortContent.classList.add('modal-sort__content_opened');
  setModalEventListeners();
}

function closeModalSort() {
  modalSortBackground.classList.remove('modal-sort__background_opened');
  modalSortContent.classList.remove('modal-sort__content_opened');
  removeModalEventListeners();
}

function handleEscKeyboard(evt) {
  if (evt.code === 'Escape') {
    closeModalSort();
  }
}

function handleClick(evt) {
  if (evt.target.classList.contains('modal-sort__content-button')) {
    modalSortButtonText.textContent = evt.target.textContent;
    closeModalSort();
  }
  if (evt.target.classList.contains('modal-sort__background_opened')) {
    closeModalSort();
  }
}

function setModalEventListeners() {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleEscKeyboard);
}

function removeModalEventListeners() {
  document.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEscKeyboard);
}

modalSortButton.addEventListener('click', () => {
  openModalSort();
});
