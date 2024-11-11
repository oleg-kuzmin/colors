const buttonBasket = document.querySelector('.button-basket');
const cartPanel = document.querySelector('.basket');
const cartButtonClose = document.querySelector('.basket__button-close');
const templateBasketCard = document.querySelector('#basket-card');
const basketCardsContainer = document.querySelector('.basket__cards-container');

buttonBasket.addEventListener('click', () => {
  cartPanel.classList.add('basket_opened');
});

cartButtonClose.addEventListener('click', () => {
  cartPanel.classList.remove('basket_opened');
});

let basket = [];
generateBasketCards(basket);

export function addToBasket(card) {
  if (inСart(card.id)) {
    incrementCardCounter(card.id);
  } else {
    basket.push({ ...card, counter: 1 });
    generateBasketCards(basket);
  }
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
    decrementCardCounter(card.id);
  });

  basketCardsContainer.append(clone);
}

function decrementCardCounter(id) {
  const searchCard = document.querySelector(`#basketCard-${id}`);
  const searchPrice = searchCard.querySelector('.basket-card__price');
  const searchCounter = searchCard.querySelector('.basket-card__counter');
  basket = basket.map(card => {
    if (card.id === id && card.counter > 1) {
      searchCounter.textContent = card.counter - 1;
      searchPrice.textContent = card.price * (card.counter - 1);
      return { ...card, counter: card.counter - 1 };
    } else if (card.id === id) {
      deleteCard(card.id);
      return card;
    } else {
      return card;
    }
  });
}

function incrementCardCounter(id) {
  const searchCard = document.querySelector(`#basketCard-${id}`);
  const searchPrice = searchCard.querySelector('.basket-card__price');
  const searchCounter = searchCard.querySelector('.basket-card__counter');
  basket = basket.map(card => {
    if (card.id === id) {
      searchCounter.textContent = card.counter + 1;
      searchPrice.textContent = card.price * (card.counter + 1);
      return { ...card, counter: card.counter + 1 };
    } else {
      return card;
    }
  });
  console.log(basket);
}

function generateBasketCards(arrayBasketCards = []) {
  const list = document.querySelectorAll('.basket-card');
  list.forEach(element => {
    element.remove();
  });
  arrayBasketCards.forEach(basketCard => {
    generateBasketCard(basketCard);
  });
  console.log(basket);
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
  console.log(id);
  basket = basket.map(card => {
    if (card.id === id) {
      return { ...card, isDeleted: false };
    } else {
      return card;
    }
  });
  generateBasketCards(basket);
}
