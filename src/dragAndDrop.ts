import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import { setIsPlaying, setAudioSrc, setDiscSrc, setTrackTitle, defaultDiscSrc } from "./player.js";
import { setDiscToZero } from "./discRotation.js";
import { readMusicMetadata } from "./metaData.js";
import { showLyrics } from "./lyrics.js";

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
    const img = new Image();
    img.src = droppedUrl;
    
    img.onload = () => {
        setDiscSrc(droppedUrl);
    };
    
    img.onerror = async () => {
        const metaData = await readMusicMetadata(file);

        //console.log(metaData);
        if (metaData.artwork?.url) {
            setDiscSrc(metaData.artwork?.url);
        } else {
            setDiscSrc(defaultDiscSrc());
        }
        showLyrics(metaData.lyrics);
        
        const audio = new Audio();
        audio.src = droppedUrl;
        audio.oncanplay = () => {
            setAudioSrc(droppedUrl);
            trackStatus.innerText = `Stopped`;
            if (metaData.title) {
                if (metaData.artist) {
                    setTrackTitle(metaData.title + ' - ' + metaData.artist);
                } else {
                    setTrackTitle(metaData.title);
                }
            } else {
                setTrackTitle('Track');
            }
            setIsPlaying(false);
            setDiscToZero();
        };

        audio.onerror = (e) => {
            alert("Not an image or music file. Default Music has been loaded");
        };
    };

    img.src = droppedUrl;
});
