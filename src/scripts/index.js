import '../styles/index.scss';
import * as Selectors from './selectors';
import * as Ani from './animations';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const Card_Status = {
  Closed: 0,
  Opened: 1,
  Turned: 2,
  Clicked: 3,
  Turning: 4,
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

if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  startAnimation();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    startAnimation();
  });
}

/**
 * Init Function
 */
const init = () => {
  peelSeal = new Peel('#env-card-seal');
  const sealHeight = document.querySelector('.env-card-seal').offsetHeight;

  peelSeal.setPeelPosition(sealHeight, sealHeight);
  peelSeal.setPeelPath(
    sealHeight,
    sealHeight,
    sealHeight / 2,
    sealHeight,
    0,
    0,
    sealHeight,
    -sealHeight
  );
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
  tweenSeal.seek(0);

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
  var limit_flake = 100;
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
 * Show Front Text Animations
 *
 * @param {*} animations
 */
const showFrontTextAni = (animations) => {
  if (cardStatus === Card_Status.Turning) {
    animations.map((ani) => ani.pause());
    return;
  }

  const random = Array.from(
    {
      length: 8,
    },
    () => Math.floor(Math.random() * 24)
  );
  let startedAnimations = [];
  random.map((ran) => {
    const animation = animations[ran];
    animation.restart();
    if (animation) startedAnimations.push(animation.finished);
  });

  Promise.all(startedAnimations).then(() => {
    showFrontTextAni(animations);
  });
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
  tweenSeal.play();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const Timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const startAnimation = async () => {
  await init();

  // peelAni();

  Ani.scaleAni.restart();
  Ani.openCoverAni.restart();
  await Promise.all([
    Ani.scaleAni.finished,
    peelAni(),
    Ani.openCoverAni.finished,
  ]);
  Ani.scaleAni.pause();
  Ani.openCoverAni.pause();

  Ani.openCardAnimation.restart();
  await Promise.all([Ani.openCardAnimation.finished]);
  Ani.openCardAnimation.pause();
  cardStatus = Card_Status.Opened;

  document
    .querySelector(Selectors.ENV_CARD)
    .addEventListener('click', handleClickCard);

  const textAnimations = Ani.showFrontCardTextAnimations();
  showFrontTextAni(textAnimations);

  await Timeout(5000);

  cardStatus = Card_Status.Turning;
  Ani.turnCardAnimation.restart();
  await Promise.all[Ani.turnCardAnimation.finished];
  cardStatus = Card_Status.Turned;
};
