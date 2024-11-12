import { getTextForCounter } from './helpers';
import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';
import { productsCards } from './products';
import { catalog } from './mock';

const buttonBasket = document.querySelector('.button-basket');
const cartPanel = document.querySelector('.basket');
const cartButtonClose = document.querySelector('.basket__button-close');
const templateBasketCard = document.querySelector('#basket-card');
const basketCardsContainer = document.querySelector('.basket__cards-container');
const basketCounterValue = document.querySelector('.basket__counter-value');
const basketClearAll = document.querySelector('.basket__clear-all');
const basketTotalPrice = document.querySelector('.basket__total-price');

let basket = JSON.parse(localStorage.getItem('basketCards')) || [];
updateDom(basket);

productsCards.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__button')) {
    const searchProduct = evt.target.closest('.card');
    const searchProductId = +searchProduct.id.split('-')[1];
    const searchIndex = catalog.findIndex(item => item.id === searchProductId);
    addToBasket(catalog[searchIndex]);
  }
});

function generateBasketCards(arrayBasketCards = []) {
  arrayBasketCards.forEach(basketCard => {
    generateBasketCard(basketCard);
  });
}

function generateProductCards(arrayBasketCards = []) {
  arrayBasketCards.forEach(basketCard => {
    setProducts(basketCard);
  });
}

function openBasket() {
  cartPanel.classList.add('basket_opened');
  openWrapperBackground();
  setTimeout(() => {
    document.addEventListener('click', handleClickWrapper);
    document.addEventListener('keydown', handleEscKeyboard);
  }, 0);
}

function closeBasket() {
  cartPanel.classList.remove('basket_opened');
  closeWrapperBackground();
  document.removeEventListener('click', handleClickWrapper);
  document.removeEventListener('keydown', handleEscKeyboard);
}

function handleClickWrapper(evt) {
  if (evt.target.classList.contains('wrapper-background')) {
    closeBasket();
  }
}

function handleEscKeyboard(evt) {
  if (evt.code === 'Escape') {
    closeBasket();
  }
}

buttonBasket.addEventListener('click', () => {
  openBasket();
});

cartButtonClose.addEventListener('click', () => {
  closeBasket();
});

basketClearAll.addEventListener('click', () => {
  closeBasket();
  basket = [];
  updateDom(basket);
  const cardCounterList = document.querySelectorAll('.card__counter');
  cardCounterList.forEach(cardCounter => {
    cardCounter.textContent = 0;
    cardCounter.classList.add('card__counter_disabled');
  });
});

export function addToBasket(card) {
  if (inСart(card.id)) {
    incrementCardCounter(card.id);
  } else {
    addNewCard(card);
  }
}

function addNewCard(card) {
  basket.push({ ...card, counter: 1 });
  updateDom(basket);
}

function inСart(id) {
  return basket.findIndex(item => item.id === id) !== -1;
}

function setProducts(card) {
  const searchProductCard = document.querySelector(`#card-${card.id}`);
  const searchProductCardCounter = searchProductCard.querySelector('.card__counter');
  searchProductCardCounter.textContent = card.counter;
  if (card.isDeleted) {
    searchProductCardCounter.classList.add('card__counter_disabled');
  } else {
    searchProductCardCounter.classList.remove('card__counter_disabled');
  }
}

function generateBasketCard(card) {
  const clone = templateBasketCard.content.querySelector('.basket-card').cloneNode(true);
  const cloneImage = clone.querySelector('.basket-card__image');
  const cloneTitle = clone.querySelector('.basket-card__title');
  const clonePrice = clone.querySelector('.basket-card__price');
  const cloneCounter = clone.querySelector('.basket-card__counter');
  const cloneButtonRepeat = clone.querySelector('.basket-card__repeat');
  const cloneButtonDelete = clone.querySelector('.basket-card__delete');
  const cloneButtonPlus = clone.querySelector('.basket-card__plus');
  const cloneButtonMinus = clone.querySelector('.basket-card__minus');

  clone.id = `basketCard-${card.id}`;
  cloneImage.src = card.image;
  cloneImage.alt = card.title;
  cloneTitle.textContent = card.title;
  clonePrice.textContent = card.price * card.counter;
  cloneCounter.textContent = card.counter;

  if (card.isDeleted) {
    cloneButtonPlus.disabled = true;
    cloneButtonMinus.disabled = true;
    clone.classList.add('basket-card_deleted');
  } else {
    cloneButtonPlus.disabled = false;
    cloneButtonMinus.disabled = false;
    clone.classList.remove('basket-card_deleted');
  }

  cloneButtonDelete.addEventListener('click', () => {
    deleteCard(card.id);
  });

  cloneButtonRepeat.addEventListener('click', () => {
    comebackCard(card.id);
  });

  cloneButtonPlus.addEventListener('click', () => {
    incrementCardCounter(card.id);
  });

  cloneButtonMinus.addEventListener('click', () => {
    if (card.counter > 1) {
      decrementCardCounter(card.id);
    } else {
      deleteCard(card.id);
    }
  });

  basketCardsContainer.append(clone);
}

function decrementCardCounter(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, counter: card.counter - 1 };
    } else {
      return card;
    }
  });
  updateDom(basket);
}

function incrementCardCounter(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, counter: card.counter + 1, isDeleted: false };
    } else {
      return card;
    }
  });
  updateDom(basket);
}

function deleteCard(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, isDeleted: true };
    } else {
      return card;
    }
  });
  updateDom(basket);
}

function comebackCard(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, isDeleted: false };
    } else {
      return card;
    }
  });
  updateDom(basket);
}

function updateDom(arrayBasketCards = []) {
  const list = document.querySelectorAll('.basket-card');
  let counterCards = 0;
  let totalPrice = 0;
  list.forEach(element => {
    element.remove();
  });
  arrayBasketCards.forEach(element => {
    if (!element.isDeleted) {
      counterCards += element.counter;
      totalPrice += element.price * element.counter;
    }
  });
  buttonBasket.textContent = counterCards;
  basketCounterValue.textContent = getTextForCounter(counterCards);
  basketTotalPrice.textContent = totalPrice;
  generateBasketCards(arrayBasketCards);
  generateProductCards(arrayBasketCards);
  localStorage.setItem('basketCards', JSON.stringify(arrayBasketCards));
}
