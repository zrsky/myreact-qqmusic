import React from 'react';
import Scroll from '../scroll/scroll';
import './listView.less'

export default class ListView extends React.Component {

    constructor(props) {
        super(props);
        this.getListItemRef = element => {
            this.listItem = element;
        }
    }

    state = {
        probeType: 3,
        shortcutList: [],
        currentIndex: 0,
        listHeight: []
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
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps)
    //     this._calculateHeight();
    //     return true
    // }

    _setSingerList() {
        return this.props.singerList.map((singer) => {
            return (
                <li className="list-item" key={singer.key}>
                    <h2 className="title">{singer.key}</h2>
                    <ul className="list-group-item">
                        {singer.items.map((item, index) => {
                            return (
                                <li className="item" key={item.id}>
                                    <img src={item.avatar} />
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
                onTouchEnd={this.onTouchEnd}>{key}</li>
            )
        })
    }

    onTouchStart(e) {
        console.log(e.touches[0])
        e.stopPropagation();
    }

    onTouchMove(e) {
        console.log(e.touches[0])
        e.stopPropagation();
    }

    onTouchEnd(e) {
        console.log(e.touches[0])
        e.stopPropagation();
    }

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
            <Scroll probeType={this.state.probeType} data={this.props.singerList}
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