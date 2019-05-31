import React from 'react';
import './player.less'
import {connect} from 'react-redux';
import { setFullScreen, setPlaying, setCurrentIndex } from '../../redux/action'

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.getCd = element => {
            this.cd = element;
        }
        this.getAudio = element => {
            this.audio = element;
        }
        this.getProgress = element => {
            this.progress = element;
        }
        this.getBarInner = element => {
            this.barInner = element;
        }
        this.getBtnWrapper = element => {
            this.btn = element;
        }

    }

    state = {
        playIcon: 'icon-sequence',
        getFavoriteIcon: 'icon-not-favorite',
        iconPlay: 'icon-play',
        // fullScreen: this.props.fullScreen
        currentTime: '0:00'
    }

    componentDidMount() {
        this.touch = {}
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        console.log(this.audio)
        if(nextProps.playing) {
            this.audio.play();
        }
    }

    changeMode = () => {
        // return
    }

    prev = () => {
        const {dispatch} = this.props;
        let currentIndex = this.props.currentIndex === 0 ? this.props.playList.length - 1 : this.props.currentIndex - 1;
        dispatch(setCurrentIndex(currentIndex))
        dispatch(setPlaying(true));
        this.audio.load();
    }

    next = () => {
        const {dispatch} = this.props;
        let currentIndex = this.props.currentIndex === this.props.playList.length - 1 ? 0 : this.props.currentIndex + 1;
        dispatch(setCurrentIndex(currentIndex))
        dispatch(setPlaying(true));
        this.audio.load();
    }

    play = () => {
        const {dispatch} = this.props;
        let playing = !this.props.playing;
        playing ? this.audio.play() : this.audio.pause();
        dispatch(setPlaying(playing));
        this.cdClass();
        
    }

    iconPlay() {
        return this.props.playing === true ? 'icon-pause' : 'icon-play';
    }

    changeFavorite = () => {
        
    }

    cdClass() {
        console.log(this.props.playing)
       return this.props.playing === true ? 'play' : 'play pause';
    }

    back = () => {
        let fullScreen = !this.props.fullScreen;
        // this.setState({
        //     fullScreen
        // })
        const {dispatch} = this.props;
        dispatch(setFullScreen(fullScreen));
    }

    getMinutes(seconds) {
        let minute = Math.floor(seconds / 60);
        let second = seconds % 60;
        // second = second.length === 1 ? 0 + second : second;
        return minute + ':' + this._pad(second);
    }

    _pad(num, n = 2) {
        let len = num.toString().length;
        while(len < n) {
            num = '0' + num;
            len += 1;
        }
        return num;
    }

    ready() {
        console.log('ready')
    }

    error() {
        
    }

    updateTime(e) {
        console.log(e)
    }

    ended() {

    }

    onProgressTouchStart = (e) => {
        this.initiated = true;
        console.log(e.touches[0])
        this.touch.pageX1 = e.touches[0].pageX;
        this.touch.left = this.progress.clientWidth;
    }

    onProgressTouchMove = (e) => {
        if(!this.initiated) {
            return;
        }
        this.touch.pageX2 = e.touches[0].pageX;
        let width = this.touch.left + this.touch.pageX2- this.touch.pageX1;
        let offsetWidth = Math.min(this.barInner-16, Math.max(0, width));

        this._offset(offsetWidth)
    }

    _offset(offsetWidth) {
        this.progress.style.width = offsetWidth;
        this.btn.style.left = offsetWidth
    }

    onProgressTouchEnd = (e) => {

    }

    render() {
        const currentSong = this.props.playList[this.props.currentIndex];
        return (
            <div className="player-wrapper">
                {this.props.fullScreen === true ? <div className="normal-player">
                    <div className="background">
                        <img width="100%" height="100%" src={currentSong.image} alt=""/>
                    </div>
                    <div className="top">
                        <div className="back" onClick={this.back}>
                            <i className="icon-back"></i>
                        </div>
                        <h1 className="title">{currentSong.name}</h1>
                        <h2 className="subtitle">{currentSong.singer}</h2>
                    </div>
                    <div className="middle">
                        <div className="middle-l">
                            <div className="cd-wrapper">
                                <div className={`cd ${this.cdClass()}`} ref={this.getCd}>
                                    <img width="100%" height="100%" src={currentSong.image} alt=""/>
                                </div>
                            </div>
                            <div className="playing-lyric-wrapper">
                                <div className="play-lyric">可惜不是你陪我到最后</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="dot-wrapper">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                        </div>
                        <div className="progress-wrapper">
                            <span className="time time-r">0:00</span>
                            <div className="progress-bar-wrapper">
                                <div className="progress-bar">
                                    <div className="bar-inner" onTouchStart={this.onProgressTouchStart} onTouchMove={this.onProgressTouchMove}
                                    onTouchEnd={this.onProgressTouchEnd} ref={this.getBarInner}>
                                        <div className="progress" ref={this.getProgress}></div>
                                        <div className="progress-btn-wrapper" ref={this.getBtnWrapper}>
                                            <div className="progress-btn"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="time time-r">{this.getMinutes(currentSong.duration)}</span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left"><i className={this.state.playIcon} onClick={this.changeMode}></i></div>
                            <div className="icon i-left"><i onClick={this.prev} className="icon-prev"></i></div>
                            <div className="icon i-center"><i className={this.iconPlay()} onClick={this.play}></i></div>
                            <div onClick={this.next} className="icon i-right"><i className="icon-next"></i></div>
                            <div className="icon i-right" onClick={this.changeFavorite}><i className={this.state.getFavoriteIcon}></i></div>
                        </div>
                    </div>
                </div> : ''}
                <audio ref={this.getAudio} autoPlay src="https://m801.music.126.net/20190531174922/751f4964bdd1c437219efc665a2de826/jdyyaac/025b/0f09/030e/51d55f22d28c7cfde6894d28e1114db3.m4a" onPlay={this.ready} onError={this.error} onTimeUpdate={this.updateTime} onEnded={this.ended}></audio>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.playList)
    return {
        fullScreen: state.fullScreen,
        playList: state.playList,
        currentIndex: state.currentIndex,
        playing: state.playing
    }
};

export default connect(mapStateToProps)(Player)