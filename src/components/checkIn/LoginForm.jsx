import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "../../services/firebase";
import { RESOURCES } from '../../resource';
import { Navigation } from "..";

function LoginForm(props) {
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

	const memberSubmitHandler = e => {
		e.preventDefault();
		var member = getMemberData(memberList, phoneInput);
		if (member == null) {
			setShowMemberLoginAlert(true);
		} else {
			setShowMemberLoginAlert(false)
		}
		props.Login(true, member);
	}

	const closeMemberLoginAlert = () => {
		setShowMemberLoginAlert(false);
	}

	function getMemberData(memberList, phoneInput) {
		for (let member of memberList) {
			var memberPhone = member.phone;
			if (phoneInput === memberPhone) {
				return member;
			}
		}
		return null;
	}

	return (
		<>
			<Navigation/>
			<div className="container">
				<div className="row justify-content-center">
					<div className="form-group col-md-4 col-md-offset-5 align-center ">
						<div className="card mt-4">
							<div className="m-3">
								{showMemberLoginAlert ?
									<div className="alert alert-danger" role="alert">
										<button type="button" className="close" onClick={closeMemberLoginAlert}>
											<span aria-hidden="true">&times;</span>
										</button>
										{RESOURCES.CHECKIN.MEMBER.ERROR_NOT_FOUND}
									</div> :
									null
								}
								<div className="card-body">
									<h5 className="card-title">
										{RESOURCES.CHECKIN.MEMBER.TITLE}
									</h5>
									<h6 className="card-subtitle mb-2 text-muted">
										{RESOURCES.CHECKIN.MEMBER.SUBTITLE}
									</h6>
									<p className="card-text">
										{RESOURCES.CHECKIN.MEMBER.MESSAGE}
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
									<Button variant="primary" type="submit" onClick={memberSubmitHandler}>
										{RESOURCES.CHECKIN.MEMBER.BUTTON}
									</Button>
								</Form>
							</div>
						</div>
						<br/>
						<div className="card">
							<div className="m-3">
								<div className="card-body">
									<h5 className="card-title">
										{RESOURCES.CHECKIN.DROPIN.TITLE}
									</h5>
									<h6 className="card-subtitle mb-2 text-muted">
										{RESOURCES.CHECKIN.DROPIN.SUBTITLE}
									</h6>
									<p className="card-text">
										{RESOURCES.CHECKIN.DROPIN.MESSAGE}
									</p>
								</div>
								<Form>
									<Form.Group className="mb-3" controlId="formBasicEmail">
										<Form.Control type="email" placeholder="Enter full name"/>
									</Form.Group>
									<Button variant="secondary" type="submit" onClick={memberSubmitHandler}>
										{RESOURCES.CHECKIN.DROPIN.BUTTON}
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</div> 
			</div>
		</>
	)
}

export default LoginForm