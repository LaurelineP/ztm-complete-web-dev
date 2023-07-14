import React, { Component } from 'react'
import './styles.scss';

class SearchBar extends Component {
	render(){
		return (
			<div className = "SearchBar">
				<input 
					placeholder = "Search a name"
					onInput = { this.props.onSearchChangeEffect }
					/>
			</div>
		)
	}
}






export default SearchBar;