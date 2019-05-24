/**
 * Reducer 数据处理
 */

import { type } from '../action' 

const initialState = {
    imgUrl: ''
}

export default (state = initialState, action) => {
    switch(action) {
        case type.BG_IMAGE:
            return {
                ...state,
                imgUrl: action.imgUrl
            }
        default:
           break;

    }
}