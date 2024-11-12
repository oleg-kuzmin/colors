import {
  containerProductsCards,
  buttonBasket,
  containerBasketCards,
  basketCounterValue,
  basketTotalPrice,
} from './variables';
import { createError, createPreloader, getTextForProductCounter } from './helpers';
import { createBasketCard } from './basket';

export function patchProductCards(basket) {
  basket.forEach(element => {
    patchProductCard(element);
  });
}

export function patchProductCard(card) {
  const productCard = document.querySelector(`#card-${card.id}`);
  if (productCard) {
    const productCardCounter = productCard.querySelector('.card__counter');
    productCardCounter.textContent = card.counter;
    if (card.isDeleted) {
      productCardCounter.classList.add('card__counter_disabled');
    } else {
      productCardCounter.classList.remove('card__counter_disabled');
    }
  }
}

export function patchBasketInfo(basket) {
  let counter = 0;
  let totalPrice = 0;
  basket.forEach(card => {
    if (!card.isDeleted) {
      counter += card.counter;
      totalPrice += card.price * card.counter;
    }
  });
  buttonBasket.textContent = counter;
  basketCounterValue.textContent = getTextForProductCounter(counter);
  basketTotalPrice.textContent = totalPrice;
}

export function clearBasketCards() {
  const list = document.querySelectorAll('.basket-card');
  list.forEach(element => {
    element.remove();
  });
}

export function addBasketCardToDom(basketCard) {
  containerBasketCards.append(basketCard);
}

export function patchBasketCards(basket) {
  clearBasketCards();
  basket.forEach(element => {
    const newBasketCard = createBasketCard(element);
    addBasketCardToDom(newBasketCard);
  });
  localStorage.setItem('basket', JSON.stringify(basket));
}

export function addProductCardToDom(newProductCard) {
  containerProductsCards.append(newProductCard);
}

export function clearProductCards() {
  const list = document.querySelectorAll('.card');
  list.forEach(element => {
    element.remove();
  });
}

export function addErrorGetProductsToDom() {
  const errorElement = createError();
  containerProductsCards.append(errorElement);
}

export function removeErrorGetProductsToDom() {
  const errorElement = containerProductsCards.querySelector('h3');
  if (errorElement) errorElement.remove();
}

export function addPreloaderToDom() {
  const preloaderElement = createPreloader();
  containerProductsCards.append(preloaderElement);
}

export function removePreloaderFromDom() {
  const preloaderElement = document.querySelector('.preloader');
  preloaderElement.remove();
}
