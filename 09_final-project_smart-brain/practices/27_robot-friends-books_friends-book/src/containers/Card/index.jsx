import { Component } from 'react';
import "./styles.scss";

class Card extends Component {
	constructor(props){
		super(props)
		this.state = this.props.data;
	}
	render(){
		const { 
			email, 
			phone,
			picture,
			fullName,
			flag,
			location : { country, city }
		 } = this.state;
		return (
			<div className="Card">
				<div className = "Card_container" data-image={picture}>
					<div className="Card_left" data-image={picture}>
						<img src = {picture} alt = "Persona" loading = "lazy" />
						<h1>{fullName}</h1>
					</div>
					<div className="Card_right">
						<span>
							<img loading="lazy" className = "flag" src={flag} alt="country flag" />
							<span>{country}</span>&nbsp;-&nbsp;<span>{city}</span>
						</span>
						<span>
							<img
								loading="lazy"
								className = "icon"
								src = "https://img.icons8.com/?size=512&id=QYpUg4tYRnvH&format=png" 
								alt = {`${fullName} profile`}
								/>
							<span>{phone}</span>
						</span>
						<span> 
							<img className="icon-email" src="https://thenounproject.com/api/private/icons/5827957/edit/?exportSize=752&imageFormat=png&rotation=0" alt="email icon"/>
							<span>{email}</span>
						</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;