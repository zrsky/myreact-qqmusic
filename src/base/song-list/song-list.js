import React from 'react';
import './song-list.less'

export default class SongList extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    componentDidMount() {

    }

    _getSongList() {
        if(this.props.song) {
            return this.props.song.map((item, index) => {
                return (
                    <li className="listItem" key={index}>
                        <div className="content">
                            <h2 className="songName">{item.name}</h2>
                            <p className="desc">{item.singer}-{item.album}</p>
                        </div>
                    </li>
                )
            })
        }
    }

    render() {
        return (
            <div className="songlist-wrapper">
                <div className="songlist">
                    <ul className="ul-wrapper">
                        {this._getSongList()}
                    </ul>
                </div>
            </div>
        )
    }
}