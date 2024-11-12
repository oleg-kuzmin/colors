import { register } from 'swiper/element/bundle';
import { swiperElement, swiperButtonNext, swiperButtonPrev, swiperPaginationBullets } from './variables';

register();

swiperElement.addEventListener('swiperslidechange', () => {
  const index = swiperElement.swiper.realIndex;
  swiperPaginationBullets.forEach(bullet => {
    bullet.classList.remove('hero__pagination-bullet_active');
  });
  swiperPaginationBullets[index].classList.add('hero__pagination-bullet_active');
});

swiperButtonNext.addEventListener('click', () => {
  swiperElement.swiper.slideNext();
});

swiperButtonPrev.addEventListener('click', () => {
  swiperElement.swiper.slidePrev();
});
