import { catalog } from './data';

const productsCards = document.querySelector('.products__cards');
const templateCard = document.querySelector('#card');
const productsCounter = document.querySelector('.products__counter');

function generateCard(card) {
  const clone = templateCard.content.querySelector('.card').cloneNode(true);
  const cloneImage = clone.querySelector('.card__image');
  const cloneDescription = clone.querySelector('.card__description');
  const clonePrice = clone.querySelector('.card__price');
  clone.id = card.id;
  cloneImage.src = card.image;
  cloneImage.alt = card.title;
  cloneDescription.textContent = card.title;
  clonePrice.textContent = card.price;
  productsCards.append(clone);
}

function generateCards(arrayCard) {
  arrayCard.forEach(card => {
    generateCard(card);
  });
  productsCounter.textContent = `${arrayCard.length} товаров`;
}

generateCards(catalog);
