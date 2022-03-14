import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.css'
import logo from '../../assets/images/Logo.jpg'

const {SubMenu}=Menu

export default class LeftNav extends Component {
  render() {
    return (
    <div className='left-nav'>
      <header>
        <Link className='left-nav-link' to="/admin/home">
          <img src={logo} alt='logo'/>
          <h1>React project: Web store backend</h1>
        </Link>
        <Menu
          defaultSelectedKeys={'/home'}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="/home">
            <Link to="/admin/home">
              <span>Homepage</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="products"
            title={
              <span>
                <span>product</span>
              </span>
            }
          >
          <Menu.Item key="/category">
            <Link to="/admin/category">
              <span>category management</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/product">
            <Link to="/admin/product">
              <span>product management</span>
            </Link>
          </Menu.Item>
          </SubMenu>
        </Menu>
      </header>
    </div>
    )
  }
}
