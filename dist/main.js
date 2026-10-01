"use strict";
(() => {
  // src/discRotation.ts
  var disc = document.getElementById("disc");
  var angle = 0;
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
    } else {
      angle -= 2;
    }
    disc.style.transform = `rotate(${angle}deg)`;
    if (angle <= 0 || angle >= 360 || isPlaying === true) {
      disc.style.transform = `rotate(${angle}deg)`;
      return;
    }
    requestAnimationFrame(setDiscToZero);
  }

  // src/player.ts
  var audio = document.getElementById("audio-element");
  var playButton = document.getElementById("play-btn");
  var pauseButton = document.getElementById("pause-btn");
  var stopButton = document.getElementById("stop-btn");
  var trackStatus = document.getElementById("track-status");
  var trackTitle = document.getElementById("track-title");
  var volume = document.getElementById("volume");
  var disc2 = document.getElementById("disc");
  var volumeLvl = document.getElementById("volume-lvl");
  var defaultAudioSrc = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  var defaultDiscSrc = "./vinyl.jpg";
  var defaultAudioVolume = 0.5;
  audio.src = defaultAudioSrc;
  disc2.src = defaultDiscSrc;
  audio.volume = defaultAudioVolume;
  volumeLvl.innerText = "50";
  var isPlaying = false;
  function setIsPlaying(flag) {
    isPlaying = flag;
  }
  function setAudioSrc(audioUrl) {
    audio.src = audioUrl;
  }
  function setDiscSrc(discUrl) {
    disc2.src = discUrl;
  }
  audio.addEventListener("error", () => {
    audio.src = defaultAudioSrc;
    alert("The file is not an image or a music file. Loading the default track.");
  });
  playButton.addEventListener("click", () => {
    audio.play();
    trackStatus.innerText = `Playing`;
    trackTitle.innerText = `Track Loaded`;
    if (isPlaying === false) {
      isPlaying = true;
      requestAnimationFrame(rotateDisc);
    }
  });
  pauseButton.addEventListener("click", () => {
    isPlaying = false;
    audio.pause();
    trackStatus.innerText = `Paused`;
  });
  stopButton.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    if (isPlaying === true) {
      isPlaying = false;
      requestAnimationFrame(setDiscToZero);
    }
    trackStatus.innerText = `Stopped`;
    trackTitle.innerText = `No Track Loaded`;
  });
  audio.addEventListener("ended", () => {
    isPlaying = false;
    trackStatus.innerText = `Ended`;
    setDiscToZero();
  });
  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    volumeLvl.innerText = String(Math.trunc(audio.volume * 100));
  });

  // src/dragAndDrop.ts
  var dropZone = document.querySelector(".drop-zone");
  var image = document.querySelector("img");
  var trackStatus2 = document.getElementById("track-status");
  var trackTitle2 = document.getElementById("track-title");
  var droppedUrl;
  dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    image.classList.add("itemDrop");
  });
  dropZone.addEventListener("dragleave", (event) => {
    event.preventDefault();
    image.classList.remove("itemDrop");
  });
  dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    image.classList.remove("itemDrop");
    const file = event.dataTransfer?.files[0];
    if (!file) {
      return;
    }
    droppedUrl = URL.createObjectURL(file);
    const audio2 = new Audio();
    audio2.src = droppedUrl;
    audio2.oncanplay = () => {
      setAudioSrc(droppedUrl);
      trackStatus2.innerText = `Stopped`;
      trackTitle2.innerText = `Track Loaded`;
      setIsPlaying(false);
      setDiscToZero();
    };
    audio2.onerror = (e) => {
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
})();
