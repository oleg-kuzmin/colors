const buttonFilters = document.querySelector('.button-filters');
const filters = document.querySelector('.filters');

function handleClick(evt) {
  console.log(evt.target);
  if (!evt.target.classList.contains('filters_opened')) {
    closeFilters();
  }
}

function openFilter() {
  filters.classList.add('filters_opened');
  setTimeout(() => {
    document.addEventListener('click', handleClick);
  }, 0);
}

function closeFilters() {
  filters.classList.remove('filters_opened');
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
