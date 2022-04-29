import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "../services/firebase";
import { resources } from '../resource';

function LoginForm({ Login, error }) {
	const [phoneInput, setPhoneInput] = useState("");
	const [memberList, setMemberList] = useState([]);
	const [showMemberLoginAlert, setShowMemberLoginAlert] = useState(false);

	useEffect(() => {
		const memberRef = firebase.database().ref('Members')

		memberRef.on('value', (snapshot) => {
			const members = snapshot.val();
			const memberList = [];
			for (let uuid in members) {
				memberList.push({uuid, ...members[uuid]});
			}
			setMemberList(memberList);
		});
	}, []);

	const submitHandler = e => {
		e.preventDefault();
		var member = GetMemberData(memberList, phoneInput);
		if (member == null) {
			setShowMemberLoginAlert(true);
		} else {
			setShowMemberLoginAlert(false)
		}

		Login(member);
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="form-group col-md-4 col-md-offset-5 align-center ">
					<div className="card mt-4">
						<div className="m-3">
							{showMemberLoginAlert ?
								<div className="alert alert-danger" role="alert">
									{resources.CHECKIN.MEMBER.ERROR_NOT_FOUND}
								</div> :
								null
							}
							<div className="card-body">
								<h5 className="card-title">
									{resources.CHECKIN.MEMBER.TITLE}
								</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									{resources.CHECKIN.MEMBER.SUBTITLE}
								</h6>
								<p className="card-text">
									{resources.CHECKIN.MEMBER.MESSAGE}
								</p>
							</div>
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Control
										type="email"
										placeholder="Enter registered phone"
										onChange={(e) => {setPhoneInput(e.currentTarget.value)}}
										/>
								</Form.Group>
								<Button variant="primary" type="submit" onClick={submitHandler}>
									{resources.CHECKIN.MEMBER.BUTTON}
								</Button>
							</Form>
						</div>
					</div>
					<br/>
					<div className="card">
						<div className="m-3">
							<div className="card-body">
								<h5 className="card-title">
									{resources.CHECKIN.DROPIN.TITLE}
								</h5>
								<h6 className="card-subtitle mb-2 text-muted">
									{resources.CHECKIN.DROPIN.SUBTITLE}
								</h6>
								<p className="card-text">
									{resources.CHECKIN.DROPIN.MESSAGE}
								</p>
							</div>
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Control type="email" placeholder="Enter full name"/>
								</Form.Group>
								<Button variant="secondary" type="submit" onClick={submitHandler}>
									{resources.CHECKIN.DROPIN.BUTTON}
								</Button>
							</Form>
						</div>
					</div>
				</div>
			</div> 
		</div>

	)
}

function GetMemberData(memberList, phoneInput) {
	for (let member of memberList) {
		var memberPhone = member.phone;
		if (phoneInput === memberPhone) {
			return member;
		}
	}
	return null;
}

export default LoginForm