import React from 'react';
import ListView from '../../base/listView/listView'
import './singer.less'
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'

let HOT_NAME = '热门';
let HOT_NAME_LEN = 10;

export default class Singer extends React.Component {

    state = {
        singerList: []
    }

    componentDidMount() {
        this._getSingerList();
    }

    _getSingerList() {
        getSingerList().then((data) => {
            console.log(data);
            if (data.code === ERR_OK) {
                let singerList = this._normalizeSong(data.data.list);
                this.setState({
                    singerList
                })
            }
        })
    }

    _normalizeSong(data) {
        let map = {
            hot: {
                key: HOT_NAME,
                items: []
            }
        };
        data.forEach((item, index) => {
            if (index < HOT_NAME_LEN) {
                map['hot'].items.push({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                    avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                })

            }

            let Findex = item.Findex;
            if (!map[Findex]) {
                map[Findex] = {
                    key: Findex,
                    items: []
                }
            }

            map[Findex].items.push({
                id: item.Fsinger_mid,
                name: item.Fsinger_name,
                avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
        })
        let ret = [];
        let hot = [];
        for (let key in map) {
            if (map[key].key.match(/[a-zA-Z]/)) {
                ret.push(map[key])
            } else if (map[key].key === HOT_NAME) {
                hot.push(map[key])
            }
        }
        ret.sort((a,b) => {
            return a.key.charCodeAt(0) - b.key.charCodeAt(0);
        })
        return hot.concat(ret)
    }

    render() {
        return (
            <div className="singer-wrapper">
                <ListView singerList={this.state.singerList}></ListView>
            </div>
        )
    }
}