import anime from 'animejs';
import * as Config from './constants';
import * as Selectors from './selectors';

/**
 * Scale Envelope Animation
 */
export const scaleAni = anime({
  targets: Selectors.ENV_WRAPPER,
  scale: [
    { value: Config.INIT_SCALE },
    {
      value: 1,
      duration: Config.INIT_SCALE_ANI_DURATION,
      easing: Config.INIT_SCALE_ANI_EASING_TYPE,
    },
  ],
  rotate: Config.LEAN_DEG,
  autoplay: false,
});

/**
 * Open Envelope Cover Animation
 */
export const openCoverAni = anime({
  targets: Selectors.ENV_COVER,
  rotateY: '180',
  duration: Config.OPEN_COVER_ANI_DURATION,
  delay: Config.OPEN_COVER_ANI_DELAY,
  easing: Config.OPEN_COVER_ANI_EASING_TYPE,
  update: (ani) => {
    console.log('fasdfasdfasdfasd', ani);
    const coverEl = document.querySelector(Selectors.ENV_COVER);
    if (ani.progress > 64.285) {
      if (!coverEl.classList.contains('opened'))
        coverEl.classList.add('opened');
    }
  },
  autoplay: false,
});

/**
 * Open Card Animation
 */
export const openCardAnimation = anime({
  targets: Selectors.ENV_CARD,
  translateX: {
    value: function (el) {
      return el.offsetWidth / Config.INIT_CARD_SCALE_X;
    },
  },
  duration: Config.OPEN_CARD_ANI_DURATION,
  easing: Config.OPEN_CARD_ANI_EASING_TYPE,
  update: (ani) => {
    if (ani.progress === 100) {
      document.querySelector(Selectors.ENV_CARD).style['z-index'] =
        Config.CARD_Z_INDEX_AFTER;
    }
  },
  direction: 'alternate',
  autoplay: false,
});
