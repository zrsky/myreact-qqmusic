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
        default:
           return {...state}

    }
}

export default ebikeData;