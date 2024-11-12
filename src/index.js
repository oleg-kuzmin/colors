import './index.scss';
import './scripts/swiper';
import './scripts/sort';
import './scripts/filters';
import { initProducts, createProductCard } from './scripts/products';
import {
  addProductCardToDom,
  patchProductCards,
  patchBasketCards,
  patchBasketInfo,
  clearProductCards,
} from './scripts/section';
import { basket } from './scripts/basket';
import { checkBoxList } from './scripts/variables';

let loadedProducts = [];
let productsFilters = [];

initProducts()
  .then(products => {
    loadedProducts = products;
    products.forEach(product => {
      const newProductCard = createProductCard(product);
      addProductCardToDom(newProductCard);
    });
    patchProductCards(basket);
    patchBasketCards(basket);
    patchBasketInfo(basket);
  })
  .catch(err => console.error(err));

checkBoxList.forEach(input => {
  input.addEventListener('change', () => {
    if (input.checked) {
      productsFilters.push(input.name);
    } else {
      productsFilters = productsFilters.filter(element => element !== input.name);
    }
    const newProducts = loadedProducts.filter(obj => {
      const objFeatures = [];
      if (obj.isExclusive) objFeatures.push('isExclusive');
      if (obj.inStock) objFeatures.push('inStock');
      if (obj.isContract) objFeatures.push('isContract');
      if (obj.isNew) objFeatures.push('isNew');
      if (obj.isSale) objFeatures.push('isSale');
      if (productsFilters.every(filter => objFeatures.includes(filter))) {
        return obj;
      }
    });
    clearProductCards();
    newProducts.forEach(product => {
      const newProductCard = createProductCard(product);
      addProductCardToDom(newProductCard);
      patchProductCards(basket);
      patchBasketCards(basket);
      patchBasketInfo(basket);
    });
  });
});
