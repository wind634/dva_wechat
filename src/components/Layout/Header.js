import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import Menus from './Menu'

const SubMenu = Menu.SubMenu


class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    let handleClickMenu = e => e.key === 'logout' && logout()
    const menusProps = {
      menu:this.props.menu,
      siderFold: false,
      darkTheme: false,
      isNavbar:this.props.isNavbar,
      handleClickNavMenu: this.props.switchMenuPopover,
      location:this.props.location,
      navOpenKeys:this.props.navOpenKeys,
      changeOpenKeys:this.props.changeOpenKeys,
    }

    return (
      <div className={styles.header}>
        {this.props.isNavbar
          ? <Popover placement="bottomLeft" onVisibleChange={this.props.switchMenuPopover} visible={this.props.menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
          : <div className={styles.button} onClick={this.props.switchSider}>
          <Icon type={this.props.siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
        <div className={styles.rightWarpper}>
          <div className={styles.button}>
            <Icon type="mail" />
          </div>
          <Menu mode="horizontal" onClick={this.props.handleClickMenu}>
            <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {this.props.user.username} </span>}
            >
              <Menu.Item key="logout">
                Sign out
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
};


export default Header
