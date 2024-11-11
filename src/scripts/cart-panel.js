const buttonBasket = document.querySelector('.button-basket');
const cartPanel = document.querySelector('.cart');
const cartButtonClose = document.querySelector('.cart__button-close');

buttonBasket.addEventListener('click', () => {
  cartPanel.classList.add('cart_opened');
});

cartButtonClose.addEventListener('click', () => {
  cartPanel.classList.remove('cart_opened');
});
