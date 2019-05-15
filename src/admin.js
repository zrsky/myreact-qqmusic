import React from'react'
import MyHeader from './components/my-header/my-header'

export default class Admin extends React.Component {
    render() {
        return (
            <div className="adminWrapper">
                <MyHeader></MyHeader>
                {this.props.children}
            </div>
        )
    }
}