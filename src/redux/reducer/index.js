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
                playlist: action.playlist,
                fullScreen: action.playlist.length > 0 ? true : false
            }
        default:
           return {...state}

    }
}

export default ebikeData;