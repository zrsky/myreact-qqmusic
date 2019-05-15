import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import echartTheme from '../echartTheme'
import { Card } from 'antd'

export default class Bar extends React.Component{

    componentWillMount() {
        echarts.registerTheme('sky', echartTheme);
    }

    getOptions = ()=>{
        let option = {
            title: {
                text: '用户骑行量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                enterable: true
            },
            legend: {
                data:['OFO']
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                name: 'OFO',
                data: [120, 200, 150, 80, 70, 110, 130]
            }]
        }
        return option
    }

    getOptions2 = ()=>{
        let option = {
            title: {
                text: '用户骑行量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                enterable: true
            },
            legend: {
                data:['OFO','膜拜','哈罗']
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                name: 'OFO',
                data: [160, 300, 550, 180, 170, 210, 230]
            },{
                type: 'bar',
                name: '膜拜',
                data: [120, 200, 250, 280, 270, 310, 330]
            },{
                type: 'bar',
                name: '哈罗',
                data: [300, 100, 150, 80, 370, 110, 430]
            }]
        }
        return option
    }

    render() {
        return (
            <div>
                <Card title="柱形图表一">
                    <ReactEcharts option={this.getOptions()} theme="sky" style={{height:500}}/>
                </Card>
                <Card title="柱形图表二" style={{height:500,marginTop:10}}>
                    <ReactEcharts option={this.getOptions2()} theme="sky" style={{height:500}}/>
                </Card>
            </div>
        )
    }
}