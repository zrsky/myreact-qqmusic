import React from 'react'
import './loading.less'
import imgUrl from './loading.gif'

export default class Loading extends React.Component {

    // constructor(props) {
    //     super(props)
    // }

    static defaultProps = {
        loadingText: '正在加载...'
    }

    render() {
        return (
            <div className="loading">
                <img src={imgUrl} alt="加载失败" />
                <span>{this.props.loadingText}</span>
            </div>
        )
    }
}