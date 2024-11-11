import { catalog } from './mock';
import { addToBasket } from './basket';

const productsCards = document.querySelector('.products__cards');
const templateCard = document.querySelector('#card');
const productsCounter = document.querySelector('.products__counter');

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
  arrayCard.forEach(card => {
    generateCard(card);
  });
  productsCounter.textContent = `${arrayCard.length} товаров`;
}

generateCards(catalog);
