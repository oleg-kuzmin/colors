import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';
import { addProductCardToDom } from './section';
import { sortButton, sortContent, sortButtonText, sortContentButtons } from './variables';

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
    domSort(evt.target.textContent);
  }
  closeSort();
}

export function domSort(textContent) {
  switch (textContent.toLowerCase()) {
    case 'сначала дорогие':
      sortExpensive();
      break;
    case 'сначала недорогие':
      sortInexpensive();
      break;
    case 'сначала популярные':
      sortPopular();
      break;
    case 'сначала новые':
      sortNew();
      break;
    default:
      sortButtonText.textContent = 'сначала дорогие';
      sortExpensive();
      break;
  }
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

function sortExpensive() {
  const arrayProductCards = Array.from(document.querySelectorAll('.card'));
  arrayProductCards.sort((a, b) => {
    return b.querySelector('.card__price').textContent - a.querySelector('.card__price').textContent;
  });
  arrayProductCards.forEach(productCard => {
    addProductCardToDom(productCard);
  });
}

function sortInexpensive() {
  const arrayProductCards = Array.from(document.querySelectorAll('.card'));
  arrayProductCards.sort((a, b) => {
    return a.querySelector('.card__price').textContent - b.querySelector('.card__price').textContent;
  });
  arrayProductCards.forEach(productCard => {
    addProductCardToDom(productCard);
  });
}

function sortPopular() {
  const arrayProductCards = Array.from(document.querySelectorAll('.card'));
  arrayProductCards.sort((a, b) => {
    const idA = +a.id.split('-')[1];
    const idB = +b.id.split('-')[1];
    return idA - idB;
  });
  arrayProductCards.forEach(productCard => {
    addProductCardToDom(productCard);
  });
}

function sortNew() {
  const arrayProductCards = Array.from(document.querySelectorAll('.card'));
  arrayProductCards.sort((a, b) => {
    const idA = +a.id.split('-')[1];
    const idB = +b.id.split('-')[1];
    return idB - idA;
  });
  arrayProductCards.forEach(productCard => {
    addProductCardToDom(productCard);
  });
}
