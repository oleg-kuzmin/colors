import {
  buttonBasket,
  basketPanel,
  basketPanelButtonClose,
  templateBasketCard,
  basketPanelClearAll,
} from './variables';
import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';
import { patchProductCard, patchBasketInfo, patchBasketCards } from './section';

export let basket = JSON.parse(localStorage.getItem('basket')) || [];

export function incrementCard(objectCard) {
  if (basket.findIndex(item => item.id === objectCard.id) !== -1) {
    basket = basket.map(card => {
      if (card.id === objectCard.id) {
        const newCard = { ...card, counter: card.counter + 1, isDeleted: false };
        patchProductCard(newCard);
        return newCard;
      } else {
        return card;
      }
    });
  } else {
    const newCard = { ...objectCard, counter: 1 };
    patchProductCard(newCard);
    basket.push(newCard);
  }
  patchBasketCards(basket);
  patchBasketInfo(basket);
}

function decrementCard(objectCard) {
  if (objectCard.counter > 1) {
    basket = basket.map(card => {
      if (card.id === objectCard.id) {
        const newCard = { ...card, counter: card.counter - 1 };
        patchProductCard(newCard);
        return newCard;
      } else {
        return card;
      }
    });
    patchBasketCards(basket);
    patchBasketInfo(basket);
  } else {
    deleteCard(objectCard);
  }
}

function deleteCard(objectCard) {
  basket = basket.map(card => {
    if (card.id === objectCard.id) {
      const newCard = { ...card, isDeleted: true };
      patchProductCard(newCard);
      return newCard;
    } else {
      return card;
    }
  });
  patchBasketCards(basket);
  patchBasketInfo(basket);
}

function repeatCard(objectCard) {
  basket = basket.map(card => {
    if (card.id === objectCard.id) {
      const newCard = { ...card, isDeleted: false };
      patchProductCard(newCard);
      return newCard;
    } else {
      return card;
    }
  });
  patchBasketCards(basket);
  patchBasketInfo(basket);
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

function sanitizeBasket() {
  basket = basket.filter(card => card.isDeleted === false);
  patchBasketCards(basket);
  patchBasketInfo(basket);
}

function openBasket() {
  basketPanel.classList.add('basket_opened');
  openWrapperBackground();
  setTimeout(() => {
    document.addEventListener('click', handleClickWrapper);
    document.addEventListener('keydown', handleEscKeyboard);
  }, 0);
}

function closeBasket() {
  basketPanel.classList.remove('basket_opened');
  closeWrapperBackground();
  document.removeEventListener('click', handleClickWrapper);
  document.removeEventListener('keydown', handleEscKeyboard);
  sanitizeBasket();
}

buttonBasket.addEventListener('click', () => {
  openBasket();
});

basketPanelButtonClose.addEventListener('click', () => {
  closeBasket();
});

basketPanelClearAll.addEventListener('click', () => {
  basket = [];
  patchBasketCards(basket);
  patchBasketInfo(basket);
  clearAllProductCounters();
  closeBasket();
});

function clearAllProductCounters() {
  const cardCounterList = document.querySelectorAll('.card__counter');
  cardCounterList.forEach(cardCounter => {
    cardCounter.textContent = 0;
    cardCounter.classList.add('card__counter_disabled');
  });
}

export function createBasketCard(card) {
  const newBasketCard = templateBasketCard.content.querySelector('.basket-card').cloneNode(true);
  const newBasketCardImage = newBasketCard.querySelector('.basket-card__image');
  const newBasketCardTitle = newBasketCard.querySelector('.basket-card__title');
  const newBasketCardPrice = newBasketCard.querySelector('.basket-card__price');
  const newBasketCardCounter = newBasketCard.querySelector('.basket-card__counter');
  const newBasketCardButtonPlus = newBasketCard.querySelector('.basket-card__plus');
  const newBasketCardButtonMinus = newBasketCard.querySelector('.basket-card__minus');
  const newBasketCardButtonDelete = newBasketCard.querySelector('.basket-card__delete');
  const newBasketCardButtonRepeat = newBasketCard.querySelector('.basket-card__repeat');
  newBasketCard.id = `basketCard-${card.id}`;
  newBasketCardImage.src = card.image;
  newBasketCardImage.alt = card.title;
  newBasketCardTitle.textContent = card.title;
  newBasketCardPrice.textContent = card.price * card.counter;
  newBasketCardCounter.textContent = card.counter;
  if (card.isDeleted) {
    newBasketCardButtonPlus.disabled = true;
    newBasketCardButtonMinus.disabled = true;
    newBasketCard.classList.add('basket-card_deleted');
  } else {
    newBasketCardButtonPlus.disabled = false;
    newBasketCardButtonMinus.disabled = false;
    newBasketCard.classList.remove('basket-card_deleted');
  }
  newBasketCardButtonPlus.addEventListener('click', () => {
    incrementCard(card);
  });
  newBasketCardButtonMinus.addEventListener('click', () => {
    decrementCard(card);
  });
  newBasketCardButtonDelete.addEventListener('click', () => {
    deleteCard(card);
  });
  newBasketCardButtonRepeat.addEventListener('click', () => {
    repeatCard(card);
  });
  return newBasketCard;
}
