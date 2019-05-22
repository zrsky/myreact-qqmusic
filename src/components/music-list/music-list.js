import React from 'react';
import PropTypes from 'prop-types';
import './music-list.less'
import Scroll from '../../base/scroll/scroll'
import SongList from '../../base/song-list/song-list'

const TOP_HEIGHT = 40;

export default class MusicList extends React.Component {

    constructor(props) {
        super(props);

        this.getLayer = element => {
            this.layer = element;
            console.log(this.layer)
        }

        this.getImgRef = element => {
            this.bgImg = element;
        }

        this.getScrollRef = element => {
            this.scrollRef = element;
        }
    }

    state = {
        listenScroll: true,
        probeType: 3,
        imageHeight: 0
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    componentDidMount() {
       let imageHeight = -this.bgImg.clientHeight + TOP_HEIGHT;
       this.setState({
           imageHeight
       })
    }

    back() {
        this.context.router.history.goBack();
    }

    scroll = (pos) => {
        console.log(pos)
        let scrollY = pos.y;
        let transformY = Math.max(this.state.imageHeight, scrollY);
        this.layer.style.transform = `translate3d(0, ${transformY}px, 0)`;
        if(scrollY < this.state.imageHeight) {
            this.bgImg.style.paddingTop = 0;
            this.bgImg.style.height = TOP_HEIGHT + 'px';
        }
    }

    render() {
        return (
            <div className="musiclist-wrapper">
                 <div className="back" onClick={(e)=>{this.back()}}>
                    <i className="icon-back"></i>
                 </div>
                 <h1 className="title">歌手详情</h1>
                 <div className="bg-image" ref={this.getImgRef}>
                     <div className="filter"></div>
                 </div>
                 <div className="layer" ref={this.getLayer}></div>
                 <Scroll scroll={this.scroll} listenScroll={this.state.listenScroll}
                 probeType={this.state.probeType} ref={this.getScrollRef}>
                    <SongList song={this.props.song}></SongList>
                 </Scroll>
            </div>
        )
    }
}