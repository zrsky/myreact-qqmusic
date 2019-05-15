import React from 'react'
import { Card, Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component{

    handleSubmit=()=>{
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }else{
              console.log(values);
          }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <Card title="登陆行内表单">
                    <Form style={{textAlign:'left'}} layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem>
                            <Input placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入用密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登陆水平表单" style={{marginTop:10}}>
                    <Form style={{width:300,textAlign:"left"}} onSubmit={this.handleSubmit} >
                        <FormItem>
                            {getFieldDecorator('username',{
                                rules:[{
                                    required: true,
                                    message: '请输入用户名',
                                },{
                                    pattern: /\\w+/,
                                    message: '只能是数字字母'
                                }]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名"></Input>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('pwd', {
                                rules: [{
                                    required: true,
                                    message: '请输入用密码'
                                }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用密码"></Input>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember',{
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox style={{float:"left"}}>记住密码</Checkbox>
                            )}
                            <a style={{float:"right"}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button style={{float:"left"}} type="primary" htmlType="submit">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(LoginForm);