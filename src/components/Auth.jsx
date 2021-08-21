import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.sass';

function FormGroup(props) {
	return (
		<Form.Group>
			<Form.Label>{props.label}</Form.Label>
			<Form.Control 
				type={props.type} 
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder} 
			/>
			{/* <Form.Text className="text-muted">
				We'll never share your email with anyone else.
    	</Form.Text> */}
		</Form.Group>
	)
}

export default class Auth extends Component {
	/** TODO:
	 * 
	 */
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			loginVal: '',
			passwordVal: ''
		}
	}

	handleChange(prop, e) {
		const target = e.target;

		this.setState({
			[prop]: target.value
		})
	}

	render() {
		return (
			<Container>
				<Row className='justify-content-center'>
					<Col lg='4'>
						<Form className="auth">
							<legend>Authorization</legend>
							<FormGroup 
								type="text"
								// name="login"
								label="Login"
								placeholder="Enter login"
								value={this.state.loginVal}
								onChange={this.handleChange.bind(this, 'loginVal')}
							/>
							<FormGroup 
								// name="password"
								type="password"
								label="Password"
								placeholder="Enter password"
								value={this.state.passwordVal}
								onChange={this.handleChange.bind(this, 'passwordVal')}
							/>
							<Button variant="primary">Sign in</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		)
	}
}
