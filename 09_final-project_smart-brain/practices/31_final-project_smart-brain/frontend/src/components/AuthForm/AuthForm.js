import { Component, Fragment } from "react";
import { configs } from './form-configs'
import styles from './AuthForm.module.css'




export default class AuthForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			password: '',
			email: '',
			name: ''
		}

		/* -------------------------------- HANDLERS -------------------------------- */

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	handleInputChange(e) {
		const key = e.target.name
		const value = e.target.value
		this.setState({
			...this.state,
			[key]: value
		})
	}

	handleClick( e ){
		const buttonName = e.target.name
		console.log('this.props:', this)

		if( buttonName ){
			console.log('this.props.page:', this.props.page)
			console.log('buttonName:', buttonName)
			if ( this.props.page === buttonName ){
				console.log('[ TO SUBMIT ] Payload to submit \n', this.state)
				return;
			}
			this.props.router.push(`/${buttonName}`)
			return
		}

	}
	render(){
		const page = this.props?.page
		const formConfig = configs?.[ page ]
		if( !formConfig ) return (<h1>sorry</h1>)

		const { inputs, buttons } = formConfig
	

		return (
			<div className ={ styles.AuthForm } >

				<h1>{ page }</h1>

				<div className = { styles.AuthForm_container }>
				
				
					{/* Renders inputs  */}
					<div className = { styles.AuthForm_inputs }>
						{ inputs.map( (inputDetails, idx) => (
							<div key = { idx } className = {styles?.['AuthForm_label-input']}>
								<label>{ inputDetails.label }</label>
								<input
									type 		= { inputDetails.type }
									onChange 	= { this.handleInputChange }
									name 		= { inputDetails.label }
								/>
							</div>
						))}
					</div>


					{/* Renders buttons */}
					<div className = { styles.AuthForm_buttons }>
						{ buttons.map(( buttonDetails, idx ) => (
							<Fragment key = { `button-${buttonDetails.label}-${idx}` }>
								<button
									name 		= { buttonDetails.label }
									className 	= { styles?.[`button-${ buttonDetails.kind }`]}
									onClick		= { this.handleClick }
								>
									{
										page === buttonDetails.label 
										? (<span> { buttonDetails.label }</span>)
										: (
											<a href = {`/${buttonDetails.label}`}>
												{ buttonDetails.label }
											</a>
										)
									}

								</button>
							</Fragment>
						))}
					</div>
				</div>
			</div>
		)
	}
}