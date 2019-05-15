import React from 'react'
import { Modal, Button, Card, Form, Radio, Input, Select, DatePicker } from 'antd'
import BaseForm from '../../BaseForm'
import axios from '../../axios'
import { updateSelectedItem } from '../../utils/utils'
import ETable from '../../components/Etable'
import '../../style/common.less'
import Moment from 'moment'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const confirm = Modal.confirm;

export default class User extends React.Component {

    state = {
        dataSource: [],
        selectedRowKeys: [],
        selectItem: null,
        pagination: {},
        isVisible: false,
        title: '',
        type: '',
        userInfo: null
    }

    params = {
        page: 1
    }

    componentWillMount() {
        const params = this.params;
        console.log('before request')
        this.request(params);
        console.log('end request')
    }

    handleSubmit = (params)=>{
        params = Object.assign(params, this.params);
        this.request(params);
    }

    request = (params)=>{
        axios.request(this, '/table/list1', params);    
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

    handleOperate = (type)=>{
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            });
        }else if(type == 'edit'){
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                  });
                return;
            }
            this.setState({
                title: '编辑员工',
                isVisible: true,
                type
            });
        }else if(type == "detail") {
            let item = this.state.selectedItem;
            console.log(item)
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                  });
                return;
            }
            this.setState({
                title: '员工详情',
                isVisible: true,
                type
            });
        }else if(type == 'delete') {
            let _this = this;
            let item = this.state.selectedItem;
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个员工'
                });
                return;
            }
            confirm({
                title: '提示',
                content: '确认要删除吗？',
                onOk() {
                    axios.ajax({
                        type: "get",
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res) => {
                        if (res.code == 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.request();
                        }
                    })
                }
              });
        }
        console.log( item && type !== 'create')
        if( item && type != 'create' ){
            console.log('create')
            let userInfo = item;
            this.setState({
                userInfo 
            })
        }
    }

    handleOK = ()=>{
        this.ModalForm.props.form.validateFields((err, values) => {
            if (!err) {
                let type = this.state.type;
                let data = this.ModalForm.props.form.getFieldsValue();
                axios.ajax({
                    type: 'get',
                    url: type == 'create' ? '/user/add' : '/user/edit',
                    data: {
                        params: {
                            ...data
                        }
                    }
                }).then((res) => {
                    if (res.code == 0) {
                        this.setState({
                            isVisible: false
                        })
                        Modal.info({
                            title: '提示',
                            content: '操作成功'
                          });
                        this.request();
                    }
                })
            }
          });
    }

    handleCancel = ()=>{
        console.log('cancel')
        this.setState({
            isVisible: false
        })
        this.setState({
            userInfo: null
        })
        this.ModalForm.props.form.resetFields();
    }

    render() {

        let footer = {};
        if(this.state.type === 'detail') {
            footer = {
                footer: null
            }
        }
        const formList = [{
                type: 'input',
                placeholder: '请输入用户名',
                field: 'user_name',
                width: 200
            },{
                type: 'input',
                placeholder: '请输入手机号',
                field: 'mobile',
                width: 200
            },{
                type: 'date',
                label: '请选择入职日期',
                placeholder: '请输入日期',
                field: 'date',
                width: 200
            }];

        const columns = [{
                title: 'id',
                dataIndex: 'id',
                },{
                title: '用户名',
                dataIndex: 'username',
                },{
                title: '性别',
                dataIndex: 'sex',
                render: sex => sex === 1 ? '男' : '女'
            },{
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    let config = {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }
                    return config[state];
                }
            },{
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config = {
                        '1':'游泳',
                        '2':'打篮球',
                        '3':'踢足球',
                        '4':'跑步',
                        '5':'爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }
                    return config[interest];
                }
              },{
                title: '婚姻',
                dataIndex: 'isMarried',
                render(isMarried){
                    return isMarried?'已婚':'未婚'
                }
              },{
                title: '生日',
                dataIndex: 'birthday'
              },{
                title: '联系地址',
                dataIndex: 'address'
              },{
                title: '早起时间',
                dataIndex: 'time'
              }];

        return (
            <div className="User">
                <Card>  
                    <Form layout="inline">
                        <BaseForm  formList={formList} handleSubmit={this.handleSubmit} />
                    </Form>
                </Card>
                <Card style={{marginTop:10}}>
                    <div className="operate-wrap">
                        <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                        <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                        <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                        <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                    </div>
                    <ETable 
                        columns={columns}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        updateSelectedItem={updateSelectedItem.bind(this)}
                        dataSource={this.state.dataSource}
                        handleTableChange={this.handleTableChange}
                        pagination={this.state.pagination}
                        style={{marginTop:50}}
                    />
                </Card>
                <Modal
                    visible={this.state.isVisible}
                    title={this.state.title}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    { ...footer }
                >
                    <ModalForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(form) => this.ModalForm = form} />
                </Modal>
            </div>
        )
    }
}


class ModalForm extends React.Component{
    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state]
    }
    render() {
       const type = this.props.type;
       const userInfo = this.props.userInfo || {};
       console.log(userInfo)
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 16
            }
        };
        return(
            <Form layout="horizontal" >
                <FormItem label="姓名" {...formItemLayout}>
                 {  
                    userInfo && type == 'detail' ? userInfo.username :
                     getFieldDecorator('user_name', {
                        initialValue: userInfo.username,
                        rules: [{
                            required: true,
                            message: '必填'
                        }]
                    })(
                        <Input placeholder="请输入姓名"></Input>
                    )}
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                        getFieldDecorator('sex', {
                        initialValue: userInfo.sex,
                        rules: [{
                            required: true,
                            message: '必选'
                        }]
                    })(
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem  label="状态" {...formItemLayout}>
                
                    {
                        userInfo && type=='detail'?this.getState(userInfo.state):
                        getFieldDecorator('state', {
                        initialValue:userInfo.state,
                        rules: [{
                            required: true,
                            message: '必选'
                        }]
                    })(
                        <Select>
                            <Option value={1}>咸鱼一条</Option>
                            <Option value={2}>风华浪子</Option>
                            <Option value={3}>北大才子一枚</Option>
                            <Option value={4}>百度FE</Option>
                            <Option value={5}>创业者</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    
                    {
                        userInfo && type=='detail'?userInfo.birthday:
                        getFieldDecorator('birthday', {
                        initialValue:Moment(userInfo.birthday),
                        rules: [{
                            required: true,
                            message: '必填'
                        }]
                    })(
                        <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择日期"
                      />  
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type == 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                        <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

ModalForm = Form.create()(ModalForm);
