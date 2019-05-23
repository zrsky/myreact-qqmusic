import React from 'react'
import MusicList from '../music-list/music-list'
import { getMusicList } from '../../api/rank'
import { ERR_OK } from '../../api/config'
import {createSong} from '../../common/js/song'
import './top-list.less'

export default class TopList extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props.match.params)
        this.id = this.props.match.params.id;
    }

    state = {
        imgUrl: '',
        title: '',
        song: []
    }

    componentDidMount() {
        this._getTopList();
    }

    _getTopList() {
        getMusicList(this.id).then((data) => {
            console.log(data)
            if (data.code === ERR_OK) {
                let songs = this._normalizeSongs(data.songlist)
                let imgUrl = songs[0].image;
                let title = data.topinfo.ListName;
                this.setState({
                    imgUrl,
                    title,
                    songs
                })
            }
        })
    }

    _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
            const musicData = item.data
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }

    render() {
        return (
            <div className="toplist-wrapper">
                <MusicList song={this.state.songs} imgUrl={this.state.imgUrl} title={this.state.title}></MusicList>
            </div>
        )
    }
}