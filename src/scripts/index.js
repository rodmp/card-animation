import '../styles/index.scss';
import * as Config from './constants';
import * as Selectors from './selectors';
import * as Ani from './animations';
import anime from 'animejs';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

/**
 * Init Function
 */
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

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var limit_flake = 50;
  setInterval(function () {
    let dimension = randomInt(3, 9) + 'px';
    var flake =
      "<div class='drop animate' style='left:" +
      randomInt(10, window.innerWidth - 20) +
      'px;width:' +
      dimension +
      ';height:' +
      dimension +
      "'></div>";
    document.querySelector('body').insertAdjacentHTML('beforeend', flake);

    var list_flake = $('.drop');
    if (list_flake.length > limit_flake)
      list_flake[list_flake.length - 1].remove();
  }, 200);
};

/**
 * Scale Animation and Open Cover Animation
 */
const scaleAndOpenCoverAni = () => {
  Ani.scaleAni.restart();
  Ani.openCoverAni.restart();

  return Promise.all([Ani.scaleAni.finished, Ani.openCoverAni.finished]);
};

/**
 * Open Card Animation
 *
 */
const openCardAni = () => {
  Ani.openCardAnimation.restart();
  return Promise.all([Ani.openCardAnimation.finished]);
};

/**
 * Write FrontText Animation
 */
const writeFrontTextAni = () => {
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

/**
 * Show Front Text Animations
 *
 * @param {*} animations
 */
const showFrontTextAni = (animations) => {
  const random = anime.random(0, 24);
  console.log(random);
  const showTextAni = animations[anime.random(0, 24)];
  showTextAni.restart();
  showTextAni.finished.then(() => {
    showFrontTextAni(animations);
  });
};

(async function () {
  await init();
  await scaleAndOpenCoverAni();
  //Change z-index of Envelope Cover
  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_AFTER;
  await openCardAni();

  await writeFrontTextAni();
  showFrontTextAni(Ani.showFrontCardTextAnimations());
})();
