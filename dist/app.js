"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const audio = document.getElementById("audio-element");
const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const stopButton = document.getElementById("stop-btn");
const trackStatus = document.getElementById("track-status");
const trackTitle = document.getElementById("track-title");
const disc = document.getElementById("disc");
audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
let angle = 0;
const FPS = 60;
let isPlaying = false;
function rotateDisc() {
    if (isPlaying === false) {
        return;
    }
    disc.style.transform = `rotate(${angle}deg)`;
    angle++;
    if (angle >= 360) {
        angle = 0;
    }
    requestAnimationFrame(rotateDisc);
}
function setDiscToZero() {
    if (angle >= 180) {
        angle += 2;
    }
    else {
        angle -= 2;
    }
    disc.style.transform = `rotate(${angle}deg)`;
    if (angle <= 0 || angle >= 360 || isPlaying === true) {
        disc.style.transform = `rotate(${angle}deg)`;
        return;
    }
    requestAnimationFrame(setDiscToZero);
}
playButton.addEventListener('click', () => {
    audio.play();
    trackStatus.innerText = `Playing`;
    trackTitle.innerText = `Track 1`;
    if (isPlaying === false) {
        isPlaying = true;
        requestAnimationFrame(rotateDisc);
    }
});
pauseButton.addEventListener('click', () => {
    isPlaying = false;
    audio.pause();
    trackStatus.innerText = `Paused`;
});
stopButton.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    if (isPlaying === true) {
        isPlaying = false;
        requestAnimationFrame(setDiscToZero);
    }
    trackStatus.innerText = `Stopped`;
    trackTitle.innerText = `No Track Loaded`;
});
//# sourceMappingURL=app.js.map