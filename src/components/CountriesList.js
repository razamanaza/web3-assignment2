import React from 'react'

class CountriesList extends React.Component {
  state = {
    selected: '',
  }

  changeCountry = (event) => {
    const {value} = event.target
    this.setState({
      selected: value
    })
    this.props.changeCountry(value)
  }

  render() {
    const options = Object.keys(this.props.countries).map((country, index) => {
      return (
        <option value={this.props.countries[country]} key={index}>{country}</option>
      )
    })
    
    return (
      <select className='form-control' onChange={this.changeCountry} value={this.state.selected}>
		    <option disabled value=''> -- select a country -- </option>
        {options}
      </select>
    )
  }
}

export default CountriesList