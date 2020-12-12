import '../styles/index.scss';
import * as Config from './constants';
import * as Selectors from './selectors';
import * as Ani from './animations';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const init = () => {
  document.querySelector(Selectors.ENV_CARD).style['z-index'] =
    Config.CARD_Z_INDEX_BEFORE;

  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_BEFORE;
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

(async function () {
  await init();
  await scaleAndOpenCoverAni();
  //Change z-index of Envelope Cover
  document.querySelector(Selectors.ENV_COVER).style['z-index'] =
    Config.COVER_Z_INDEX_AFTER;

  await openCardAni();
})();
