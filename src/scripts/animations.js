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
    const coverEl = document.querySelector(Selectors.ENV_COVER);
    const rate =
      (Config.OPEN_COVER_ANI_DURATION / 2 + Config.OPEN_COVER_ANI_DELAY) /
      (Config.OPEN_COVER_ANI_DURATION + Config.OPEN_COVER_ANI_DELAY);
    if (ani.progress > rate * 100) {
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
      document.querySelector(Selectors.ENV_BODY).style['z-index'] =
        Config.BODY_Z_INDEX_AFTER;
    }
  },
  direction: 'alternate',
  autoplay: false,
});

/**
 * Write Front Card Text Animation
 */
export const openFrontCardTextAnimation = anime.timeline();

/**
 * Show front Card Text Animations
 */
export const showFrontCardTextAnimations = () => {
  return Config.FRONT_TEXT_DEST_COLORS.map((color, i) => {
    const textEl = document.querySelectorAll(
      Selectors.FRONT_CARD_TEXT_CHARACTER
    )[i];
    const backgroundEl = document.querySelectorAll(
      Selectors.FRONT_CARD_TEXT_BACKGROUND
    )[i];
    return anime
      .timeline({
        direction: 'alternate',
        autoplay: false,
      })
      .add({
        targets: textEl,
        color: color,
        easing: 'linear',
        textShadow: `0 0px 8px ${color}`,
        duration: Config.FRONT_TEXT_ANI_DURATION,
      })
      .add({
        targets: backgroundEl,
        duration: Config.FRONT_TEXT_ANI_DURATION,
        opacity: 1,
        easing: 'linear',
      });
  });
};

/**
 * Turn CardAnimation
 */
export const turnCardAnimation = anime({
  targets: Selectors.ENV_CARD,
  rotateY: '180',
  duration: Config.TURN_CARD_ANI_DURATION,
  easing: Config.TURN_CARD_ANI_EASING_TYPE,
  update: (ani) => {
    const coverEl = document.querySelector(Selectors.ENV_CARD);
    if (ani.progress > 50) {
      if (!coverEl.classList.contains('turned'))
        coverEl.classList.add('turned');
    }
  },
  autoplay: false,
});
