import React from 'react'
import { Card, Form, Input, Button, Select, Radio, DatePicker, Table, Modal } from 'antd'
import axios from '../../axios'
import BaseForm from '../../BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component{

    state = {
        dataSource: [],
        selectedRowKeys: [],
        selectItem: null
    }

    params = {
        page: 1,
        pagination: {}
    }

    formList = [
        {
            type: 'select',
            label: '城市',
            field: 'city_id',
            initialValue: '1',
            placeholder: '全部',
            width: 100,
            list: [{
                value: '',
                name: '全部'
            },{
                value: '1',
                name: '北京市'
            },{
                value: '2',
                name: '上海市'
            },{
                value: '3',
                name: '杭州市'
            }]
        },{
            type: '时间查询',
            label: '订单时间'
        },{
            type: 'select',
            label: '订单状态',
            field: 'op_mode',
            initialValue: '1',
            placeholder: '全部',
            width: 100,
            list: [{
                value: '',
                name: '全部'
            },{
                value: '1',
                name: '进行中'
            },{
                value: '2',
                name: '结束行程'
            }]
        }
    ]

    componentWillMount() {
        const params = {
            page: this.params.page
        };
        this.request(params);
    }

    handleSubmit = (params)=>{
        params = Object.assign(params, this.params);
        this.request(params);
    }

    request = (params)=>{
        axios.request(this, '/order/list', params);
        
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        this.params.page = pager.current;
        this.request();
    }

    onRowClick = (record, index) => {
        console.log(record)
        const selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectItem: record
        })
    }

    openOrderDetail = ()=>{
        let item = this.state.selectItem;
        if(!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank');
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };
        const columns = [{
            title: '订单编号',
            dataIndex: 'order_sn',
            key: 'order_sn'
        },{
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn'
        },{
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name',
        },{
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
        },{
            title: '里程',
            dataIndex: 'distance',
            key: 'distance',
            render: item => item/1000 + 'km' 
        },{
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time',
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status'
        },{
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },{
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },{
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee'
        },{
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay'
        }]

        return(
            <div className="city">
               <Card>
                    <Form layout="inline" style={{textAlign:'left'}}>
                        <BaseForm formList={this.formList} handleSubmit={this.handleSubmit} />
                    </Form>
               </Card>
               <Card style={{marginTop:10}}>
                  <Button type="primary" style={{float:'left',marginRight:20}} onClick={this.openOrderDetail}>订单详情</Button>
                  <Button type="primary" style={{float:'left'}}>结束订单</Button>
                  <Table bordered columns={columns} dataSource={this.state.dataSource} style={{marginTop:50}} pagination={this.state.pagination} onChange={this.handleTableChange} rowSelection={rowSelection} onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        }
                    };
                }}></Table>
               </Card>
            </div>
        )
    }
}