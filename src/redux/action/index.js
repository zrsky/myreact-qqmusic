export const type = {
    BG_IMAGE: 'BG_IMAGE',
    FULL_SCREEN: 'FULL_SCREEN',
    PLAY_LIST: 'PLAY_LIST',
    TITLE: 'TITLE',
    CURRENT_INDEX: 'CURRENT_INDEX',
    PLAYING: 'PLAYING'
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

export function setPlayList (playList) {
    return {
        type: type.PLAY_LIST,
        playList
    }
}

export function setTitle (title) {
    return {
        type: type.TITLE,
        title
    }
}

export function setCurrentIndex (index) {
    return {
        type: type.CURRENT_INDEX,
        currentIndex: index
    }
}

export function setPlaying (flag) {
    return {
        type: type.PLAYING,
        playing: flag
    }
}