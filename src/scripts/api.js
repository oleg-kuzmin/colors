import { addNewFieldToProducts } from './helpers';

export async function apiGetProducts() {
  const res = await fetch('https://6732ff9a2a1b1a4ae111a3bd.mockapi.io/api/colors', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });
  const data = res.ok ? await res.json() : console.error(`Ошибка загрузки данных с сервера: ${res.status}`);
  const newArrayProducts = addNewFieldToProducts(data);
  return newArrayProducts;
}
