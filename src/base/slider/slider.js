import React from'react'

export default class Slider extends React.Component {
    render() {
        return (
            <div className="slider" ref="slider">
               <div className="slider-group">
                    {this.props.children}
               </div>
            </div>
        )
    }
}