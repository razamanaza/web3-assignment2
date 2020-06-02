import React from 'react'

class CountryInfo extends React.Component {
  
  initialState = {
      gdp: '',
      industry: '',
      agriculture: '',
      service: '',
      year: '',
      country: '',
  }

  state = this.initialState
  
  fetchBackend = (method, data, url) => {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(url, requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        this.setState({ postId: data.id })
    })
    .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
    });
  }
  
  redrawCountry = event => {
    if(!event) return('')
    const year = event.target.value
    const gdp = (year in this.props.country.data.gdp) ?  this.props.country.data.gdp[year] : ''
    const industry = (year in this.props.country.data.industry) ?  this.props.country.data.industry[year] : ''
    const agriculture = (year in this.props.country.data.agriculture) ?  this.props.country.data.agriculture[year] : ''
    const service = (year in this.props.country.data.service) ?  this.props.country.data.service[year] : ''
    this.setState({
      gdp, industry, agriculture, service, year
    })
  }

  handleChange = event => {
    const {name, value} = event.target

    this.setState({
      [name]: value,
    })
  }

  countryUpdate = () => {
    let countryUpdated = {...this.props.country}
    const year = this.state.year
    countryUpdated.data.gdp[year] = this.state.gdp
    countryUpdated.data.agriculture[year] = this.state.agriculture
    countryUpdated.data.industry[year] = this.state.industry
    countryUpdated.data.service[year] = this.state.service
    const url =  'http://192.168.33.10:8080/countries/' + countryUpdated._id.$oid
    this.fetchBackend('PUT', countryUpdated, url)    
  }

  yearDelete = () => {
    const year = this.state.year
    const url =  'http://192.168.33.10:8080/countries/' + this.props.country._id.$oid
    this.fetchBackend('DELETE', year, url)
    this.setState(this.initialState)
  }
  
  render() {   
    if(Object.keys(this.props.country).length === 0) return('')
    if(this.props.country.name !== this.state.country.name) {
      this.setState(this.initialState)
      this.setState({country: this.props.country})
    }
    
    const {gdp, industry, agriculture, service} = this.state
    
    const options = Object.keys(this.props.country.data.gdp).map((gdp, index) => {
      return (
        <option value={gdp} key={index}>{gdp}</option>
      )
    })

    return (
      <div className='country-info'>
        <h1>{this.props.country.name}</h1>
        <select className='form-control year' onChange={this.redrawCountry} value={this.state.year}>
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