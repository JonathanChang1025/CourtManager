import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import { resources } from '../resource'
import SessionLogin from "./SessionLogin";
import firebase from "../services/firebase";

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
		const sessionRef = firebase.database().ref('Sessions')

		sessionRef.on('value', (snapshot) => {
			const sessions = snapshot.val();
			const sessionList = [];
			for (let uuid in sessions) {
				sessionList.push({uuid, ...sessions[uuid]});
			}
			setSessionList(sessionList);

      if (!sessionList.length) {
        setLoggedIn(false);
      }
		});

	}, []);

  const Login = () => {
    setLoggedIn(true);
  }

  const Logout = () => {
    DeleteSession();
    setLoggedIn(false);
  }

  return (
    <div>
      {loggedIn ?
        <button type="button" class="btn btn-danger btn-block" onClick={Logout}>
          End Session
        </button> :
        <SessionLogin Login={Login} sessionList={sessionList}/>
      }
    </div>
  );
}

function DeleteSession() {
  const sessionRef = firebase.database().ref('Sessions');
  sessionRef.remove();
}

export default Session;