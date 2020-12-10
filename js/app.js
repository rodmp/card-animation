(function () {
  var openCover = anime({
    targets: '.env-cover',
    rotateY: '180',
    duration: 5000,
    delay: 2000,
    easing: 'linear',
  });
  openCover.restart();
}.call(this));
