import React, { Component } from 'react';
import Passwords from './Passwords';
import Auth from './Auth';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuth: true
		}
	}

	render() {
		if (!this.state.isAuth) {
			return (
				<Auth />
			)
		}

		return <Passwords />
	}
}
