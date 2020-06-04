import React from 'react'

class CountryInfo extends React.Component {

  initialState = {
      gdp: '',
      industry: '',
      agriculture: '',
      service: '',
  }

  state = this.initialState

  /**
   * @param {string} method - reqest method valid values: POST, PUT, DELETE
   * @param {*} data - request data
   * @param {*} id - country id
   * Performs reqests to API for data change. After successfull update
   * initiate current state and sends request for data reload to App component
   */
  fetchBackend = (method, data, id) => {
    const url = this.props.BASEURL + '/' + id
    const requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          const error = response.status + ' ' + response.statusText
            this.props.setAlert(error.toString())
        } else {
          localStorage.removeItem(id)
          this.setState(this.initialState)
          this.props.changeCountry(id)
          this.props.setAlert('', false)
        }
    })
    .catch(error => {
      this.props.setAlert(error.message)
    });
  }

  /**
   * @param {object} event - event happened after selecting year
   * Renews current state after year select is changed
   */
  redrawCountry = event => {
    if(!event) return('')
    const year = event.target.value
    const countryData = this.props.country.data
    const gdp = (year in countryData.gdp) ?  countryData.gdp[year] : ''
    const industry = (year in countryData.industry) ?  countryData.industry[year] : ''
    const agriculture = (year in countryData.agriculture) ?  countryData.agriculture[year] : ''
    const service = (year in countryData.service) ?  countryData.service[year] : ''
    this.setState({gdp, industry, agriculture, service})
    this.props.setYear(year)
  }

  /**
   * @param {object} event - event happened when data fields changes
   * Renews current state after changes in form fields
   */
  handleChange = event => {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  /**
   * @param {}
   * Sends API request to update selected year data for current country
   */
  countryUpdate = () => {
    const countryId =  this.props.country._id.$oid
    const year = this.props.year
    let countryData = {...this.state, year}
    this.fetchBackend('PUT', countryData, countryId)
  }

  /**
   * @param {}
   * Sends API request to delete selected year from current country
   */
  yearDelete = () => {
    const year = this.props.year
    const countryId = this.props.country._id.$oid
    this.fetchBackend('DELETE', year, countryId)
  }

  render() {
    if(Object.keys(this.props.country).length === 0) return null

    const {gdp, industry, agriculture, service} = this.state

    const options = Object.keys(this.props.country.data.gdp).map((gdp, index) => {
      return (
        <option value={gdp} key={index}>{gdp}</option>
      )
    })

    return (
      <div className='country-info'>
        <select className='form-control year' onChange={this.redrawCountry} value={this.props.year}>
          <option disabled value=''> -- select a year -- </option>
          {options}
        </select>
        <form>
          <div className='form-group'>
            <label htmlFor='gdp'>GDP in billions USD</label>
            <input type='text' className='form-control' id='gdp' name='gdp' value={gdp} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='agriculture'>Agriculture %</label>
            <input type='text' className='form-control' id='agriculture' name='agriculture' value={agriculture} onChange={this.handleChange}/>
          </div>
          <div className='form-group'>
            <label htmlFor='industry'>Industry %</label>
            <input type='text' className='form-control' id='industry' name='industry' value={industry} onChange={this.handleChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='service'>Service %</label>
            <input type='text' className='form-control' id='service' name='service' value={service} onChange={this.handleChange}/>
          </div>
          <input className="btn btn-primary" type='button' value='Update' onClick={this.countryUpdate} />
          <input className="btn btn-danger" type='button' value='Delete' onClick={this.yearDelete} />
        </form>
      </div>
    )
  }
}

export default CountryInfo
