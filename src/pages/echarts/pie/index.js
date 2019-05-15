import React from 'react'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { Card } from 'antd'
import echartsTheme from '../themeLight'

export default class Pie extends React.Component{

    componentWillMount() {
        echarts.registerTheme('sky', echartsTheme);
    }

    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    center: ['50%', '55%'],
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1200
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    center: ['50%', '55%'],
                    radius: ['50%', '70%'],
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1200
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        },
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                subtext: '纯属虚构',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    center: ['50%', '55%'],
                    data: [
                        {
                            name: '周一',
                            value: 1000
                        },
                        {
                            name: '周二',
                            value: 1200
                        },
                        {
                            name: '周三',
                            value: 2000
                        },
                        {
                            name: '周四',
                            value: 1500
                        },
                        {
                            name: '周五',
                            value: 3000
                        },
                        {
                            name: '周六',
                            value: 2000
                        },
                        {
                            name: '周日',
                            value: 1200
                        },
                    ].sort((a,b)=>{
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return option;
    }

    render() {
        return(
            <div>
                <Card title="饼状图一">
                    <ReactEcharts option={this.getOption()} theme="sky" style={{height:500}} />
                </Card>
                <Card title="饼状图二" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} theme="sky" style={{height:500}} />
                </Card>
                <Card title="饼状图三" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} theme="sky" style={{height:500}} />
                </Card>
            </div>
        )
    }
}