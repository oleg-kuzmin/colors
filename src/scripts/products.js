import { catalog } from './mock';
import { getTextForCounter } from './helpers';

export const productsCards = document.querySelector('.products__cards');
const templateCard = document.querySelector('#card');
const productsCounter = document.querySelector('.products__counter');
const buttonSortExpensive = document.querySelector('#buttonSortExpensive');
const buttonSortInexpensive = document.querySelector('#buttonSortInexpensive');
const buttonSortPopular = document.querySelector('#buttonSortPopular');
const buttonSortNew = document.querySelector('#buttonSortNew');

function sortExpensive() {
  const array = Array.from(document.querySelectorAll('.card'));
  array.sort((a, b) => {
    return b.querySelector('.card__price').textContent - a.querySelector('.card__price').textContent;
  });
  array.forEach(item => {
    productsCards.append(item);
  });
}

function sortInexpensive() {
  const array = Array.from(document.querySelectorAll('.card'));
  array.sort((a, b) => {
    return a.querySelector('.card__price').textContent - b.querySelector('.card__price').textContent;
  });
  array.forEach(item => {
    productsCards.append(item);
  });
}

function sortPopular() {
  const array = Array.from(document.querySelectorAll('.card'));
  array.sort((a, b) => {
    const idA = +a.id.split('-')[1];
    const idB = +b.id.split('-')[1];
    return idA - idB;
  });
  array.forEach(item => {
    productsCards.append(item);
  });
}

function sortNew() {
  const array = Array.from(document.querySelectorAll('.card'));
  array.sort((a, b) => {
    const idA = +a.id.split('-')[1];
    const idB = +b.id.split('-')[1];
    return idB - idA;
  });
  array.forEach(item => {
    productsCards.append(item);
  });
}

function generateCard(card) {
  const clone = templateCard.content.querySelector('.card').cloneNode(true);
  const cloneImage = clone.querySelector('.card__image');
  const cloneDescription = clone.querySelector('.card__description');
  const clonePrice = clone.querySelector('.card__price');
  clone.id = `card-${card.id}`;
  cloneImage.src = card.image;
  cloneImage.alt = card.title;
  cloneDescription.textContent = card.title;
  clonePrice.textContent = card.price;
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

generateCards(catalog);
sortExpensive();

buttonSortExpensive.addEventListener('click', () => {
  sortExpensive();
});

buttonSortInexpensive.addEventListener('click', () => {
  sortInexpensive();
});

buttonSortPopular.addEventListener('click', () => {
  sortPopular();
});

buttonSortNew.addEventListener('click', () => {
  sortNew();
});
