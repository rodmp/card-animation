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
let modalCard = null;

let peelSeal = null;
let tweenSeal = null;

/**
 * Get names
 */
const urlParams = new URLSearchParams(window.location.search);
let firstName = urlParams.get('firstname') ? urlParams.get('firstname') : '';
let lastName = urlParams.get('lastname') ? urlParams.get('lastname') : '';

/**
 * Init Function
 */
const init = () => {
  peelSeal = new Peel('.env-card-seal');
  peelSeal.setPeelPosition(170, 170);
  peelSeal.setPeelPath(170, 170, 50, 170, 0, 0, 170, -170);
  peelSeal.setFadeThreshold(0.7);
  peelSeal.t = 0;
  tweenSeal = new TweenLite(peelSeal, 2, {
    t: 1,
    paused: true,
    ease: Power2.easeIn,
    onUpdate: function () {
      peelSeal.setTimeAlongPath(this.target.t);
    },
  });

  /**
   * Render name dynamically
   */
  document.querySelector(
    Selectors.BACK_CARD_NAME_TEXT
  ).innerHTML = `DEAR ${firstName} ${lastName}`;

  document
    .querySelector(Selectors.MODAL_CLOSE_BTN)
    .addEventListener('click', handleClickCloseBtn);

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

  return Promise.all([
    Ani.scaleAni.finished,
    peelAni(),
    Ani.openCoverAni.finished,
  ]);
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
  const random = Array.from(
    {
      length: 8,
    },
    () => Math.floor(Math.random() * 24)
  );
  let startedAnimations = [];
  for (let i = 0; i < random.length; i++) {
    const animation = animations[random[i]];
    animation.restart();
    if (animation) startedAnimations[i] = animation.finished;
  }

  Promise.all(startedAnimations).then(() => {
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
    // await turnCardAnimation();
    // cardStatus = Card_Status.Turned;
    return;
  }
  if (cardStatus === Card_Status.Turned) {
    //Show modal
    const overlayEl = document.querySelector(Selectors.MODAL_OVERLAY);
    if (!overlayEl.classList.contains('opened')) {
      overlayEl.classList.add('opened');
    }

    // Get the element
    var elem = document.querySelector(Selectors.ENV_CARD);
    // Create a copy of it
    modalCard = elem.cloneNode(true);

    // Update the ID and add a class
    modalCard.id = 'modal-card';

    // Inject it into the DOM
    overlayEl.appendChild(modalCard);
    return;
  }
  if (cardStatus === Card_Status.Clicked) {
    return;
  }
};

const handleClickCloseBtn = (e) => {
  const overlayEl = document.querySelector(Selectors.MODAL_OVERLAY);
  if (overlayEl.classList.contains('opened')) {
    overlayEl.classList.remove('opened');
  }

  modalCard.remove();
  modalCard = null;
};

const peelAni = () => {
  tweenSeal.seek(0);
  tweenSeal.play();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

(async function () {
  await init();
  await scaleAndOpenCoverAni();

  await openCardAni();
  cardStatus = Card_Status.Opened;

  /**
   * Add click event in Card
   */
  document
    .querySelector(Selectors.ENV_CARD)
    .addEventListener('click', handleClickCard);

  // await writeFrontTextAni();
  showFrontTextAni(Ani.showFrontCardTextAnimations());

  setTimeout(async () => {
    await turnCardAnimation();
    cardStatus = Card_Status.Turned;
  }, 4000);
})();
