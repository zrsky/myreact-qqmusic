import React from 'react';
import PropTypes from 'prop-types';
import './music-list.less'

export default class MusicList extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    back() {
        this.context.router.history.goBack();
    }

    render() {
        return (
            <div className="musiclist-wrapper">
                 <div className="back" onClick={(e)=>{this.back()}}>
                    <i className="icon-back"></i>
                 </div>
                 <h1 className="title">歌手详情</h1>
            </div>
        )
    }
}