import './dragAndDrop.js';
import './player.js';
import './discRotation.js';
import './metaData.js';
import './lyrics.js';

const toggleShowLyrics = document.getElementById('toggle-show-lyrics') as HTMLButtonElement;
const lyricsBox = document.getElementById('lyrics-box') as HTMLDivElement;

toggleShowLyrics.addEventListener('click', () => {
    const currentStyles = window.getComputedStyle(lyricsBox);
    const currentState = currentStyles.getPropertyValue('display');

    if (currentState === 'none') {
        lyricsBox.style.display = 'block';
    } else {
        lyricsBox.style.display = 'none';
    }
});
