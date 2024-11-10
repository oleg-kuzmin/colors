const wrapperBackground = document.querySelector('.wrapper-background');

export function openWrapperBackground() {
  wrapperBackground.classList.add('wrapper-background_opened');
}

export function closeWrapperBackground() {
  wrapperBackground.classList.remove('wrapper-background_opened');
}
