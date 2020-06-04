import React from 'react'

class Alert extends React.Component {
  render() {
    let alertClass = 'alert ' + this.props.alert.cssClass
    alertClass += (this.props.alert.enabled) ? '' : ' hidden'

    return (
      <div className={alertClass} role="alert">
        {this.props.alert.message}
      </div>
    )
  }
}

export default Alert
