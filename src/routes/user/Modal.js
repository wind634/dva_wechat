import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends Component {

  constructor(props) {
    super(props);
  }

  handleOk = () => {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ... this.props.form.getFieldsValue(),
        key: this.props.item.key,
      }
      data.address = data.address.join(' ')
      this.props.onOk(data)
    })
  }

  render() {

    const modalOpts = {
      ...this.props,
      onOk: this.handleOk,
    }

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="Name" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.item.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="NickName" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('nickName', {
              initialValue: this.props.item.nickName,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Gender" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('isMale', {
              initialValue: this.props.item.isMale,
              rules: [
                {
                  required: true,
                  type: 'boolean',
                },
              ],
            })(
              <Radio.Group>
                <Radio value>Male</Radio>
                <Radio value={false}>Female</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="Age" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('age', {
              initialValue: this.props.item.age,
              rules: [
                {
                  required: true,
                  type: 'number',
                },
              ],
            })(<InputNumber min={18} max={100} />)}
          </FormItem>
          <FormItem label="Phone" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('phone', {
              initialValue: this.props.item.phone,
              rules: [
                {
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: 'The input is not valid phone!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="E-mail" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('email', {
              initialValue: this.props.item.email,
              rules: [
                {
                  required: true,
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: 'The input is not valid E-mail!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Address" hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('address', {
              initialValue: this.props.item.address && this.props.item.address.split(' '),
              rules: [
                {
                  required: true,
                },
              ],
            })(<Cascader
              size="large"
              style={{ width: '100%' }}
              options={city}
              placeholder="Pick an address"
            />)}
          </FormItem>
        </Form>
      </Modal>)
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
