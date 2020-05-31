import React from 'react'

class CountriesList extends React.Component {
  state = {
    countries: [],
  }

  componentDidMount() {
    const url = 'http://192.168.33.10:8080/countries'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          countries: result,
        })
      })
  }

  fetchCountry = event => {
    const countryId = event.target.value
    const url = 'http://192.168.33.10:8080/countries/' + countryId
    fetch(url)
      .then(result => result.json())
      .then(result => {
        localStorage.setItem(countryId, JSON.stringify(result))
        this.props.changeCountry(result)
      })
  }
  
  render() {
    const options = Object.keys(this.state.countries).map((country, index) => {
      return (
        <option value={this.state.countries[country]} key={index}>{country}</option>
      )
    })
    
    return (
      <select className='form-control' onChange={this.fetchCountry}>
		    <option disabled selected value="unselected"> -- select a country -- </option>
        {options}
      </select>
    )
  }
}

export default CountriesList