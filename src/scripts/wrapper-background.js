import { wrapperBackground } from './variables';

export function openWrapperBackground() {
  wrapperBackground.classList.add('wrapper-background_opened');
}

export function closeWrapperBackground() {
  wrapperBackground.classList.remove('wrapper-background_opened');
}
