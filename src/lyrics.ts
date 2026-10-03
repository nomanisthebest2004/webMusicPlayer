const lyricsBox = document.getElementById('lyrics-box') as HTMLDivElement;
const toggleShowLyrics = document.getElementById('toggle-show-lyrics') as HTMLButtonElement;

export function showLyrics(lyrics: string[] | null) {
    lyricsBox.innerHTML = '';
    if (!lyrics || lyrics.length === 0) {
        lyricsBox.style.display = 'none';
        toggleShowLyrics.style.display = 'none';
        return;
    }
    const linesArray = lyrics.join('\n').split(/\r?\n/);
    linesArray.forEach((line: string) => {
        let cleanedLine = line.trim();
        
        if (cleanedLine.startsWith('[') && !cleanedLine.match(/^\[\d+:\d+/)) {
            return; 
        }
        if (cleanedLine === '') return;
        const match = cleanedLine.match(/\]\s*(.*)/);
        cleanedLine = match ? match[1] : cleanedLine.trim();
        
        const lineHolder = document.createElement('h3');
        lineHolder.innerText = cleanedLine;
        lyricsBox.appendChild(lineHolder);
    })
    toggleShowLyrics.style.display = 'inline';
    lyricsBox.style.display = 'block';
}