import React, {PureComponent} from 'react'
import {
  Card,
  Input,
  Cascader,
  Button,
  message
} from 'antd'
import {Form} from '@ant-design/compatible'
import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictures-wall'
import LinkButton from '../../components/link-button'
import {reqCategorys, reqAddOrUpdateProduct} from '../../api'
import {LeftOutlined} from '@ant-design/icons'
const {Item} = Form
const { TextArea } = Input


class ProductAddUpdate extends PureComponent {

  state = {
    options: [],
  }

  constructor (props) {
    super(props)

    this.pw = React.createRef()
    this.editor = React.createRef()
  }

  initOptions = async (categorys) => {
    
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, 
    }))

    const {isUpdate, product} = this
    const {pCategoryId} = product
    if(isUpdate && pCategoryId!=='0') {
      const subCategorys = await this.getCategorys(pCategoryId)
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))

      const targetOption = options.find(option => option.value===pCategoryId)

      targetOption.children = childOptions
    }


    this.setState({
      options
    })
  }


  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId)  
    if (result.status===0) {
      const categorys = result.data
      if (parentId==='0') {
        this.initOptions(categorys)
      } else { 
        return categorys  
      }
    }
  }



  validatePrice = (rule, value, callback) => {
    console.log(value, typeof value)
    if (value*1 > 0) {
      callback() 
    } else {
      callback('price must more than 0') 
    }
  }


  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true

    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false
    if (subCategorys && subCategorys.length>0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else { 
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options],
    })
  }

  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const {name, desc, price, categoryIds} = values
        let pCategoryId, categoryId
        if (categoryIds.length===1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = {name, desc, price,imgs, detail, pCategoryId, categoryId}

        const result = await reqAddOrUpdateProduct(product)

        if (result.status===0) {
          message.success(`'add success!`)
        } else {
          message.error('add failed!`')
        }
      }
    })
  }
  UNSAFE_componentWillMount () {
    const product = []
    this.product = product || {}
  }


  render() {
    const {product} = this
    const {detail,imgs} = product
    const categoryIds = []
    const formItemLayout = {
      labelCol: { span: 2 },  
      wrapperCol: { span: 8 }, 
    }

    const title = (
      <span>
        <LinkButton onClick={() => window.location.href="/admin/product"}>
          <LeftOutlined  type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        <span>add product</span>
      </span>
    )

    const {getFieldDecorator} = this.props.form

    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="name">
            {
              getFieldDecorator('name', {
                initialValue:"",
                rules: [
                  {required: true, message: 'must input name'}
                ]
              })(<Input placeholder='please input name'/>)
            }
          </Item>
          <Item label="descrip">
            {
              getFieldDecorator('desc', {
                initialValue: "",
                rules: [
                  {required: true, message: 'must input descrip'}
                ]
              })(<TextArea placeholder="please input descrip" autosize={{ minRows: 2, maxRows: 6 }} />)
            }

          </Item>
          <Item label="price">

            {
              getFieldDecorator('price', {
                initialValue:"",
                rules: [
                  {required: true, message: 'must input price'},
                  {validator: this.validatePrice}
                ]
              })(<Input type='number' placeholder='please input price' addonAfter='THB'/>)
            }
          </Item>
          <Item label="category">
            {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  {required: true, message: 'must select category'},
                ]
              })(
                (<Input placeholder='please input category'/>)
                // <Cascader
                //   placeholder='please select category'
                //   options={this.state.options} 
                //   loadData={this.loadData}
                // />
              )
            }

          </Item>
          <Item label="picture">
            <PicturesWall ref={this.pw} imgs={imgs}/>
          </Item>
          <Item label="Detail" labelCol={{span: 2}} wrapperCol={{span: 20}}>
            <RichTextEditor ref={this.editor} detail={detail}/>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>Submit</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)