import React from 'react'
import './detail.less'
import { Row } from 'antd'
import axios from '../../axios'

export default class OrderDetail extends React.Component{

    state = {
        orderInfo: {}
    }

    params = {
        page: 1
    }

    componentDidMount() {
        const orderId = this.props.match.params.orderId;
        this.request(orderId);
    }

    request = (orderId)=>{
        axios.ajax({
            type: 'get',
            url: `/order/detail?orderId=${orderId}`,
        }).then((data) => {
            const orderInfo = data.result;
            this.setState({
                orderInfo
            });
            this.renderMap(orderInfo);
        })
    }

    renderMap = (result) =>{
        this.map = new window.BMap.Map('orderDetailMap');
        // 创建地图实例  
        var point = new window.BMap.Point(116.404, 39.915);
        // 创建点坐标  
        this.map.centerAndZoom(point, 11);
        this.addMapControl();
        this.drawBikeRoute(result.position_list);
        this.drwaServiceArea(result.area);
        
    }

    // 添加控件
    addMapControl = ()=>{
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));    
        this.map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));   
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (position_list)=>{
        let length = position_list.length;
        //起点图标
        let startPoint = new window.BMap.Point(position_list[0].lon, position_list[0].lat);
        let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42),  {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })

        let marker = new window.BMap.Marker(startPoint, {icon: startIcon});  // 创建标注
        this.map.addOverlay(marker);

        //终点图标
        let endPoint = new window.BMap.Point(position_list[length-1].lon, position_list[length-1].lat);
        let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36,42),  {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })

        let marker2 = new window.BMap.Marker(endPoint, {icon: endIcon});  // 创建标注
        this.map.addOverlay(marker2);

        // 创建点坐标  
        this.map.centerAndZoom(endPoint, 11);
        
        const markPoint = position_list.map((item)=>{
            return new window.BMap.Point(item.lon, item.lat);
        })
        const polyline = new window.BMap.Polyline(markPoint, {strokeColor:"#1869AD", strokeWeight:3});   //创建折线
        this.map.addOverlay(polyline);   //增加折线
    }

    // 绘制服务区
    drwaServiceArea = (area)=>{
        const markPoint = area.map((item)=>{
            return new window.BMap.Point(item.lon, item.lat);
        })
        const polygon = new window.BMap.Polygon(markPoint, {strokeColor: '#CE0000', strokeWeight: 4, strokeOpacity: 1, fillColor: '#ff8605', fillOpacity:0.4});  //创建多边形
        this.map.addOverlay(polygon);   //增加多边形
    }

    render() {
        const orderInfo = this.state.orderInfo || {};

        return(
           <Row className="content">
                <div id="orderDetailMap" className="order-map"></div>
                <div className="detail">
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li className="detail-form-li">
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{orderInfo.mode === 1 ? '停车点':'禁停区'}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{orderInfo.order_sn}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{orderInfo.bike_sn}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{orderInfo.user_name}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{orderInfo.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li className="detail-form-li">
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{orderInfo.start_location}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{orderInfo.end_location}</div>
                            </li>
                            <li className="detail-form-li">
                                <div className="detail-form-left">行程里程</div>
                                <div className="detail-form-content">{orderInfo.distance}</div>
                            </li>
                        </ul>
                    </div>
                </div>
           </Row>
        )
    }
}