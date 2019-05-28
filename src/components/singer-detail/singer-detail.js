import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MusicList from '../music-list/music-list'
import './singer-detail.less'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import { createSong } from '../../common/js/song'
import { connect } from 'react-redux';

class SingerDetail extends React.Component {

    state = {
        singerId: this.props.match.params.id,
        singerDetailData: {}
    }

    _getSingerDetail(singerId) {
        getSingerDetail(singerId).then((data) => {
            console.log(data)
            if (data.code === ERR_OK) {
                this.setState({
                    song: this._normalizeSongs(data.data.list)
                })
            }
        })
    }

    _normalizeSongs(list) {
        let ret = [];
        list.forEach((item, index) => {
            let { musicData } = item;
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret;
    }

    componentDidMount() {
        console.log(this.props.match.params)
        console.log(111)
        console.log(this.props)
        this._getSingerDetail(this.state.singerId);
    }

    render() {
        const { imgUrls } = this.props;
        return (
            /*<ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>*/

                <div className="singer-detail-wrapper">
                    <MusicList song={this.state.song} imgUrl={this.props.imgUrls}></MusicList>
                </div>
            /*</ReactCSSTransitionGroup>*/
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        imgUrls: state.imgUrls
    }
};
export default connect(mapStateToProps)(SingerDetail)