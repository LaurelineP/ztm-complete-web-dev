import { Component } from "react";
import AuthForm from '@/components/AuthForm/AuthForm'

export default class SigninPage extends Component {
	render(){
		return(
			<AuthForm page = "signin"/>
		)
	}
}