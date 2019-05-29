import React from'react'
import MyHeader from './components/my-header/my-header'
import Player from './components/player/player'

export default class Admin extends React.Component {
    render() {
        return (
            <div className="adminWrapper">
                <MyHeader></MyHeader>
                {this.props.children}
                <Player></Player>
            </div>
        )
    }
}