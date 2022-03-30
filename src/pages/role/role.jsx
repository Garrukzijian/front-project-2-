import React, {Component} from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {PAGE_SIZE} from "../../utils/constants"
import {reqRoles, reqAddRole, reqUpdateRole} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from "../../utils/memoryUtils"
import {formateDate} from '../../utils/dateUtils'
import storageUtils from "../../utils/storageUtils";

/*
角色路由
 */
export default class Role extends Component {

  state = {
    roles: [], 
    role: {}, 
    isShowAdd: false, 
    isShowAuth: false, 
  }

  constructor (props) {
    super(props)

    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name'
      },
      {
        title: 'create time',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: 'auth time',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: 'auth name',
        dataIndex: 'auth_name'
      },
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status===0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }


  onRow = (role) => {
    return {
      onClick: event => { 
        console.log('row onClick()', role)
        this.setState({
          role
        })
      },
    }
  }
  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          isShowAdd: false
        })
        const {roleName} = values
        this.form.resetFields()

        const result = await reqAddRole(roleName)
        if (result.status===0) {
          message.success('add success')
          const role = result.data
          this.setState(state => ({
            roles: [...state.roles, role]
          }))

        } else {
          message.success('add failed')
        }

      }
    })


  }

  updateRole = async () => {

    this.setState({
      isShowAuth: false
    })

    const role = this.state.role
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    const result = await reqUpdateRole(role)
    if (result.status===0) {

      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storageUtils.removeUser()
        this.props.history.replace('/login')
        message.success('success user')
      } else {
        message.success('success')
        this.setState({
          roles: [...this.state.roles]
        })
      }

    }
  }

  componentWillMount () {
    this.initColumn()
  }

  componentDidMount () {
    this.getRoles()
  }

  render() {

    const {roles, role, isShowAdd, isShowAuth} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>add user</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>set user permissions</Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => { 
              this.setState({
                role
              })
            }

          }}
          onRow={this.onRow}
        />

        <Modal
          title="add user"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({isShowAdd: false})
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </Modal>

        <Modal
          title="set user permissions"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({isShowAuth: false})
          }}
        >
          <AuthForm ref={this.auth} role={role}/>
        </Modal>
      </Card>
    )
  }
}