import React, { Component } from 'react';
import {BrowserRouter, Navigate,Route,Routes} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home.jsx'
import Category from '../category/category.jsx'
import Product from '../products/products.jsx'
import Role from '../role/role.jsx'
import User from '../user/user.jsx'
import Bar from '../chart/bar.jsx'
import Line from '../chart/line.jsx'
import Pie from '../chart/pie.jsx'

const { Content, Footer,Sider} = Layout;


export default class Admin extends Component{
    render(){
        //读取保存的user
        const user = memoryUtils.user
        if(!user._id){
            return<Navigate  to="/"/>
        }
        return(
            <Layout className='Layout' style={{height:"100%"}}>
            <Sider>
              <LeftNav/>
            </Sider>
            <Layout>
              <Header/>
              <Content style={{margin: 20, backgroundColor: '#fff'}}>
                    <Routes>
                        <Route path="*" element={<Navigate to="/admin/home" />} />
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/category' element={<Category/>}/>
                        <Route path='/product' element={<Product/>}/>
                        <Route path='/user' element={<User/>}/>
                        <Route path='/role' element={<Role/>}/>
                        <Route path="/charts/bar" element={<Bar/>}/>
                        <Route path="/charts/pie" element={<Pie/>}/>
                        <Route path="/charts/line" element={<Line/>}/>
                    </Routes>
              </Content>
              <Footer style={{textAlign: 'center', color: '#cccccc'}}>
                  Recomend use chorm for the best
              </Footer>
            </Layout>
          </Layout>
        )
    }
}

