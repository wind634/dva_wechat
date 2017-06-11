import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import styles from './quote.less'


class Quote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.quote}>
        <div className={styles.inner}>
          {this.props.content}
        </div>
        <div className={styles.footer}>
          <div className={styles.description}>
            <p>-{this.props.name}-</p>
            <p>{this.props.title}</p>
          </div>
          <div className={styles.avatar} style={{ backgroundImage: `url(${this.props.avatar})` }} />
        </div>
      </div>
    )
  }

}

Quote.propTypes = {
  name: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  avatar: PropTypes.string,
}

export default Quote
