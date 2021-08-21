import React, { Component } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Editor from './Editor';
import Sitebar from './Sitebar';
import Dialog from './Dialog';
import './Passwords.sass';

const url = 'http://passwords-api.30seo.ru:8080';
const auth = new Buffer('root:123').toString('base64');

export default class Passwords extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.addNewPass = this.addNewPass.bind(this);
		this.state = {
			isSave: false,
			passwords: null,
			isLoading: true,
			searchValue: '',
			isEditing: false,
			isShowModal: false,
			activePass: { id: null },
			copyActivePass: { id: null },
			newPass: { 'mSiteVal': '', 'mTextVal': '' }
		}
	}

	componentDidMount() {
		fetch(`${url}/get-all`, {
			headers: {
				"Authorization": "Basic " + auth
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					isLoading: false,
					passwords: data.data,
				})
			})
			.catch(err => console.error(err))
	}

	handleClick(e) {
		if (e.target.tagName !== "BUTTON" || this.state.isEditing) return;

		const activePass = this.state.passwords.find(password => {
			if (password.id === Number(e.target.dataset.id)) {
				return password;
			}
		});

		const copyActivePass = Object.assign({}, activePass);

		this.setState({
			activePass: activePass,
			copyActivePass: copyActivePass
		});
	}

	handleChange(e) {
		const target = e.target;

		switch (target.name) {
			case 'site':
			case 'text':
				const copyActivePass = this.state.copyActivePass;
				copyActivePass[target.name] = target.value;
				this.setState({
					copyActivePass: copyActivePass
				});
				break;
			case 'mSiteVal':
			case 'mTextVal':
				const newPass = this.state.newPass;
				newPass[target.name] = target.value;
				this.setState({
					newPass: newPass
				});
				break;
			case 'field-search':
				this.setState({
					searchValue: target.value
				});
				break;
			default:
				return;
		}
	}

	addNewPass() {
		this.setState({
			isSave: true
		});

		const newPass = {
			"site": this.state.newPass.mSiteVal,
			"text": this.state.newPass.mTextVal
		}

		fetch(`${url}/add-site/`, {
			method: 'POST',
			headers: {
				"Authorization": "Basic " + auth,
				"Content-type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(newPass)
		})
			.then(res => res.json())
			.then(data => {
				const passwords = this.state.passwords.slice();
				newPass.id = data['site_id'];				
				passwords.push(newPass);
				this.setState({
					isShowModal: false,
					isSave: false,
					passwords: passwords,
					newPass: { "mSiteVal": "", "mTextVal": "" }
				})
			})
			.catch(err => console.log(err))
	}

	handleChangeCheckbox(e) {
		const target = e.target;

		if (!target.checked) {
			const activePass = this.state.activePass;
			const copyActivePass = this.state.copyActivePass;

			if (activePass.site !== copyActivePass.site || activePass.text !== copyActivePass.text) {
				fetch(`${url}/update-site/`, {
					method: 'PUT',
					mode: 'cors',
					headers: {
						"Authorization": "Basic " + auth,
						"Content-type": "application/json;charset=utf-8"
					},
					body: JSON.stringify(copyActivePass)
				})
					.then(res => res.json())
					.then(data => {
						const { site, text } = data.data[0];
						activePass.site = site;
						activePass.text = text;
						this.setState({
							activePass: activePass
						})
					})
					.catch(err => console.error(err))
			}
		}

		this.setState({
			isEditing: target.checked
		})
	}

	handleClose(e) {
		const event = e;

		this.setState({
			isShowModal: false
		})

		return this.state.isShowModal;
	}

	filterPasswords() {
		const filterText = this.state.searchValue;

		if (filterText === '') {
			return this.state.passwords;
		}

		const passwords = this.state.passwords.filter(password => {
			if (password.site.indexOf(filterText) !== -1) {
				return true;
			}

			return false;
		});

		return passwords;
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="preloader">
					{['secondary', 'secondary', 'secondary'].map((item, i) =>
						<Spinner
							animation="grow"
							variant={item}
							style={{ animationDelay: `${(i + 1) * 150}ms`, animationDuration: '1s', width: '3rem', height: '3rem' }}
						/>
					)}
				</div>
			)
		}

		return (
			<section className="app">
				<Container>
					<Row>
						<Col lg="4">
							<Sitebar
								onClick={this.handleClick}
								onChange={this.handleChange}
								passwords={this.filterPasswords()}
								activePass={this.state.activePass}
								searchValue={this.state.searchValue}
							/>
							<Button onClick={() => this.setState({ isShowModal: true })} variant="primary">Add site</Button>
						</Col>
						<Col lg="8">
							<Editor
								onChangeInp={this.handleChange}
								isEditing={this.state.isEditing}
								activePass={this.state.copyActivePass}
								onChange={this.handleChangeCheckbox}
							/>
						</Col>
					</Row>
				</Container>
				<Dialog
					addNewPass={this.addNewPass}
					newPass={this.state.newPass}
					onChange={this.handleChange}
					handleClose={this.handleClose}
					isShow={this.state.isShowModal}
					isSave={this.state.isSave}
				/>
			</section>
		)
	}
}
