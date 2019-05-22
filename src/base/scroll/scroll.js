import React from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import './scroll.less'

export default class Scroll extends React.Component {

    state = {
        first: true
    }

    constructor(props) {
        super(props)
        this.getScrollRef = element => {
            this.scrollWrapper = element;
        }
    }

    static defaultProps = {
        probeType: 1,
        click: true,
        data: [],
        listenScroll: true,
        refreshDelay: 20,
        pullup: false,
        scroll: function (pos) {
            console.log(pos)
        }
    }

    static propTypes = {
        probeType: PropTypes.number,
        click: PropTypes.bool,
        data: PropTypes.array,
        listenScroll: PropTypes.bool,
        refreshDelay: PropTypes.number,
        pullup: PropTypes.bool
    }

    componentDidMount() {
       setTimeout(() => {
            this._initScroll();
       }, 20)
    }

    componentWillReceiveProps(nextProps) {
        console.log('props')
        console.log(nextProps)
        // this.refresh()
    }

    _initScroll() {
        if (!this.scroll) {
            this.scroll = new BScroll(this.scrollWrapper, {
                scrollX: false,
                scrollY: true,
                click: this.props.click,
                probeType: this.props.probeType,
            })
            console.log(this.scroll)
            console.log(this.scrollWrapper)
        }
        if (this.props.listenScroll) {
            this.scroll.on('scroll', (pos) => {
                console.log('scroll')
                this.props.scroll(pos)
            })
            if (this.props.pullup) {
                this.scroll.on("scrollEnd", (pos) => {
                    console.log('scrollEnd')
                })
            }
        }
    }

    //启用better-scroll
    enable() {
        if (!this.scroll) {
            return;
        }
        this.scroll.enable();
    }

    //禁用better-scroll
    disable() {
        if (!this.scroll) {
            return;
        }
        this.scroll.disable();
    }

    refresh() {
        if (!this.scroll) {
            return;
        }
        setTimeout(() => {
            this.scroll.refresh();
            console.log('刷新')
        }, 100)
    }

    scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    }
    
    scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

    render() {
        return (
            <div className="scroll-wrapper" ref={this.getScrollRef}>
                {this.props.children}
            </div>
        )
    }
}