import React from 'react';
import './player.less'

export default class Player extends React.Component {

    state = {
        playIcon: 'icon-sequence',
        getFavoriteIcon: 'icon-not-favorite',
        iconPlay: 'icon-play',
        fullScreen: true
    }

    changeMode = () => {
        // return
    }

    prev = () => {

    }

    next = () => {

    }

    play = () => {

    }

    changeFavorite = () => {

    }

    back() {
        let fullScreen = !this.state.fullScreen;
        this.setState({
            fullScreen
        })
    }

    render() {
        return (
            <div className="player-wrapper">
                <div className="normal-player">
                    <div className="background">
                        <img width="100%" height="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558519485757&di=821bfa73254d3fc97decc7de02403a7f&imgtype=0&src=http%3A%2F%2Fhubei.sinaimg.cn%2F2014%2F0824%2FU7651P1190DT20140824115623.jpg" alt=""/>
                    </div>
                    <div className="top">
                        <div className="back" onClick={this.back}>
                            <i className="icon-back"></i>
                        </div>
                        <h1 className="title">梁静茹</h1>
                        <h2 className="subtitle">梁静茹</h2>
                    </div>
                    <div className="middle">
                        <div className="middle-l">
                            <div className="cd-wrapper">
                                <div className="cd">
                                    <img width="100%" height="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558519485757&di=821bfa73254d3fc97decc7de02403a7f&imgtype=0&src=http%3A%2F%2Fhubei.sinaimg.cn%2F2014%2F0824%2FU7651P1190DT20140824115623.jpg" alt=""/>
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
                                    <div className="bar-inner">
                                        <div className="progress"></div>
                                        <div className="progress-btn-wrapper">
                                            <div className="progress-btn"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="time time-r">4:45</span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left"><i className={this.state.playIcon} onClick={this.changeMode}></i></div>
                            <div className="icon i-left"><i onClick={this.prev} className="icon-prev"></i></div>
                            <div className="icon i-center"><i className={this.state.iconPlay} onClick={this.play}></i></div>
                            <div onClick={this.next} className="icon i-right"><i className="icon-next"></i></div>
                            <div className="icon i-right" onClick={this.changeFavorite}><i className={this.state.getFavoriteIcon}></i></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}