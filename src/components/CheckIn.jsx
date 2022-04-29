import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { resources } from '../resource'
import firebase from "../services/firebase";

function CheckIn() {
  const [sessionActive, setSessionActive] = useState(false);
  const [member, setMember] = useState(null);
  const [guest, setGuest] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
		const sessionRef = firebase.database().ref('Sessions')

		sessionRef.on('value', (snapshot) => {
			const sessions = snapshot.val();
			const sessionList = [];
			for (let uuid in sessions) {
				sessionList.push({uuid, ...sessions[uuid]});
			}

      if (!sessionList.length) {
        setSessionActive(false);
      } else {
        setSessionActive(true);
      }
		});

	}, []);

  const Login = details => {
    setMember(details);
  }

  const Logout = () => {
    setMember(null);
  }

  return (
    <div className="CheckIn">
      {sessionActive ?
        <>
          {member != null ?
              <div className="welcome">
                  <h2>Welcome, <span>{member.name}</span></h2>
                  <button onClick={Logout}>Logout</button>
              </div> :
              <LoginForm Login={Login} error={error}/>
          }
        </> :
        <div className="m-4 p-5 bg-secondary text-white rounded">
          <div className="container">
            <h1 className="display-4">{resources.CHECKIN.INACTIVE.TITLE}</h1>
            <p className="lead">{resources.CHECKIN.INACTIVE.MESSAGE}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default CheckIn;