import '../styles/index.scss';
import * as Config from './constants';
import * as Selectors from './selectors';
import * as Ani from './animations';
import anime from 'animejs';

const showFrontCardTextAnimations = Ani.showFrontCardTextAnimations();

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const init = () => {
  document.querySelector(Selectors.ENV_CARD).style['z-index'] =
    Config.CARD_Z_INDEX_BEFORE;

  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_BEFORE;

  Array.from(
    document.querySelectorAll(Selectors.FRONT_CARD_TEXT_CHARACTER)
  ).map((el, i) => {
    el.insertAdjacentHTML(
      'beforeend',
      `<div class="env-card-front-character-background" style="background-image: radial-gradient(circle at center, ${Config.FRONT_TEXT_DEST_COLORS[i]}, ${Config.FRONT_TEXT_DEST_COLORS[i]} 50%, rgba(255,255,255,0) 75%);"></div>`
    );
  });
};

const scaleAndOpenCoverAni = () => {
  Ani.scaleAni.restart();
  Ani.openCoverAni.restart();

  return Promise.all([Ani.scaleAni.finished, Ani.openCoverAni.finished]);
};

const openCardAni = () => {
  Ani.openCardAnimation.restart();
  return Promise.all([Ani.openCardAnimation.finished]);
};

const openFrontTextAni = () => {
  Ani.openFrontCardTextAnimation
    .add({
      // rotate
      targets: Selectors.FRONT_CARD_TEXT_CHARACTER,
      rotateY: [-90, 0],
      duration: 1300,
      delay: (el, i) => 45 * i,
    })
    // .add({ // scale
    //   targets: Selectors.FRONT_CARD_TEXT_CHARACTER,
    //   scale: [0, 1],
    //   duration: 1500,
    //   elasticity: 600,
    //   delay: (el, i) => 45 * (i + 1),
    // })

    .restart();
  return Promise.all([Ani.openFrontCardTextAnimation.finished]);
};

const showFrontTextAni = () => {
  const random = anime.random(0, 24);
  console.log(random);
  const showTextAni = showFrontCardTextAnimations[anime.random(0, 24)];
  showTextAni.restart();
  showTextAni.finished.then(() => {
    showFrontTextAni();
  });
};

(async function () {
  await init();
  await scaleAndOpenCoverAni();
  //Change z-index of Envelope Cover
  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_AFTER;
  await openCardAni();

  await openFrontTextAni();

  showFrontTextAni();
})();
