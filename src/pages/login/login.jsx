import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Rules from'./Validation rules/Rules.json';
import logo from './images/Logo.jpg';
import './login.css'

const Item = Form.Item


export default class Login extends Component {

    onFinish =values=>{
        console.log('Received values of form',values);
        console.log(values.username);
        console.log(values.password);
        alert("send the requset,username="+values.username+",password="+values.password)
    };

    onFinishFailed = errorInfo=>{
        console.log('Failed:', errorInfo);

    };

    validatePwd =(rule,value,callback) =>{
        if(!value) {
            callback('Please enter password!')
          } else if (value.length<6) {
            callback('password cannot less than 6.')
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('full of them must be A-Z or a-z or number or "_"')
          } else {
            callback() 
          }
    }

    render() {
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React project: Web store backend</h1>
                </div>
                <div className='login-content'>
                    <h1>User Login</h1>
                    <Form 
                        onFinish={this.onFinish}  
                        onFinishFailed={this.onFinishFailed} 
                        autoComplete="off"
                        className="login-form">
                        <Item 
                            name="username"
                            initialValue={''}
                            rules={Rules["username"]}>
                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Item>
                        <Item 
                            name="password" 
                            initialValue={''}
                            rules={[{validator:this.validatePwd}]}>
                            <Input
                                prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType='submit' className='login-form-button'>log in</Button>
                        </Item>
                    </Form>
                </div>
            </div>
        )
    }
}



/* 
1.must put username and password
2.lenth more than 4
3.full of them must be A-Z or a-z or number

*/