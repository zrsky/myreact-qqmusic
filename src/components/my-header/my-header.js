import React from 'react'
import Tab from '../tab/tab'
import '../../common/less/my-header.less'

export default class MyHeader extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="h-wrapper">
                    <div className="bgImg"></div>
                    <h1 className="text">Chicken Music</h1>
                </div>
                <Tab></Tab>
            </div>
        )
    }
}