import { parseBlob } from "music-metadata-browser";

export interface Artwork {
    url: string;
    mimeType: string;
    description: string | null;
}

export interface MusicMetadata {
    title: string | null;
    artist: string | null;
    album: string | null;
    albumArtist: string | null;
    lyrics: string[] | null;
    year: number | null;
    genre: string[];

    trackNumber: number | null;
    discNumber: number | null;
    duration: number | null;
    bitrate: number | null;
    sampleRate: number | null;
    channels: number | null;
    codec: string | null;
    container: string | null;
    hasArtwork: boolean;
    artwork: Artwork | null;
}
export async function readMusicMetadata(
    file: File
): Promise<MusicMetadata> {
    const metadata = await parseBlob(file);
    const common = metadata.common;
    const picture = common.picture?.[0];
    let artwork: Artwork | null = null;

    if (picture) {
        const imageBlob = new Blob(
            [picture.data],
            {
                type: picture.format
            }
        );
        const imageUrl = URL.createObjectURL(
            imageBlob
        );
        artwork = {
            url: imageUrl,
            mimeType: picture.format,
            description: picture.description ?? null
        };
    }
    return {
        title: common.title ?? null,
        artist: common.artist ?? null,
        album: common.album ?? null,
        albumArtist: common.albumartist ?? null,
        year: common.year ?? null,
        genre: common.genre ?? [],
        trackNumber: common.track?.no ?? null,
        discNumber: common.disk?.no ?? null,
        lyrics: common.lyrics ?? null,
        duration:
            metadata.format.duration ?? null,
        bitrate:
            metadata.format.bitrate ?? null,
        sampleRate:
            metadata.format.sampleRate ?? null,
        channels:
            metadata.format.numberOfChannels ?? null,
        codec:
            metadata.format.codec ?? null,
        container:
            metadata.format.container ?? null,
        hasArtwork: artwork !== null,
        artwork
    };
}