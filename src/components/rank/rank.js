import React from 'react'
import {getTopList} from '../../api/rank'
import {ERR_OK} from '../../api/config'
import Scroll from '../../base/scroll/scroll'
import Loading from '../../base/loading/loading'
import PropTypes from 'prop-types'
import './rank.less'

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  static contextTypes = {
        router: PropTypes.object.isRequired
  }

  state = {
    topList: []
  }

  componentDidMount() {
    this._getTopList();
  }

  _getTopList() {
    getTopList().then((data) => {
      console.log(data)
      if(data.code === ERR_OK) {
        this.setState({
          topList: data.data.topList
        })
      }
    })
  }

  selectItem(list) {
    let id = list.id;
    this.context.router.history.push(`/rank/${id}`, {id: id});
  }

  _setTopList() {
    return this.state.topList.map((list, pIndex) => {
      return (
        <li className="list-item" key={pIndex} onClick={(e)=>{this.selectItem(list)}}>
          <img className="avatar" src={list.picUrl} alt="加载失败" />
          <ul className="list-ul-wrapper">
            {list.songList.map((song,index) => {
              return (
                <li className="item" key={index}>{index} {song.songname}-{song.singername}</li>
              )
            })}
          </ul>
        </li>
      )
    })
  }
 
  render() {
    return (
      <div className="rank-wrapper">
        {this.state.topList.length === 0 ? <Loading></Loading> : ''}
         <Scroll data={this.state.topList}>
           <ul className="rank-ul-wrapper">
              {this._setTopList()}
           </ul>
         </Scroll>
         {this.props.children}
      </div>
    );
  }
}
