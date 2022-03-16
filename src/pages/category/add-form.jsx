import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Select,Input} from 'antd'
import {Form} from '@ant-design/compatible'

const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, 
    categorys: PropTypes.array.isRequired, 
    parentId: PropTypes.string.isRequired, 
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {categorys, parentId} = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option value='0'>fist level category</Option>
                {
                  categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }

        </Item>

        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [
                {required: true, message: 'must have name'}
              ]
            })(
              <Input placeholder='please enter name'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)