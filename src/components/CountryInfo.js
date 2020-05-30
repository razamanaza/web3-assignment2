import React from 'react'

class CountryInfo extends React.Component {
  render() {
    return (
      <h1>{this.props.country.name}</h1>
    )
  }
}

export default CountryInfo