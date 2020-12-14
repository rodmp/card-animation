import '../styles/index.scss';
import * as Config from './constants';
import * as Selectors from './selectors';
import * as Ani from './animations';
import anime from 'animejs';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const Card_Status = {
  Closed: 0,
  Opened: 1,
  Turned: 2,
  Clicked: 3,
};

let cardStatus = Card_Status.Closed;

/**
 * Get names
 */
const params = new URLSearchParams(window.location.search);
const { first_name: firstName = '', last_name: lastName = '' } = params;

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

  document.querySelector(
    Selectors.BACK_CARD_NAME_TEXT
  ).innerHTML = `DEAR ${firstName} ${lastName}`;

  /**
   *
   * @param {*} min
   * @param {*} max
   */
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * Snow Animation
   */
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

    var list_flake = document.querySelectorAll('.drop');
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

/**
 * Turn Card Animation
 *
 */
const turnCardAnimation = () => {
  Ani.turnCardAnimation.restart();
  return Promise.all[Ani.turnCardAnimation.finished];
};

const handleClickCard = async (event) => {
  if (cardStatus === Card_Status.Closed) {
    return;
  }
  if (cardStatus === Card_Status.Opened) {
    //Turn Card
    await turnCardAnimation();
    cardStatus = Card_Status.Turned;
    return;
  }
  if (cardStatus === Card_Status.Turned) {
    return;
  }
  if (cardStatus === Card_Status.Clicked) {
    return;
  }
};

(async function () {
  await init();
  await scaleAndOpenCoverAni();

  //Change z-index of Envelope Cover
  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_AFTER;

  await openCardAni();
  cardStatus = Card_Status.Opened;

  /**
   * Add click event in Card
   */
  document
    .querySelector(Selectors.ENV_CARD)
    .addEventListener('click', handleClickCard);

  await writeFrontTextAni();
  showFrontTextAni(Ani.showFrontCardTextAnimations());
})();
