import React from 'react';
import PropTypes from 'prop-types';
import './music-list.less'
import Scroll from '../../base/scroll/scroll'
import SongList from '../../base/song-list/song-list'
// import { connect } from 'react-redux';

const TOP_HEIGHT = 40;

export default class MusicList extends React.Component {

    constructor(props) {
        super(props);

        this.getLayer = element => {
            this.layer = element;
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
        // imageHeight: 0
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    static defaultProps = {
        title: '歌手详情'
    }

    componentDidMount() {
        this.imageHeight = -this.bgImg.clientHeight + TOP_HEIGHT;
    //    this.setState({
    //        imageHeight
    //    })
        // this._setBgImg();
        // setTimeout(()=>{
        // },2000)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.imgUrl) {
            let imgUrl = nextProps.imgUrl;
            this._setBgImg(imgUrl);
        }
    }

    _setBgImg(imgUrl) {
        this.bgImg.style.background = imgUrl ? `url(${imgUrl}) no-repeat` 
        : `url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558519485757&di=821bfa73254d3fc97decc7de02403a7f&imgtype=0&src=http%3A%2F%2Fhubei.sinaimg.cn%2F2014%2F0824%2FU7651P1190DT20140824115623.jpg') no-repeat`;
        this.bgImg.style.backgroundSize = 'cover';
    }

    back() {
        this.context.router.history.goBack();
    }

    scroll = (pos) => {
        // console.log(pos)
        let zIndex = 0;
        let percent = 0;
        let scrollY = pos.y;
        let transformY = Math.max(this.imageHeight, scrollY);
        if(this.layer) {
            this.layer.style.transform = `translate3d(0, ${transformY}px, 0)`;
        }
        if(scrollY < 0) {
            if(scrollY < this.imageHeight) {
                zIndex = 10;
                this.bgImg.style.paddingTop = 0;
                this.bgImg.style.height = TOP_HEIGHT + 'px';
            }else{
                this.bgImg.style.paddingTop = '70%';
                this.bgImg.style.height = 0;
                zIndex = 0;
            }
        }else{
            // this.bgImg.style.paddingTop = '70%';
            // this.bgImg.style.height = 0;
            // zIndex = 0;
            // this.layer.style.transform = `translate3d(0, 0, 0)`;
            // console.log(scrollY, this.imageHeight)
            // console.log(scrollY / -this.imageHeight)
            percent = (scrollY / -this.imageHeight) + 1;
            // console.log(percent)
            if(this.bgImg) {
                this.bgImg.style.transform = `scale(${percent})`; 
            }
        }

        this.bgImg.style.zIndex = zIndex;
    }

    render() {
        return (
            <div className="musiclist-wrapper">
                 <div className="back" onClick={(e)=>{this.back()}}>
                    <i className="icon-back"></i>
                 </div>
                 <h1 className="title">{this.props.title}</h1>
                 <div className="bg-image" ref={this.getImgRef}>
                     <div className="filter"></div>
                 </div>
                 <div className="layer" ref={this.getLayer}></div>
                 <Scroll className="list" style={{'overflow': 'visible'}} scroll={this.scroll} listenScroll={this.state.listenScroll}
                 probeType={this.state.probeType} ref={this.getScrollRef}>
                    <SongList song={this.props.song}></SongList>
                 </Scroll>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     console.log(state)
//     return {
//         imgUrls: state.imgUrls
//     }
// };
// export default connect(mapStateToProps)(MusicList)