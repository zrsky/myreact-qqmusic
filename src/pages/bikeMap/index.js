import React from 'react'
import BaseForm from '../../BaseForm'
import { Form, Card } from 'antd'
import axios from '../../axios'

export default class BikeMap extends React.Component {

    state = {
        total_count: 0
    }

    componentDidMount() {
        this.requestList();
    }

    handleSubmit = (params)=>{
        this.requestList();
    }

    params = {
        page:1
    }

    // 列表请求
    requestList = ()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    total_count:res.result.total_count
                },()=>{
                    
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result)=>{
        this.map = new window.BMap.Map("container");
        this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);
        const top_left_navigation = new window.BMap.NavigationControl({
                // 靠左上角位置
                anchor: window.BMAP_ANCHOR_TOP_RIGHT,
                // LARGE类型
                type: window.BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
              })
        const top_left_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
            
        
        this.map.addControl(top_left_navigation);
        this.map.addControl(top_left_control);
        
        let list = result.route_list;
        //绘制起点
        let gps1 = list[0].split(',');
        const start_point = new window.BMap.Point(gps1[0], gps1[1]);
        const start_icon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var startMarker = new window.BMap.Marker(start_point,{icon:start_icon});  // 创建标注
	    this.map.addOverlay(startMarker);              // 将标注添加到地图中
        //绘制终点
        let gps2 = list[list.length-1].split(',');
        let end_point = new window.BMap.Point(gps2[0], gps2[1]);
        let end_icon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var endMarker = new window.BMap.Marker(end_point,{icon:end_icon});  // 创建标注
        this.map.addOverlay(endMarker);              // 将标注添加到地图中
        this.map.centerAndZoom(end_point,11);

        //绘制行驶路线
        let line = [];
        list.forEach((item)=>{
            let routePoint = item.split(',');
            line.push(new window.BMap.Point(routePoint[0],routePoint[1]))
        })
        let polyline = new window.BMap.Polyline(line, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyline);

        //绘制服务区域
        let service_area = [];
        let service_list = result.service_list;
        service_list.forEach((item) => {
            service_area.push(new window.BMap.Point(item.lon, item.lat));
        })
        let polygon = new window.BMap.Polygon(service_area, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polygon);

        //绘制自行车
        let bike = result.bike_list;
        let bike_icon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        bike.forEach((item) => {
            let gps = item.split(',');
            let bike_point = new window.BMap.Point(gps[0], gps[1]);
            let bikeMarker = new window.BMap.Marker(bike_point,{icon:bike_icon});  // 创建标注
            this.map.addOverlay(bikeMarker); 
        })
    }

    render() {
        const formList = [{
            type: '时间查询',
            label: '订单时间',
        },{
            type: 'select',
            label: '订单状态',
            field: 'order_status',
            initialValue: '0',
            width: 100,
            list: [{
                value: '0',
                name: '全部'
            },{
                value: '1',
                name: '进行中'
            },{
                value: '2',
                name: '行程结束'
            }]

        }]
        return (
            <div>
                <Card>
                    <Form layout="inline">
                        <BaseForm formList={formList} handleSubmit={this.handleSubmit}></BaseForm>
                    </Form>
                </Card>
                <Card style={{marginTop: 10}}>
                    <div style={{textAlign: 'left',
                marginBottom: 20}}>总共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        )
    }
}