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
		<div class="container">
			<div class="row justify-content-center">
				<div class="form-group col-md-4 col-md-offset-5 align-center ">
					<div class="card">
						<div class="m-3">
							{showMemberLoginAlert ?
								<div class="alert alert-danger" role="alert">
									{resources.LOGIN.MEMBER.ERROR_NOT_FOUND}
								</div> :
								null
							}
							<div class="card-body">
								<h5 class="card-title">
									{resources.LOGIN.MEMBER.TITLE}
								</h5>
								<h6 class="card-subtitle mb-2 text-muted">
									{resources.LOGIN.MEMBER.SUBTITLE}
								</h6>
								<p class="card-text">
									{resources.LOGIN.MEMBER.MESSAGE}
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
									{resources.LOGIN.MEMBER.BUTTON}
								</Button>
							</Form>
						</div>
					</div>
					<br/><br/>
					<div class="card">
						<div class="m-3">
							<div class="card-body">
								<h5 class="card-title">
									{resources.LOGIN.DROPIN.TITLE}
								</h5>
								<h6 class="card-subtitle mb-2 text-muted">
									{resources.LOGIN.DROPIN.SUBTITLE}
								</h6>
								<p class="card-text">
									{resources.LOGIN.DROPIN.MESSAGE}
								</p>
							</div>
							<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Control type="email" placeholder="Enter full name"/>
								</Form.Group>
								<Button variant="secondary" type="submit" onClick={submitHandler}>
									{resources.LOGIN.DROPIN.BUTTON}
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