import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Input} from 'antd'
import {Form} from '@ant-design/compatible'

const Item = Form.Item

class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, 
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    }

    return (
      <Form>
        <Item label='user name' {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: 'must have user name'}
              ]
            })(
              <Input placeholder='please enter username'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)