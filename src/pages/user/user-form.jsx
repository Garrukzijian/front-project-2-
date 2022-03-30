import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Select,Input} from 'antd'
import {Form} from '@ant-design/compatible'

const Item = Form.Item
const Option = Select.Option
class UserForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired, 
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {

    const {roles, user} = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },  
      wrapperCol: { span: 15 }, 
    }

    return (
      <Form {...formItemLayout}>
        <Item label='username'>
          {
            getFieldDecorator('username', {
              initialValue: user.username,
            })(
              <Input placeholder='please enter username'/>
            )
          }
        </Item>

        {
          user._id ? null : (
            <Item label='password'>
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                })(
                  <Input type='password' placeholder='please enter password'/>
                )
              }
            </Item>
          )
        }

        <Item label='phone number'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
            })(
              <Input placeholder='please enter phone number'/>
            )
          }
        </Item>
        <Item label='email'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
            })(
              <Input placeholder='please enter email'/>
            )
          }
        </Item>

        <Item label='role'>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)