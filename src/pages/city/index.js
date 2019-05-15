import React from 'react'
import { Card, Form, Input, Button, Select, CheckBox, Radio, DatePicker, Table } from 'antd'
import axios from '../../axios'
import { Pagination } from '../../utils/utils'

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component{

    state = {
        dataSource: []
    }

    params = {
        page: 1,
        pagination: {}
    }

    componentWillMount() {
        this.request();
    }

    request = ()=>{
        axios.ajax({
            type: 'get',
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((data) => {
            const pager1 = {...this.state.pagination};
            const pager2 = Pagination(data);
            const pagination = Object.assign(pager1, pager2);
            const list = data.result['item_list'];
            list.map((item,index)=>{
                item.key = index;
            })
            this.setState({
                dataSource: list,
                pagination: pagination
            })
        })
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

    render() {
    
        const columns = [{
            title: '城市ID',
            dataIndex: 'id',
            key: 'id'
        },{
            title: '城市名称',
            dataIndex: 'name',
            key: 'name'
        },{
            title: '用车模式',
            dataIndex: 'mode',
            key: 'mode',
            render: mode => (
                <span>{mode === 1 ? '停车点' : '禁停区'}</span>
            )
        },{
            title: '营运模式',
            dataIndex: 'op_mode',
            key: 'op_mode',
            render: op_mode => (
                <span>{op_mode === 1 ? '加盟' : '自营'}</span>
            )
        },{
            title: '授权加盟商',
            dataIndex: 'franchisee_name',
            key: 'franchisee_name'
        },{
            title: '城市管理员',
            dataIndex: 'city_admins',
            key: 'city_admins',
            render: city_admins => (
                city_admins.map(item => {
                    return item.user_name
                }).join(',')
            )
        },{
            title: '城市开通时间',
            dataIndex: 'open_time',
            key: 'open_time'
        },{
            title: '操作时间',
            dataIndex: 'update_time',
            key: 'update_time'
        },{
            title: '操作人',
            dataIndex: 'sys_user_name',
            key: 'sys_user_name'
        }]

        return(
            <div className="city">
               <Card>
                    <SearchForm />
               </Card>
               <Card style={{marginTop:10}}>
                  <Button type="primary" style={{float:'left'}}>开通城市</Button>
                  <Table bordered columns={columns} dataSource={this.state.dataSource} style={{marginTop:50}} pagination={this.state.pagination} onChange={this.handleTableChange}></Table>
               </Card>
            </div>
        )
    }
}

class SearchForm extends React.Component{

    state = {
        // city: '1',
        renderOptions: ''
    }

    componentWillMount() {
        //城市
        const options = [{
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
        }];
        options.map((item,index) => {
            item.key = index;
        })
        const renderOptions = this.renderOptions(options);

        //用车模式
        const options2 = [{
            value: '',
            name: '全部'
        },{
            value: '1',
            name: '指定停车点模式'
        },{
            value: '2',
            name: '禁停区模式'
        }];
        options2.map((item,index) => {
            item.key = index;
        })
        const renderOptions2 = this.renderOptions(options2);

        //营运模式
        const options3 = [{
            value: '',
            name: '全部'
        },{
            value: '1',
            name: '自营'
        },{
            value: '2',
            name: '加盟'
        }];
        options3.map((item,index) => {
            item.key = index;
        })
        const renderOptions3 = this.renderOptions(options3);

        //加盟商授权状态
        const options4 = [{
            value: '',
            name: '全部'
        },{
            value: '1',
            name: '已授权'
        },{
            value: '2',
            name: '不授权'
        }];
        options4.map((item,index) => {
            item.key = index;
        })
        const renderOptions4 = this.renderOptions(options4);
        this.setState({
            renderOptions,
            renderOptions2,
            renderOptions3,
            renderOptions4,
            
        })
    }

    renderOptions = (options)=>{
        return options.map((item,index) => {
            return <Option value={item.value} key={item.key}>{item.name}</Option>
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
    }    

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="inline" style={{textAlign:'left'}}>
                <FormItem label="城市">
                    {getFieldDecorator('city_id')(
                        <Select style={{width:100}} placeholder="全部">
                            { this.state.renderOptions }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="用车模式">
                    {getFieldDecorator('mode')(
                        <Select style={{width:150}} placeholder="全部">
                            { this.state.renderOptions2 }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="营运模式">
                    {getFieldDecorator('op_mode')(
                        <Select style={{width:100}} placeholder="全部">
                            { this.state.renderOptions3 }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {getFieldDecorator('auth_status')(
                        <Select style={{width:100}} placeholder="全部">
                            { this.state.renderOptions4 }
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleSubmit} style={{marginRight:20,marginLeft:20}}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

SearchForm = Form.create()(SearchForm);