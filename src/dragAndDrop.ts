import { setIsPlaying, setAudioSrc, setDiscSrc, isPlaying  } from "./player.js";
import { setDiscToZero } from "./discRotation.js";

// const audio = document.getElementById("audio-element") as HTMLAudioElement;
const dropZone = document.querySelector(".drop-zone") as HTMLElement;
const image = document.querySelector("img") as HTMLImageElement;
const trackStatus = document.getElementById("track-status") as HTMLElement;
const trackTitle = document.getElementById("track-title") as HTMLElement;

export let droppedUrl: string;

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    image.classList.add('itemDrop')
});

dropZone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    image.classList.remove('itemDrop')
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    image.classList.remove('itemDrop')
    
    const file = event.dataTransfer?.files[0];
    
    if (!file) {
        return;
    }
    droppedUrl = URL.createObjectURL(file);

    const audio = new Audio();
    audio.src = droppedUrl;
    audio.oncanplay = () => {
        setAudioSrc(droppedUrl);
        trackStatus.innerText = `Stopped`;
        trackTitle.innerText = `Track Loaded`;
        setIsPlaying(false);
        setDiscToZero();
    };

    audio.onerror = (e) => {
        const img = new Image();
        img.src = droppedUrl;

        img.onload = () => {
            setDiscSrc(droppedUrl);
        };

        img.onerror = () => {
            alert("Not an image or music file. Default Music has been loaded");
        };

        img.src = droppedUrl;
    };
});
