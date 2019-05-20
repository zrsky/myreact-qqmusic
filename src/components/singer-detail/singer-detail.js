import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MusicList from '../music-list/music-list'
import './singer-detail.less'

export default class SingerDetail extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params)
    }

    render() {
        return (
            <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
                <div className="singer-detail-wrapper">
                    <MusicList></MusicList>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}