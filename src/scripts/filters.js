import { closeWrapperBackground, openWrapperBackground } from './wrapper-background';
import { buttonFilters, filters } from './variables';

function handleClick(evt) {
  if (evt.target.classList.contains('wrapper-background')) {
    closeFilters();
  }
}

function openFilter() {
  filters.classList.add('filters_opened');
  openWrapperBackground();
  setTimeout(() => {
    document.addEventListener('click', handleClick);
  }, 0);
}

function closeFilters() {
  filters.classList.remove('filters_opened');
  closeWrapperBackground();
  document.removeEventListener('click', handleClick);
}

buttonFilters.addEventListener('click', () => {
  openFilter();
  let dotOne = 0;
  let dotTwo = 0;

  const handleTouchStart = evt => {
    dotOne = evt.changedTouches[0].clientY;
  };

  const handleTouchEnd = evt => {
    dotTwo = evt.changedTouches[0].clientY;
    if (dotTwo > dotOne + 5) {
      filters.removeEventListener('touchstart', handleTouchStart);
      filters.removeEventListener('touchend', handleTouchEnd);
      closeFilters();
    }
  };

  filters.addEventListener('touchstart', handleTouchStart);
  filters.addEventListener('touchend', handleTouchEnd);
});
