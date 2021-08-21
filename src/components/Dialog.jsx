import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import './Dialog.sass';

function Dialog(props) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(props.handleClose);

	function isEmpty() {
		if (props.newPass['mSiteVal'] === '' || props.newPass['mTextVal'] === '') {
			return true;
		}

		return false;
	}

	function renderSpinner() {
		return (
			<>
				<Spinner
					as="span"
					size="sm"
					role="status"
					animation="border"
					aria-hidden="true"
				/>
				&nbsp;Loading
			</>
		)
	}

	return (
		<>
			<Modal 
				onHide={handleClose} 
				show={props.isShow || props.isSave} 
				className={props.isSave ? 'modal--disable' : false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Name site</Form.Label>
						<Form.Control
							name="mSiteVal"
							placeholder="Enter site"
							onChange={props.onChange}
							value={props.newPass['mSiteVal']}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Accesses site</Form.Label>
						<Form.Control
							rows="4"
							as="textarea"
							name="mTextVal"
							onChange={props.onChange}
							placeholder="Enter accesses"
							value={props.newPass['mTextVal']}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
        	</Button>
					<Button
						variant="primary"
						disabled={isEmpty() || props.isSave}
						onClick={props.addNewPass}
					>
						{props.isSave ? renderSpinner() : 'Save site'}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Dialog;