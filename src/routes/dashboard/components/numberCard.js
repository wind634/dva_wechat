import React,{ Component }  from 'react'
import PropTypes from 'prop-types'
import { Icon, Card } from 'antd'
import CountUp from 'react-countup'
import styles from './numberCard.less'


class NumberCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card className={styles.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
        <Icon className={styles.iconWarp} style={{ color:this.props.color }} type={this.props.icon} />
        <div className={styles.content}>
          <p className={styles.title}>{this.props.title || 'No Title'}</p>
          <p className={styles.number}>
            <CountUp
              start={0}
              end={this.props.number}
              duration={2.75}
              useEasing
              useGrouping
              separator=","
              {...this.props.countUp || {}}
            />
          </p>
        </div>
      </Card>
    )
  }
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}

export default NumberCard
