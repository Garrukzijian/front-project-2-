import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Navigate} from 'react-router-dom'

import Rules from'./Validation rules/Rules.json';
import {reqLogin} from '../../api'
import logo from '../../assets/images/Logo.jpg';
import './login.css'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item


export default class Login extends Component {

    onFinish =async(values)=>{
        const{username,password}=values
        const result = await reqLogin(username,password)

        if(result.status===0){
            const user = result.data
            storageUtils.saveUser(user)
            memoryUtils.user=user

            //change to the admin page
            message.success('login in succeful')
            window.location.href="/admin"
        }
        else{
            message.error(result.msg)
        }
    };

    onFinishFailed = errorInfo=>{
        message.error(errorInfo)

    };

    validatePwd =(rules,value,callback) =>{
        if(!value) {
            return Promise.reject('Please enter password!')
          } else if (value.length<4) {
            return Promise.reject('password cannot less than 4.')
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject('full of them must be A-Z or a-z or number or "_"')
          } else {
            return Promise.resolve() 
          }
    }

    render() {
        const user = memoryUtils.user
        if(user._id){
            return<Navigate to='/admin/*'/>
        }
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React project: Web store backend (username:admin password:admin)</h1>
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