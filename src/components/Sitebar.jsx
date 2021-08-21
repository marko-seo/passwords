import React from 'react';
import { ListGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import './Sitebar.sass';

function Search(props) {
	return (
		<>
			<InputGroup className="aside__search">
				<InputGroup.Prepend>
					<InputGroup.Text>
						<img className="img-responsive" src="icon-search.svg" alt="" />
					</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					name="field-search"
					placeholder="Search"
					value={props.searchValue}
					onChange={props.onChange}
				/>
			</InputGroup>
		</>
	)
}

function Sitebar(props) {

	const passwords = props.passwords.map((password, i) =>
		<ListGroup.Item 
			action
			key={password.id}
			data-id={password.id}
			className="aside__item" 
			active={props.activePass.id === password.id ? true : false}
		>
			{password.site}
		</ListGroup.Item>
	)

	return (
		<aside className="aside">
			<Search
				onChange={props.onChange}
				searchValue={props.searchValue}
			/>
			<ListGroup
				onClick={props.onClick}
				className="aside__list"
			>
				{passwords}
			</ListGroup>
			{passwords.length  === 0 && 
				<p>Not Result</p>
			}
			{/* <Button onClick={props.handleShow} variant="primary">Add site</Button> */}
		</aside>
	)
}

export default Sitebar;