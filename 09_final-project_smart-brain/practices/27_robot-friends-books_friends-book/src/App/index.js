import React, { Component } from 'react';
import List			from '../containers/List';
import SearchBar	from '../components/SearchBar';
import './App.scss';

import { baseEndpoint, params, adjustDataSchema } from '../utils/API';
import ScrollableView from '../components/ScrollableView';
let ADJUSTED_USERS = [];
const PROFILE_COUNT = 15;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [],
      searchField: ''
    };
    this.onSearchChangeEffect = this.onSearchChangeEffect.bind(this)
  }

  onSearchChangeEffect(e){
	const value = e.target.value.toLowerCase();
    this.setState({
	  persons: [...ADJUSTED_USERS].filter( p => {
        return p.fullName.toLowerCase().includes( value )
      })
    })
  }
  
  componentDidMount(){
    const endpoint = `${baseEndpoint}/?${params.getResultAmount(PROFILE_COUNT)}`
    fetch(endpoint)
      .then( res => res.json())
      .then( adjustDataSchema )
      .then( data => {
        ADJUSTED_USERS = data.results;
        this.setState({ persons: data.results });
      })
      .catch( err => console.error(err))
    }

    
    render(){
      return (
        <div className="App">
          <SearchBar onSearchChangeEffect = {this.onSearchChangeEffect}/>
          <ScrollableView>
            {!!this.state.persons
              ? <List list = {this.state.persons}/>
              : <h1>Loading...</h1>
            }
          </ScrollableView>
        </div>
      )
    }


}

export default App;
