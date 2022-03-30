import React, {Component} from 'react'
import {Card,Select,Input,Button,Table,message} from 'antd'
import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import { withRouter } from '../../config/withRouter'; 
const Option = Select.Option

class ProductHome extends Component {

  state = {
    total: 0, 
    products: [], 
    loading: false, 
    searchName: '',
    searchType: 'productName', 
  }
  initColumns = () => {
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
      },
      {
        title: 'descrip',
        dataIndex: 'desc',
      },
      {
        title: 'price',
        dataIndex: 'price',
        render: (price) => '¥' + price 
      },
      {
        width: 100,
        title: 'status',
        render: (product) => {
          const {status, _id} = product
          const newStatus = status===1 ? 2 : 1
          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {status===1 ? 'Out sale' : 'On sale'}
              </Button>
              <span>{status===1 ? 'On sale' : 'Out sale'}</span>
            </span>
          )
        }
      },
    ];
  }

  getProducts = async (pageNum) => {
    this.pageNum = pageNum 
    this.setState({loading: true}) 

    const {searchName, searchType} = this.state
    let result
    if (searchName) {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    } else { 
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    this.setState({loading: false}) 
    if (result.status === 0) {
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  /*
  更新指定商品的状态
   */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if(result.status===0) {
      message.success('update success')
      this.getProducts(this.pageNum)
    }
  }

  UNSAFE_componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getProducts(1)
  }

  render() {
    const {products, total, loading, searchType, searchName} = this.state



    const title = (
      <span>
        <Select
          value= {searchType}
          style={{width: 150}}
          onChange={value => this.setState({searchType:value})}
        >
          <Option value='productName'>search by name</Option>
          <Option value='productDesc'>searc by descrip</Option>
        </Select>
        <Input
          placeholder='keyword'
          style={{width: 150, margin: '0 15px'}}
          value={searchName}
          onChange={event => this.setState({searchName:event.target.value})}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>search</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={() => window.location.href="/admin/product/addupdate"}>
        add product
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
export default withRouter(ProductHome)