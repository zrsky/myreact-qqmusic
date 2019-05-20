import React from 'react';
import Scroll from '../scroll/scroll';
import './listView.less'
import { getData } from '../../common/js/dom'

const ANCHOR_HEIGHT = 16

export default class ListView extends React.Component {

    constructor(props) {
        super(props);
        this.getListItemRef = element => {
            this.listItem = element;
        }
        this.getScroll = element => {
            this.scrollRef = element
        }
        this.touch = {}
    }

    state = {
        probeType: 3,
        shortcutList: [],
        currentIndex: 0,
        listHeight: [],
        prevSingerList: this.props.singerList
    }

     componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if(nextProps.singerList !== this.props.singerList) {
            this._calculateHeight();
            this.scrollRef.refresh()
        }
    }

    componentDidMount() {
        setTimeout(() => {
            // let shortcutList = this._setShortcutList()
            this._calculateHeight();
            // this.setState({
            //     shortcutList
            // })
        }, 200)
    }

    selectSinger = (singer) => {
        this.props.selectSinger(singer)
    }

    _setSingerList() {
        return this.props.singerList.map((singer) => {
            return (
                <li className="list-item" key={singer.key}>
                    <h2 className="title">{singer.key}</h2>
                    <ul className="list-group-item">
                        {singer.items.map((item, index) => {
                            return (
                                <li className="item" key={item.id} data-item={item} onClick={(e) => {this.selectSinger(item)}}>
                                    <img src={item.avatar} alt="加载失败" />
                                    <span>{item.name}</span>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })
    }

    _getShortcutList() {
        // console.log(this.props.singerList)
        return this.props.singerList.map((singer) => {
            return singer.key.substr(0, 1);
        });
    }

    _setShortcutList() {
        let shortcutList = this._getShortcutList();
        return shortcutList.map((key, index) => {
            return (
                <li key={key} className={this.state.currentIndex === index ? 'current' : ''}
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                data-index={index}>{key}</li>
            )
        })
    }

    onTouchStart = (e) => {
        e.stopPropagation();
        let index = getData(e.target, 'index');
        this.touch.startY = e.touches[0].pageY;
        this.touch.index = index;
        this.scrollTo(index);
    }

    onTouchMove = (e) => {
        e.stopPropagation();
        this.delta = (e.touches[0].pageY - this.touch.startY) / ANCHOR_HEIGHT - 1 | 0;
        let index = parseInt(this.delta) + parseInt(this.touch.index)

        this.scrollTo(index);
    }

    scrollTo(index) {
        if(!index) {
            return
        }else if(index < 0) {
            index = 0;
        }else if(index > this.listHeight.length){
          index = this.listHeight.length - 1;
        }
        this.scrollRef.scrollToElement(this.listItem.children[index], 0) 
    }

    // onTouchEnd(e) {
    //     console.log(e.touches[0])
    //     e.stopPropagation();
    // }

    _calculateHeight() {
        let height = 0;
        this.listHeight = [];
        this.listHeight.push(height);
        if (this.listItem) {
            for (let i = 0; i < this.listItem.children.length; i++) {
                height += this.listItem.children[i].clientHeight;
                this.listHeight.push(height);
            }
        }
    }

    scroll = (pos)=> {
        let currentIndex = 0;
        let scrollY = pos.y;
        for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (scrollY > 0) {
                currentIndex = 0;
                this.fixedTitle = "";
                this.setState({
                    currentIndex
                })
                return;
            }
            if (!height2 || -scrollY >= height1 && -scrollY < height2) {
                currentIndex = i;
                this.setState({
                    currentIndex
                }, ()=>{
                })

                // this.fixedTitle = this.data[i] ? this.data[i].key : '';
                // this.diff = height2 + newVal + 20*i;
                return;
            }
            currentIndex = 0;
            
            this.setState({
                currentIndex
            })
        }
    }

    render() {
        return (
            <Scroll ref={this.getScroll} probeType={this.state.probeType} data={this.props.singerList}
                scroll={this.scroll}>
                <ul className="list-group" ref={this.getListItemRef}>
                    {this._setSingerList()}
                </ul>
                <div className="list-shortcut">
                    <ul>
                        {this._setShortcutList()}
                    </ul>
                </div>
            </Scroll>
        )
    }
}