const modalSortButton = document.querySelector('.modal-sort__button');
const modalSortBackground = document.querySelector('.modal-sort__background');
const modalSortContent = document.querySelector('.modal-sort__content');

modalSortButton.addEventListener('click', () => {
  modalSortBackground.classList.add('modal-sort__background_opened');
  modalSortContent.classList.add('modal-sort__content_opened');
});
