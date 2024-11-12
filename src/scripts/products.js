import { templateProductCard, productsCounter } from './variables';
import { apiGetProducts } from './api';
import {
  addErrorGetProductsToDom,
  removeErrorGetProductsToDom,
  addPreloaderToDom,
  removePreloaderFromDom,
} from './section';
import { getTextForProductCounter } from './helpers';
import { incrementCard } from './basket';

export async function initProducts() {
  addPreloaderToDom();
  try {
    const products = await apiGetProducts();
    removePreloaderFromDom();
    removeErrorGetProductsToDom();
    setProductsCounter(products.length);
    return products;
  } catch (error) {
    removePreloaderFromDom();
    addErrorGetProductsToDom();
  }
}

export function createProductCard(objectCard) {
  const newProductCard = templateProductCard.content.querySelector('.card').cloneNode(true);
  const newProductCardImage = newProductCard.querySelector('.card__image');
  const newProductCardDescription = newProductCard.querySelector('.card__description');
  const newProductCardPrice = newProductCard.querySelector('.card__price');
  const newProductCardButtonPlus = newProductCard.querySelector('.card__button');
  newProductCard.id = `card-${objectCard.id}`;
  newProductCardImage.src = objectCard.image;
  newProductCardImage.alt = objectCard.title;
  newProductCardDescription.textContent = objectCard.title;
  newProductCardPrice.textContent = objectCard.price;
  newProductCardButtonPlus.addEventListener('click', () => {
    incrementCard(objectCard);
  });
  return newProductCard;
}

function setProductsCounter(length) {
  productsCounter.textContent = getTextForProductCounter(length);
}
