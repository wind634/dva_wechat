import React,{ Component }  from 'react'
import PropTypes from 'prop-types'
import styles from './weather.less'

class Weather extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={styles.weather}>
      <div className={styles.left}>
        <div className={styles.icon} style={{
        backgroundImage: `url(${this.props.icon})`,
      }} />
        <p>{this.props.name}</p>
      </div>
      <div className={styles.right}>
        <h1 className={styles.temperature}>{`${this.props.temperature}°`}</h1>
        <p className={styles.description}>{this.props.city},{this.props.dateTime}</p>
      </div>
    </div>)
  }

}


Weather.propTypes = {
  city: PropTypes.string,
  icon: PropTypes.string,
  dateTime: PropTypes.string,
  temperature: PropTypes.string,
  name: PropTypes.string,
}

export default Weather
