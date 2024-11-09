import { register } from 'swiper/element/bundle';

register();

const swiperElement = document.querySelector('swiper-container');
const swiperButtonNext = document.querySelector('.hero__swiper-next');
const swiperButtonPrev = document.querySelector('.hero__swiper-prev');
const sweperPaginationBullets = document.querySelectorAll('.hero__pagination-bullet');

swiperElement.addEventListener('swiperslidechange', () => {
  const index = swiperElement.swiper.realIndex;
  sweperPaginationBullets.forEach(bullet => {
    bullet.classList.remove('hero__pagination-bullet_active');
  });
  sweperPaginationBullets[index].classList.add('hero__pagination-bullet_active');
});

swiperButtonNext.addEventListener('click', () => {
  swiperElement.swiper.slideNext();
});

swiperButtonPrev.addEventListener('click', () => {
  swiperElement.swiper.slidePrev();
});
