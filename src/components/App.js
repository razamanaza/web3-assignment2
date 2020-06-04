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
   * We don't need to use localStorage here because it is
   * fetched only once
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
    if(localStorage.getItem(countryId) !== null) {
      const country = JSON.parse(localStorage.getItem(countryId))
      this.setState({
        country,
        year: ''
      })
      console.log('Populated from the localStorage')
    } else {
      const url  = BASEURL + '/' + countryId
      fetch(url)
        .then(response => response.json())
        .then(response => {
          this.setState({
            country: response,
            year: ''
          })
          localStorage.setItem(response._id.$oid, JSON.stringify(response))
          console.log('Fetched from API')
        })
      }
  }

  /**
   * @param {integer} year - selected year for current country
   * Updates state for selected year
   */
  setYear = (year) => {
    this.setState({ year })
  }

  /**
   * @param {string} message - Message to show in alert component
   * @param {boolean} enabled - If false App component is hidden
   * @param {cssClass} enabled - Bootstrap alert class. Possible values:
   *                             alert-primary, alert-secondary, alert-success,
   *                             alert-danger, alert-warning, alert-info
   * Sets state for Alert component. Should be used if API returned error.
   * If only message parameter given - automatically shows an error message.
   * cssClass can be use
   */
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
