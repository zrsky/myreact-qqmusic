/**
 * 引入createStore
 */

import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducer'

const initialState = {
    imgUrls: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558519485757&di=821bfa73254d3fc97decc7de02403a7f&imgtype=0&src=http%3A%2F%2Fhubei.sinaimg.cn%2F2014%2F0824%2FU7651P1190DT20140824115623.jpg'
}

const configureStore = () => createStore(reducer, initialState);

export default configureStore;