const images = {
  1: new URL('../images/1.png', import.meta.url),
  2: new URL('../images/2.png', import.meta.url),
  3: new URL('../images/3.png', import.meta.url),
  4: new URL('../images/4.png', import.meta.url),
  5: new URL('../images/5.png', import.meta.url),
  6: new URL('../images/6.png', import.meta.url),
  7: new URL('../images/7.png', import.meta.url),
  8: new URL('../images/8.png', import.meta.url),
};

export function addNewFieldToProducts(arrayProducts) {
  const newArrayProducts = arrayProducts.map(product => {
    const newProduct = { ...product, counter: 0, isDeleted: false, image: images[product.image] };
    return newProduct;
  });
  return newArrayProducts;
}

export function getTextForProductCounter(number) {
  if (number === 1) {
    return `${number} товар`;
  } else if (number > 4 || number === 0) {
    return `${number} товаров`;
  } else {
    return `${number} товара`;
  }
}

export function createPreloader() {
  const preloader = document.createElement('span');
  preloader.classList.add('preloader');
  return preloader;
}

export function createError() {
  const errorElement = document.createElement('h3');
  errorElement.textContent = `Ошибка получения информации о товарах. Обновите страницу.`;
  return errorElement;
}
