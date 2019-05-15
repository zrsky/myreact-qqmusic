import React from 'react'
import { NavLink } from 'react-router-dom';
import './tab.less'

export default class Tab extends React.Component {
    render() {
        return (
            <div className="tabWrapper">
                <ul className="ul-wrapper">
                    <li><NavLink to="/recommend">推荐</NavLink></li>
                    <li><NavLink to="/singer">歌手</NavLink></li>
                    <li><NavLink to="/rank">排行</NavLink></li>
                    <li><NavLink to="/search">搜索</NavLink></li>
                </ul>
            </div>
        )
    }
}