var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    direction: 'vertical'
});

var music = document.getElementById('music');
var musicImg1 = music.querySelector('img:nth-child(1)');
var musicImg2 = music.querySelector('img:nth-child(2)');
var musicSound = music.querySelector('audio');

var musicPlayStatus = 1;


music.onclick = function() {
    if (musicPlayStatus === 1) {
        musicImg1.style.display = 'none';
        musicImg2.style.animation = 'none';
        musicSound.pause();
        musicPlayStatus = 0;
    } else if (musicPlayStatus === 0) {
        musicImg1.style.display = 'block';
        musicImg2.style.animation = 'music 2s linear infinite';
        musicSound.play();
        musicPlayStatus = 1;
    }
}
