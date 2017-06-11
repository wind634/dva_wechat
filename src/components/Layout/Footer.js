import React,{ Component } from 'react'
import styles from './Footer.less'
import { config } from '../../utils'


class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.footer}>
        {config.footerText}
      </div>
    )
  }
}

export default Footer
