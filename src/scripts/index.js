import '../styles/index.scss';
import anime from 'animejs';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

(function () {
  var scaleEnv = anime({
    targets: '.env-wrapper',
    scale: [
      { value: 0.2 },
      { value: 1, duration: 5000, easing: 'easeInOutBounce' },
    ],
    rotate: '-8.8',
    easing: 'linear',
  });

  var openCover = anime({
    targets: '.env-cover',
    rotateY: '180',
    duration: 5000,
    delay: 2000,
    easing: 'easeInOutBounce',
  });
}.call(this));
