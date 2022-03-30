import React, {Component} from 'react'
import {Card,Statistic,Timeline} from 'antd'
import {ArrowUpOutlined, ArrowDownOutlined,ReloadOutlined,QuestionCircleOutlined} from '@ant-design/icons';
import './home.css'

export default class Home extends Component {

  render() {

    return (
      <div className='home'>
        <Card
          className="home-card"
          title="Total number of products"
          extra={<QuestionCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>}
          style={{width: 250}}
          headStyle={{color: 'rgba(0,0,0,.45)'}}
        >
          <Statistic
            value={1128163}
            suffix=""
            style={{fontWeight: 'bolder'}}
          />
          <Statistic
            value={15}
            valueStyle={{fontSize: 15}}
            prefix={'Week-on-Week'}
            suffix={<div>%<ArrowDownOutlined style={{color: 'red', marginLeft: 10}}/></div>}
          />
          <Statistic
            value={10}
            valueStyle={{fontSize: 15}}
            prefix={'Day-on-day'}
            suffix={<div>%<ArrowUpOutlined style={{color: '#3f8600', marginLeft: 10}}/></div>}
          />
        </Card>

        <Card
          className="home-content"
          title={<div className="home-menu"></div>}>
         <Card title='Target' extra={<ReloadOutlined/>} className="home-table-right">
            <Timeline>
              <Timeline.Item color="green">New version iteration meeting</Timeline.Item>
              <Timeline.Item color="green">Completion of the first version of the website design</Timeline.Item>
              <Timeline.Item color="green">
                <p>Intermodal interfaces</p>
                <p>Functional acceptance</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Login function design</p>
                <p>Permission verification</p>
                <p>Page layout</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}