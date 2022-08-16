import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "../../services/firebase";
import { RESOURCES } from '../../resource';
import { Navigation } from "..";
import { v4 as uuidv4 } from "uuid";

function LoginForm(props) {
	const [phoneInput, setPhoneInput] = useState("");
	const [nameInput, setNameInput] = useState("");
	const [memberList, setMemberList] = useState([]);
	const [showMemberLoginAlert, setShowMemberLoginAlert] = useState(false);
	const [showDropinLoginAlert, setShowDropinLoginAlert] = useState("");

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
		var member = getMemberData(phoneInput);
		if (member == null) {
			setShowMemberLoginAlert(true);
		} else {
			setShowMemberLoginAlert(false)
		}
		props.login(true, member);
	}

	const dropinSubmitHandler = e => {
		e.preventDefault();

		var nameTaken = false;
		const playerRef = firebase.database().ref('Players')

    playerRef.once('value', (snapshot) => {
			const players = snapshot.val();

			for (let uuid in players) {
				if (players[uuid].name.trim() === nameInput.trim()) {
					nameTaken = true;
				}
			}

			memberList.map((member) => {
				if (member.name.trim() === nameInput.trim()) {
					nameTaken = true;
				}
			})

			if (nameInput.length < 4) {
				setShowDropinLoginAlert(RESOURCES.CHECKIN.DROPIN.ERROR_TOO_SHORT);
			} else if (nameInput.length > 20) {
				setShowDropinLoginAlert(RESOURCES.CHECKIN.DROPIN.ERROR_TOO_LONG);
			} else if (nameTaken) {
				setShowDropinLoginAlert(RESOURCES.CHECKIN.DROPIN.ERROR_TAKEN);
			} else {
				setShowDropinLoginAlert("");
				props.createPlayer(
					{
						uuid: uuidv4(),
						name: nameInput
        	},
					props.sessionUuid,
					snapshot.numChildren(),
					false
				);
			}

    });
	}

	const closeMemberLoginAlert = () => {
		setShowMemberLoginAlert(false);
	}

	const closeDropinLoginAlert = () => {
		setShowDropinLoginAlert("");
	}

	function getMemberData(phoneInput) {
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
								{showDropinLoginAlert !== "" ?
									<div className="alert alert-danger" role="alert">
										<button type="button" className="close" onClick={closeDropinLoginAlert}>
											<span aria-hidden="true">&times;</span>
										</button>
										{showDropinLoginAlert}
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
										<Form.Control
											type="email"
											placeholder="Enter full name"
											onChange={(e) => {setNameInput(e.currentTarget.value)}}
											/>
									</Form.Group>
									<Button variant="secondary" type="submit" onClick={dropinSubmitHandler}>
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