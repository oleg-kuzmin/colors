import { catalog } from './mock';
import { addToBasket } from './basket';
import { getTextForCounter } from './helpers';

const productsCards = document.querySelector('.products__cards');
const templateCard = document.querySelector('#card');
const productsCounter = document.querySelector('.products__counter');
const buttonSortExpensive = document.querySelector('#buttonSortExpensive');
const buttonSortInexpensive = document.querySelector('#buttonSortInexpensive');
const buttonSortPopular = document.querySelector('#buttonSortPopular');
const buttonSortNew = document.querySelector('#buttonSortNew');

function sortExpensive() {
  catalog.sort((a, b) => {
    return b.price - a.price;
  });
}

function sortInexpensive() {
  catalog.sort((a, b) => {
    return a.price - b.price;
  });
}

function sortPopular() {
  catalog.sort((a, b) => {
    return a.id - b.id;
  });
}

function sortNew() {
  catalog.sort((a, b) => {
    return b.id - a.id;
  });
}

function generateCard(card) {
  const clone = templateCard.content.querySelector('.card').cloneNode(true);
  const cloneImage = clone.querySelector('.card__image');
  const cloneDescription = clone.querySelector('.card__description');
  const clonePrice = clone.querySelector('.card__price');
  const cloneButton = clone.querySelector('.card__button');
  clone.id = `card-${card.id}`;
  cloneImage.src = card.image;
  cloneImage.alt = card.title;
  cloneDescription.textContent = card.title;
  clonePrice.textContent = card.price;
  cloneButton.addEventListener('click', () => {
    addToBasket(card);
  });
  productsCards.append(clone);
}

function generateCards(arrayCard) {
  const list = document.querySelectorAll('.card');
  list.forEach(element => {
    element.remove();
  });
  arrayCard.forEach(card => {
    generateCard(card);
  });
  productsCounter.textContent = getTextForCounter(arrayCard.length);
}

sortExpensive();
generateCards(catalog);

buttonSortExpensive.addEventListener('click', () => {
  console.log(catalog);
  sortExpensive();
  generateCards(catalog);
});

buttonSortInexpensive.addEventListener('click', () => {
  console.log(catalog);
  sortInexpensive();
  generateCards(catalog);
});

buttonSortPopular.addEventListener('click', () => {
  console.log(catalog);
  sortPopular();
  generateCards(catalog);
});

buttonSortNew.addEventListener('click', () => {
  console.log(catalog);
  sortNew();
  generateCards(catalog);
});
