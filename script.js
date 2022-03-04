const music = document.querySelector('audio');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
}

playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));