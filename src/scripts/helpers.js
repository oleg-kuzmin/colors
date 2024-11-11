export function getTextForCounter(number) {
  if (number === 1) {
    return `${number} товар`;
  } else if (number > 4 || number === 0) {
    return `${number} товаров`;
  } else {
    return `${number} товара`;
  }
}
