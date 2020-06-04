import React from 'react'
import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'
import Alert from './Alert'

const BASEURL = 'http://192.168.33.10:8080/countries'

class App extends React.Component {
  state = {
    country: {},
    countries: {},
    year: '',
    alert: {
      enabled: false,
      cssClass: '',
      message: '',
    }
  }

  /**
   *
   * Fetches the list of all countries from API using GET
   * when app starts an keeps it in countries state
   */
  componentDidMount() {
    fetch(BASEURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          countries: response
        })
      })
  }

  /**
   *
   * @param {string} countryId - id of the country to fetch
   * Fetches the data for the specific country defined by countryId
   * then keeps it in the country state
   */
  changeCountry = countryId => {
    const url  = BASEURL + '/' + countryId
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          country: response,
          year: ''
        })
      })
  }

  setYear = (year) => {
    this.setState({ year })
  }

  setAlert = (message, enabled=true, cssClass='alert-danger') => {
    let alert = {
      enabled,
      cssClass,
      message
    }
    this.setState({alert})
  }

  render() {

    return (
      <div className="jumbotron">
        <Alert alert={this.state.alert} />
        <CountriesList
          changeCountry={this.changeCountry}
          countries={this.state.countries}
        />
        <CountryInfo
          country={this.state.country}
          year={this.state.year}
          changeCountry={this.changeCountry}
          setYear={this.setYear}
          setAlert={this.setAlert}
          BASEURL={BASEURL}
        />
      </div>
    )
  }
}

export default App
