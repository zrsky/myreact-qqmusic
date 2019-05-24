export const type = {
    BG_IMAGE: 'BG_IMAGE'
}

export function setBgImage (imgUrl) {
    return {
        type: type.BG_IMAGE,
        imgUrl
    }
}