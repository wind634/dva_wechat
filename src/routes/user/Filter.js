import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import city from '../../utils/city'

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const handleFields = (fields) => {
      const { createTime } = fields
      if (createTime.length) {
        fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
      }
      return fields
    }

    const handleSubmit = () => {
      let fields = this.props.form.getFieldsValue()
      fields = handleFields(fields)
      this.props.onFilterChange(fields)
    }

    const handleReset = () => {
      const fields = this.props.form.getFieldsValue()
      for (let item in fields) {
        if ({}.hasOwnProperty.call(fields, item)) {
          if (fields[item] instanceof Array) {
            fields[item] = []
          } else {
            fields[item] = undefined
          }
        }
      }
      this.props.form.setFieldsValue(fields)
      handleSubmit()
    }

    const handleChange = (key, values) => {
      let fields = this.props.form.getFieldsValue()
      fields[key] = values
      fields = handleFields(fields)
      this.props.onFilterChange(fields)
    }
    const { name, address } = this.props.filter

    let initialCreateTime = []
    if (this.props.filter.createTime && this.props.filter.createTime[0]) {
      initialCreateTime[0] = moment(this.props.filter.createTime[0])
    }
    if (this.props.filter.createTime && this.props.filter.createTime[1]) {
      initialCreateTime[1] = moment(this.props.filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {this.props.form.getFieldDecorator('name', { initialValue: name })(<Search placeholder="Search Name" size="large" onSearch={handleSubmit} />)}
        </Col>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {this.props.form.getFieldDecorator('address', { initialValue: address })(
            <Cascader
              size="large"
              style={{ width: '100%' }}
              options={city}
              placeholder="Please pick an address"
              onChange={handleChange.bind(null, 'address')}
            />)}
        </Col>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="Createtime">
            {this.props.form.getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker style={{ width: '100%' }} size="large" onChange={handleChange.bind(null, 'createTime')} />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div >
              <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
              <Button size="large" onClick={handleReset}>Reset</Button>
            </div>
            <div>
              <Switch style={{ marginRight: 16 }} size="large" defaultChecked={this.props.isMotion} onChange={this.props.switchIsMotion} checkedChildren={'Motion'} unCheckedChildren={'Motion'} />
              <Button size="large" type="ghost" onClick={this.props.onAdd}>Create</Button>
            </div>
          </div>
        </Col>
      </Row>
    )
  }

}


Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
