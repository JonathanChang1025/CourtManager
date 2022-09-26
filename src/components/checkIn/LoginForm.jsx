import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import firebase from "../../services/firebase";
import { RESOURCES } from '../../resource';
import { Navigation } from "..";
import { v4 as uuidv4 } from "uuid";
import UsernameAlert from "../shared/UsernameAlert";
import { validatePlayerName } from "../shared/PlayerAPI";

function LoginForm(props) {
	const [phoneInput, setPhoneInput] = useState("");
	const [nameInput, setNameInput] = useState("");
	const [memberList, setMemberList] = useState([]);
	const [playerList, setPlayerList] = useState([]);
	const [showMemberLoginAlert, setShowMemberLoginAlert] = useState(false);
	const [showDropinLoginAlert, setShowDropinLoginAlert] = useState("");

	useEffect(() => {
		setPlayersListener();
		setMembersListener();
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
		const playerRef = firebase.database().ref('Players');

    playerRef.once('value', (snapshot) => {
			const players = snapshot.val();

			for (let uuid in players) {
				if (players[uuid].name === nameInput) {
					// Check if its a drop-in relogin by comparing ipv4
					if (props.userIpAddress === players[uuid].ipv4_address) {
						props.login(
							players[uuid].approved,
							{
								uuid: players[uuid].user_uuid,
								name: players[uuid].name
							}
						);
						return;
					}
				}
			}

			try {
					validatePlayerName(
						nameInput,
						playerList.map((player) => player.name),
						memberList.map((member) => member.name)
					); // If invalid it will throw error

					setShowDropinLoginAlert("");
					props.login(
						false,
						{
							uuid: uuidv4(),
							name: nameInput
						}
					);
			} catch (e) {
				setShowDropinLoginAlert(e.message);
			}
    });
	}

	const closeMemberLoginAlert = () => {
		setShowMemberLoginAlert(false);
	}

	const closeDropinLoginAlert = () => {
		setShowDropinLoginAlert("");
	}

	const closeDropinRejectAlert = () => {
		props.setShowDropinRejectAlert(false);
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

	function setPlayersListener() {
    const playerRef = firebase.database().ref('Players')
  
    playerRef.orderByChild("position").on("value", (snapshot) => {
      const playerListBuilder = [];
      snapshot.forEach(function(player) {
        playerListBuilder.push({uuid: player.key, ...player.val()});
      });
      setPlayerList(playerListBuilder);
    });
  }

  function setMembersListener() {
    const memberRef = firebase.database().ref('Members');

		memberRef.on('value', (snapshot) => {
			const members = snapshot.val();
			const memberList = [];
			for (let uuid in members) {
				memberList.push({uuid, ...members[uuid]});
			}
			setMemberList(memberList);
		});
  }

	return (
		<>
			<Navigation/>
			<div className="container">
				<div className="row justify-content-center">
					<div className="form-group col-md-4 col-md-offset-5 align-center ">
						<div className="card mt-3">
							<div className="m-3">
								{
									showMemberLoginAlert ?
									<div className="alert alert-danger" role="alert">
										<button type="button" className="close" onClick={closeMemberLoginAlert}>
											<span aria-hidden="true">&times;</span>
										</button>
										{RESOURCES.CHECKIN.MEMBER.ERROR_NOT_FOUND}
									</div> :
									null
								}
								{
									showDropinLoginAlert !== "" ?
									<UsernameAlert
										showMessageAlert={showDropinLoginAlert}
										closeMessageAlert={closeDropinLoginAlert}
									/> :
									null
								}
								{
									props.showDropinRejectAlert ?
									<div className="alert alert-danger" role="alert">
										<button type="button" className="close" onClick={closeDropinRejectAlert}>
											<span aria-hidden="true">&times;</span>
										</button>
										{RESOURCES.CHECKIN.DROPIN.REJECT}
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
											placeholder="Enter first and last name"
											onChange={(e) => {setNameInput(e.currentTarget.value.trim())}}
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