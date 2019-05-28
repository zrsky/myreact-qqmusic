export const type = {
    BG_IMAGE: 'BG_IMAGE'
}

export function setBgImage (imgUrls) {
    return {
        type: type.BG_IMAGE,
        imgUrls
    }
}