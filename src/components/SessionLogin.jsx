import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import firebase from "../services/firebase";
import { resources } from '../resource';

function SessionLogin({ Login, sessionList }) {
  const [passwordInput, setPasswordInput] = useState("");
	const [showPasswordWrongAlert, setShowPasswordWrongAlert] = useState(false);

	const accessSessionHandler = e => {
		e.preventDefault();

    if (passwordInput === process.env.REACT_APP_ADMIN_PASSWORD) {
      setShowPasswordWrongAlert(false);
      Login();
    } else {
      setShowPasswordWrongAlert(true);
    }
	}

  const createAndAccessSessionHandler = e => {
    e.preventDefault();

    if (passwordInput === process.env.REACT_APP_ADMIN_PASSWORD) {
      setShowPasswordWrongAlert(false);
      CreateSession();
      Login();
    } else {
      setShowPasswordWrongAlert(true);
    }
  }

	return (
		<div class="container">
      <div class="row justify-content-center">
        <div class="form-group col-md-4 col-md-offset-5 align-center ">
          {showPasswordWrongAlert ?
            <div class="alert alert-danger" role="alert">
              Access Denied
            </div> :
            null
          }
          <Form>
            <Form.Control
              placeholder="Enter admin password"
              onChange={(e) => {setPasswordInput(e.currentTarget.value)}}
              />
          </Form>
          {sessionList.length != 0 ?
            <div>
              <button type="button" class="btn btn-primary btn-block" onClick={accessSessionHandler}>
                Access Live Session
              </button>
              <h6>Current Session <span class="badge bg-success text-light">Active</span></h6>
            </div> :
            <div>
            <button type="button" class="btn btn-success btn-block" onClick={createAndAccessSessionHandler}>
              Create New Badminton Session
            </button>
            <h6>Current Session <span class="badge bg-secondary text-light">Inactive</span></h6>
            </div>
            
          }
        </div>
      </div>
    </div>

	)
}

function CreateSession() {
	const sessionRef = firebase.database().ref('Sessions');
  sessionRef.push({
    created_at : Date(),
    active : true
  })
}

export default SessionLogin