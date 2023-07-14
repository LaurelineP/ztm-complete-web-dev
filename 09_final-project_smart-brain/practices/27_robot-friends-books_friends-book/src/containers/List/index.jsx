
import React, { Component } from 'react';
import PersonaCard from '../Card';
import './styles.scss';

function renderRows(list = [] ,qty = 5 ){
	let rowsToRender = [];
	if( !!list.length ){
		let _rowCards = [];
		// creating a `div` rows containing 5 cards
		rowsToRender = list.reduce((acc, item, idx) => {
			// adds item to a row
			_rowCards.push( item );

			/* defines row's max items quantity 
			( adds filled row and resets for next iterations ) */
			if( _rowCards.length === qty ){
				acc.push(_rowCards);
				_rowCards = [];

			}
			/** push last row -  having less than the quantity 
			 * of items required to creates new rows */
			else if ( idx === list.length - 1 ){
				acc.push(_rowCards)
			}
			return acc;
		}, []);
	}
	return rowsToRender;
}


class List extends Component {
	constructor(props){
		super(props);
		this.state = { list: this.props.list };
	}

	componentDidMount(){
		window.addEventListener('resize', e => {
			this.setState({ windowWidth: e.target.innerWidth})
		})
	}

	componentWillUnmount(){
		window.removeEventListener('resize', e => {
			this.setState({ windowWidth: window.innerWidth})
		})
	}
	render(){
		const rowsOfCards = renderRows( this.props.list );
		const shouldBeResponsive = this.state.windowWidth <= 1000;
		return (
			<div className="List">
				<div className="List_container">
					{
						!shouldBeResponsive ? (
							rowsOfCards.map((cards, idx) => (
								<div id = {`row-${idx}`} key ={`row-${idx}`}>
									{
										cards.map(( cardData, cardIdx ) => (
											<PersonaCard 
												key = {`card-${cardIdx}-${cardData.fullName}`} 
												data = { cardData }
												/>
										))
									}
								</div>
							))
						) : (
							this.props.list.map(( cardData, cardIdx  )=> (
								<PersonaCard key = {`card-${cardIdx}-${cardData.fullName}`} data = { cardData }/>
							))
						)
					}
				</div>
			</div>
		)
	}
}

export default  List