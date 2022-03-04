const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const progress = document.getElementById('progress'); 
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

const songs = [
    {
        name: 'song-1',
        displayName: 'Chill',
        artist: 'Adrian'
    },
    {
        name: 'song-2',
        displayName: 'Smile',
        artist: 'Adi'
    },
    {
        name: 'song-3',
        displayName: 'Sun',
        artist: 'Adios'
    },
    {
        name: 'song-4',
        displayName: 'Fun',
        artist: 'Muchacho'
    }
];

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

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `assets/music/${song.name}.mp3`;
    image.src = `assets/img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(event) {
    if (isPlaying) {
        const {duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationToMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds) {
            durationElement.textContent = `${durationToMinutes}:${durationSeconds}`;
        }

        const currnetToMinutes = Math.floor(currentTime / 60);
        let currnetSeconds = Math.floor(currentTime % 60);
        if (currnetSeconds < 10) {
            currnetSeconds = `0${currnetSeconds}`;
        }
        currentTimeElement.textContent = `${currnetToMinutes}:${currnetSeconds}`;
    }
}

function setProgressBar(event) {
    const barWidth = this.clientWidth;
    const offsetX = event.offsetX;
    const { duration } = music;
    music.currentTime = (offsetX / barWidth) * duration;
}

prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);