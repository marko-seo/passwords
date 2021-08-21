import React, { useRef, useEffect } from 'react';
import { Card, Alert, Form } from 'react-bootstrap';
import './Editor.sass';

function Editor(props) {
	const textarea = useRef(null);
	const height = 38;

	useEffect(() => {
		if (textarea.current) {
			if (textarea.current.offsetHeight === textarea.current.scrollHeight) return;
			// console.log('height = '+textarea.current.offsetHeight+ ' scroll = ' + textarea.current.scrollHeight);
			textarea.current.style.height = `${height}px`;
			textarea.current.style.height = `${textarea.current.scrollHeight}px`;
		}
	});

	if (!props.activePass.id) {
		return (
			<Alert variant="secondary">
				Select password
			</Alert>
		)
	}

	return (
		<Card className="editor">
			<Card.Header as="h5">Editor</Card.Header>
			<Card.Body className="editor__inner">
				<Card.Title>
					Site
					<Form.Control
						name="site"
						readOnly={!props.isEditing}
						onChange={props.onChangeInp}
						value={props.activePass.site}
					/>
				</Card.Title>
				<Form.Control
					name="text"
					as="textarea"
					ref={textarea}
					className="textarea"
					readOnly={!props.isEditing}
					onChange={props.onChangeInp}
					value={props.activePass.text}
				/>
			</Card.Body>
			<Card.Footer>
				<Form.Check
					type="switch"
					id="custom-switch"
					label="enable edit"
					checked={props.isEditing}
					onChange={props.onChange}
				/>
			</Card.Footer>
		</Card>
	)
}

export default Editor;
