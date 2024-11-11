import { getTextForCounter } from './helpers';
import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';

const buttonBasket = document.querySelector('.button-basket');
const cartPanel = document.querySelector('.basket');
const cartButtonClose = document.querySelector('.basket__button-close');
const templateBasketCard = document.querySelector('#basket-card');
const basketCardsContainer = document.querySelector('.basket__cards-container');
const basketCounterValue = document.querySelector('.basket__counter-value');
const basketClearAll = document.querySelector('.basket__clear-all');
const basketTotalPrice = document.querySelector('.basket__total-price');

let basket = [];

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
  generateBasketCards(basket);
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
  generateBasketCards(basket);
}

function inСart(id) {
  return basket.findIndex(item => item.id === id) !== -1;
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
  const searchProductCard = document.querySelector(`#card-${card.id}`);
  const searchProductCardCounter = searchProductCard.querySelector('.card__counter');

  clone.id = `basketCard-${card.id}`;
  cloneImage.src = card.image;
  cloneImage.alt = card.title;
  cloneTitle.textContent = card.title;
  clonePrice.textContent = card.price * card.counter;
  cloneCounter.textContent = card.counter;
  searchProductCardCounter.textContent = card.counter;

  if (card.isDeleted) {
    cloneButtonPlus.disabled = true;
    cloneButtonMinus.disabled = true;
    searchProductCardCounter.classList.add('card__counter_disabled');
    clone.classList.add('basket-card_deleted');
  } else {
    cloneButtonPlus.disabled = false;
    cloneButtonMinus.disabled = false;
    searchProductCardCounter.classList.remove('card__counter_disabled');
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
  generateBasketCards(basket);
}

function incrementCardCounter(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, counter: card.counter + 1, isDeleted: false };
    } else {
      return card;
    }
  });
  generateBasketCards(basket);
}

function deleteCard(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, isDeleted: true };
    } else {
      return card;
    }
  });
  generateBasketCards(basket);
}

function comebackCard(id) {
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, isDeleted: false };
    } else {
      return card;
    }
  });
  generateBasketCards(basket);
}

function generateBasketCards(arrayBasketCards = []) {
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

  arrayBasketCards.forEach(basketCard => {
    generateBasketCard(basketCard);
  });
}
