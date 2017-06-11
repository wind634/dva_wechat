import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

class User extends Component {

  constructor(props) {
    super(props);
  }

  handleDeleteItems = () => {
    this.props.dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: this.props.user.selectedRowKeys,
      },
    })
  }

  render() {
    const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = this.props.user
    const { pageSize } = pagination

    const dispatch = this.props.dispatch

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      maskClosable: false,
      confirmLoading: this.props.loading.effects['user/update'],
      title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
      wrapClassName: 'vertical-center-modal',
      onOk (data) {
        dispatch({
          type: `user/${modalType}`,
          payload: data,
        })
      },
      onCancel () {
        dispatch({
          type: 'user/hideModal',
        })
      },
    }

    const query = this.props.location.query
    const pathname = this.props.location.pathname

    const listProps = {
      dataSource: list,
      loading: this.props.loading.effects['user/query'],
      pagination,
      location: this.props.location,
      isMotion,
      onChange (page) {
        dispatch(routerRedux.push({
          pathname,
          query: {
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          },
        }))
      },
      onDeleteItem (id) {
        dispatch({
          type: 'user/delete',
          payload: id,
        })
      },
      onEditItem (item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'user/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }


    const filterProps = {
      isMotion,
      filter: {
        ...this.props.location.query,
      },
      onFilterChange (value) {
        dispatch(routerRedux.push({
          pathname: pathname,
          query: {
            ...value,
            page: 1,
            pageSize,
          },
        }))
      },
      onSearch (fieldsValue) {
        fieldsValue.keyword.length ? dispatch(routerRedux.push({
          pathname: '/user',
          query: {
            field: fieldsValue.field,
            keyword: fieldsValue.keyword,
          },
        })) : dispatch(routerRedux.push({
          pathname: '/user',
        }))
      },
      onAdd () {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
      switchIsMotion () {
        dispatch({ type: 'user/switchIsMotion' })
      },
    }

    return (
      <div className="content-inner">
        <Filter {...filterProps} />
        {
          selectedRowKeys.length > 0 &&
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={this.handleDeleteItems}>
                <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
              </Popconfirm>
            </Col>
          </Row>
        }
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}

      </div>
    )
  }

}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}


function mapStateToProps({ user, loading }) {
  return {
    user,
    loading
  };
}

export default connect(mapStateToProps)(User);

