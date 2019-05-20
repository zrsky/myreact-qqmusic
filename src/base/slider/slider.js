import React from'react'
import BetterScroll from 'better-scroll';
import PropTypes from 'prop-types';
import './slider.less';
import {addClass} from '../../common/js/dom';

export default class Slider extends React.Component {

    constructor(props) {
        super(props)
        this.setContainerRef = element => {
            this.container = element;
        }
        this.setScrollRef = element => {
            this.sliderGroup = element;
        }
        
    }

    state = {
        dots: 0,
        currentPageIndex: 0,
    }

    static defaultProps = {
        speed: 400,
        loop: true,
        threshold: 0.3,
        click: true,
        autoPlay: true,
        interval: 4000
    }

    static propTypes = {
        speed: PropTypes.number,
        loop: PropTypes.bool,
        threshold: PropTypes.number,
        autoPlay: PropTypes.bool,
        click: PropTypes.bool,
        interval: PropTypes.number
    }

    componentDidMount() {
        let self = this;
        this.children = this.sliderGroup.children;
        let length = this.children.length
        this.setState({
            dots: length
        })
        self._setSliderWidth();

        setTimeout(function(){
            self._initScroll();
            if(self.props.autoPlay) {
                self._play();
            }
        }, 20);
        // console.log(this.scroll)
        // console.log(this.props)"better-scroll": "^0.1.15",
        window.addEventListener('resize', () => {
            this._setSliderWidth()
        }, false)
    }

    //初始化better-scroll
    _initScroll = () => {
        if(!this.slider) {
            console.log(this.container)
            this.slider = new BetterScroll(this.container, {
                scrollX: true,
				scrollY: false,
				// snap: true, // 手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
				// snapLoop: self.props.loop, // 无缝循环轮播
				// snapThreshold: 0.3,
				// snapSpeed: 400,
                snap: {
                    loop: this.props.loop,
                    threshold: this.props.threshold,
                    speed: this.props.speed
                },
				momentum: false, // 滑动惯性
				click: true
            })

            this.slider.on('scrollEnd', () => {
                let currentPageIndex = this.slider.getCurrentPage().pageX;
                // console.log(currentPageIndex)
                // if(this.props.loop) {
				// 	currentPageIndex -= 1;
				// }
                this.setState({
                    currentPageIndex
                })
                if(this.props.autoPlay) {
                    clearInterval(this.timer)
                    this._play();
                }

            })
        }
    }

    _play() {
        this.timer = setInterval(() => {
            // let pageIndex = this.state.currentPageIndex + 1;
            // this.slider.goToPage(pageIndex, 0, 400);
            // console.log(pageIndex)
            this.slider.next();
        }, this.props.interval)
    }

    _setSliderWidth() {
        let sliderWidth = this.container.clientWidth || 0;
        if(!this.children.length || this.children.length === 0) {
            return;
        }
        let width = 0;
        let children = [].slice.call(this.children);
        children.forEach((child,index) => {
            addClass(child, 'slider-item');
            child.style.width = sliderWidth + 'px';
            width += sliderWidth;
        })
        console.log(this.props.loop)
        if(this.props.loop) {
            width += 2 * sliderWidth;
        }
        this.sliderGroup.style.width = width + 'px';
    }

    getDots() {
        let dotLen = [];
        for(let i = 0; i < this.state.dots; i++) {
            dotLen.push(i);
        }
        return dotLen.map((item, index) => {
            return <div key={index} className={`dot ${index === this.state.currentPageIndex ? 'active' : ''}`}></div>
        })
    }

    render() {
        return (
            <div className="slider-wrapper" ref={this.setContainerRef}>
               <div className="slider-group" ref={this.setScrollRef}>
                    {this.props.children}
               </div>
               <div className="dots-wrapper">
                    {this.getDots()}
               </div>
            </div>
        )
    }
}