import React from 'react';
import CountriesList from './CountriesList'
import CountryInfo from './CountryInfo'

class App extends React.Component {
  state = {
    country: {},
  };
  
  changeCountry = countryData => {
    this.setState({
      country: countryData,
    })
  }

  render() {
    return (
      <div className="jumbotron">
        <CountriesList changeCountry={this.changeCountry}/>
        <CountryInfo country={this.state.country} />        
      </div>
    )
  }
}

export default App