import '../styles/index.scss';
import anime from 'animejs';
import * as Config from './constants';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const ENV_WRAPPER = '.env-wrapper';
const ENV_COVER = '.env-cover';
const ENV_CARD = '.env-card';
const ENV_BODY = '.env-body';

/**
 * Scale Envelope Animation
 */
const scaleAni = anime({
  targets: ENV_WRAPPER,
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
const openCoverAni = anime({
  targets: ENV_COVER,
  rotateY: '180',
  duration: Config.OPEN_COVER_ANI_DURATION,
  delay: Config.OPEN_COVER_ANI_DELAY,
  easing: Config.OPEN_COVER_ANI_EASING_TYPE,
  update: (ani) => {
    console.log('fasdfasdfasdfasd', ani);
    const coverEl = document.querySelector(ENV_COVER);
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
const openCardAnimation = anime({
  targets: ENV_CARD,
  translateX: {
    value: function (el) {
      return el.offsetWidth / Config.INIT_CARD_SCALE_X;
    },
  },
  duration: Config.OPEN_CARD_ANI_DURATION,
  easing: Config.OPEN_CARD_ANI_EASING_TYPE,
  update: (ani) => {
    if (ani.progress === 100) {
      document.querySelector(ENV_CARD).style['z-index'] =
        Config.CARD_Z_INDEX_AFTER;
    }
  },
  direction: 'alternate',
  autoplay: false,
});

const init = () => {
  document.querySelector(ENV_CARD).style['z-index'] =
    Config.CARD_Z_INDEX_BEFORE;

  document.querySelector(ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_BEFORE;
};

const scaleAndOpenCoverAni = () => {
  scaleAni.restart();
  openCoverAni.restart();

  return Promise.all([scaleAni.finished, openCoverAni.finished]);
};

const openCardAni = () => {
  openCardAnimation.restart();
  return Promise.all([openCardAnimation.finished]);
};

const reverseCardAni = () => {
  openCardAnimation.reverse();
  return Promise.all([openCardAnimation.finished]);
};

(async function () {
  await init();
  await scaleAndOpenCoverAni();
  //Change z-index of Envelope Cover
  document.querySelector(ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_AFTER;

  await openCardAni();
  document.querySelector(ENV_CARD).style['z-index'] = Config.CARD_Z_INDEX_AFTER;
  await reverseCardAni();
}.call(this));
