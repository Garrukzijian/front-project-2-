import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import './index.css'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/Logo.jpg'

const {SubMenu}=Menu

export default class LeftNav extends Component {

  getMenuNodes=(menuList)=>{
    return menuList.reduce((pre,item)=>{
      if(!item.children){
        pre.push(
        <Menu.Item key={item.key}>
          <Link to={"/admin"+item.key}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
        )
      }else{
        pre.push(
          <SubMenu
          key={item.key}
          title={
            <span>
              <span>{item.title}</span>
            </span>
          } 
        >
          {
            this.getMenuNodes(item.children)
          }
        </SubMenu>
        )
      }

      return pre
    },[])

  }

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
          {
            this.getMenuNodes(menuList)
          }
        </Menu>
      </header>
    </div>
    )
  }
}
