import React from'react'
import Slider from '../../base/slider/slider'
import { getRecommend } from '../../api/recommend'
import {ERR_OK} from '../../api/config'

export default class Recommend extends React.Component {
    state= {
        threshold: 0.2,
        speed: 500,
        recommendData: []
    }

    componentWillMount() {
       this.getRecommendData()
    }

    getRecommendData = () => {
         getRecommend().then((data) => {
            if(data.code == ERR_OK) {
                this.setState({
                    recommendData: data.data.slider
                })
            }
        })
    }

    getSlider = (data) => {
       return data.map((item,index) => {
            return <div key={item.id}><a href={item.linkUrl}><img src={item.picUrl} /></a></div>
        })
    }

    render() {
        return (
            <div className="recommendWrapper">
                {this.state.recommendData.length > 0 ? <div className="slider">
                    <Slider loop={true} threshold={this.state.threshold} speed={this.state.speed}>
                        {this.getSlider(this.state.recommendData)}
                    </Slider>
                </div> : ''}
            </div>
        )
    }
}