import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import styles from './Layout.less'
import { config } from '../../utils'
import Menus from './Menu'

class Sider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menusProps = {
      menu:this.props.menu,
      siderFold:this.props.siderFold,
      darkTheme:this.props.darkTheme,
      location:this.props.location,
      navOpenKeys:this.props.navOpenKeys,
      changeOpenKeys:this.props.changeOpenKeys,
    }
    return (
      <div>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          {this.props.siderFold ? '' : <span>{config.name}</span>}
        </div>
        <Menus {...menusProps} />
        {!this.props.siderFold ? <div className={styles.switchtheme}>
          <span><Icon type="bulb" />Switch Theme</span>
          <Switch onChange={this.props.changeTheme} defaultChecked={this.props.darkTheme} checkedChildren="Dark" unCheckedChildren="Light" />
        </div> : ''}
      </div>
    )
  }
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
