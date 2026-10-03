import { rotateDisc, setDiscToZero } from "./discRotation.js";

const audio = document.getElementById("audio-element") as HTMLAudioElement;
const playButton = document.getElementById("play-btn") as HTMLButtonElement;
const pauseButton = document.getElementById("pause-btn") as HTMLButtonElement;
const stopButton = document.getElementById("stop-btn") as HTMLButtonElement;
const trackStatus = document.getElementById("track-status") as HTMLElement;
const trackTitle = document.getElementById("track-title") as HTMLElement;
const volume = document.getElementById("volume") as HTMLInputElement;
const disc = document.getElementById("disc") as HTMLImageElement;
const volumeLvl = document.getElementById("volume-lvl") as HTMLSpanElement;

const defaultAudioSrc = './music/default.opus';
const discSrc = ['./img/default01.png', './img/default02.png'];
export function defaultDiscSrc() : string {
    const index = Math.random() < 0.5 ? 0 : 1;
    return discSrc[index] as string;
}
const defaultAudioVolume = 0.5;
const defaultTrackTitle = 'Track Loaded';

audio.src = defaultAudioSrc;
setDiscSrc(defaultDiscSrc() as string);
audio.volume = defaultAudioVolume;
volumeLvl.innerText = '50';
trackTitle.innerText = defaultTrackTitle;

export let isPlaying = false;
export function setIsPlaying(flag: boolean) {
    isPlaying = flag;
}
export function setAudioSrc(audioUrl: string) {
    audio.src = audioUrl;
}
export function setDiscSrc(discUrl: string) {
    disc.src = discUrl;
}
export function setTrackTitle (title: string) {
    trackTitle.innerText = title;
}


audio.addEventListener("error", () => {
    audio.src = defaultAudioSrc;
    alert("The file is not an image or a music file. Loading the default track.");
});
playButton.addEventListener('click', ()=> {
    audio.play();
    trackStatus.innerText = `Playing`;
    if (isPlaying === false){
        isPlaying = true;
        rotateDisc();
    }
});
pauseButton.addEventListener('click', ()=> {
    isPlaying = false;
    audio.pause();
    trackStatus.innerText = `Paused`;
});
stopButton.addEventListener('click', ()=> {
    audio.pause();
    audio.currentTime = 0;
    if (isPlaying === true) {
        isPlaying = false;
    }
    setDiscToZero();
    trackStatus.innerText = 'Stopped';
});
audio.addEventListener('ended', () => {
    isPlaying = false;
    trackStatus.innerText = `Ended`;
    setDiscToZero();
});
volume.addEventListener('input', ()=> {
    audio.volume = Number(volume.value);
    volumeLvl.innerText = String(Math.trunc(audio.volume * 100));
});
