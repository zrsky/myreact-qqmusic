/**
 * Reducer 数据处理
 */
import { combineReducers } from 'redux'
import { type } from '../action' 

const ebikeData = (state, action) => {
    switch(action.type) {
        case type.BG_IMAGE:
            return {
                ...state,
                imgUrls: action.imgUrls
            }
        case type.FULL_SCREEN:
            return {
                ...state,
                fullScreen: action.fullScreen
            }
        case type.PLAY_LIST:
            return {
                ...state,
                playList: action.playList,
                fullScreen: action.playList.length > 0 ? true : false
            }
        case type.TITLE:
            return {
                ...state,
                title: action.title
            }
        case type.CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.currentIndex
            }
        case type.PLAYING:
            return {
                ...state,
                playing: action.playing
            }
        default:
           return {...state}

    }
}

export default ebikeData;