export const type = {
    BG_IMAGE: 'BG_IMAGE',
    FULL_SCREEN: 'FULL_SCREEN',
    PLAY_LIST: []
}

export function setBgImage (imgUrls) {
    return {
        type: type.BG_IMAGE,
        imgUrls
    }
}

export function setFullScreen (fullScreen) {
    return {
        type: type.FULL_SCREEN,
        fullScreen
    }
}

export function setPlayList (playlist) {
    return {
        type: type.PLAY_LIST,
        playlist
    }
}