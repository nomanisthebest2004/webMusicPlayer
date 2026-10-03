import { isPlaying } from "./player.js";
const disc = document.getElementById("disc") as HTMLImageElement;

let angle = 0;
const FPS = 60;
export function rotateDisc(): void{
    if (isPlaying === false) {
        return;
    }
    disc.style.transform = `rotate(${angle}deg)`;
    angle++;
    if (angle >= 360) {
        angle = 0;
    }
    requestAnimationFrame(rotateDisc)
}
export function setDiscToZero() {
    if (angle >= 180) {
        angle += 2;
    } else {
        angle -= 2;
    }
    disc.style.transform = `rotate(${angle}deg)`;
    if (angle <= 0 || angle >=  360 || isPlaying === true) {
        disc.style.transform = `rotate(0deg)`;
        return;
    }
    requestAnimationFrame(setDiscToZero);

}
