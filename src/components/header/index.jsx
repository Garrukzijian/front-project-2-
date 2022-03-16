import React, { Component } from 'react'
import {Modal} from 'antd'
import {formateDate} from '../../utils/dateUtils'
import {withRouter} from '../../config/withRouter'
import memoryUtils from '../../utils/memoryUtils'
import './index.css'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'


class Header extends Component {

  state ={
    currentTime:formateDate(Date.now())

  }

  logout=()=>{
    Modal.confirm({
      title:'logout?',
      onOk(){
        console.log('OK');
        storageUtils.removeUser()
        memoryUtils.user={}
        window.location.href="/"
      },
      onCancel(){
        console.log('Cancel');
      }
    })


  } 

  getTitle=()=>{
    let title=''
    const path =this.props.location.pathname
    menuList.forEach(item=>{
      if("/admin"+item.key==path){
        title=item.title
      }else if(item.children){
        const cItem = item.children.find(cItem =>"/admin"+cItem.key===path)
        if(cItem){
          title=cItem.title
        }
      }
    })
    return title
  }

  componentDidMount(){
    this.intervalId=setInterval(() => {
      this.setState({
        currentTime:formateDate(Date.now())
      })
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  render() {

    const {currentTime}=this.state
    const user = memoryUtils.user
    const title =this.getTitle()
    return (
      <div className='header'>
        <div className='header-top'>
          welcome,{user.username}&nbsp;&nbsp;
          <LinkButton onClick={this.logout}>log out</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)