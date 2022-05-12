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
		<div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-4 col-md-offset-5 align-center ">
          <div className="card mt-4">
            <div className="m-3">
              {showPasswordWrongAlert ?
                <div className="alert alert-danger" role="alert">
                  {resources.SESSION.LOGIN.ERROR_NOT_FOUND}
                </div> :
                null
              }
              <Form>
                <Form.Control
                  placeholder="Enter admin password"
                  type="password"
                  onChange={(e) => {setPasswordInput(e.currentTarget.value)}}
                  />
              </Form>
              <br/>
              {sessionList.length !== 0 ?
                <div>
                  <button type="button" className="btn btn-primary btn-block" onClick={accessSessionHandler}>
                  {resources.SESSION.LOGIN.ENTER_SESSION}
                  </button>
                  <br/>
                  <h6>
                    {resources.SESSION.LOGIN.SESSION_TEXT}&nbsp;
                    <span className="badge bg-success text-light">
                      {resources.SESSION.LOGIN.SESSION_ACTIVE}
                    </span>
                  </h6>
                </div> :
                <div>
                  <button type="button" className="btn btn-success btn-block" onClick={createAndAccessSessionHandler}>
                    {resources.SESSION.LOGIN.CREATE_SESSION}
                  </button>
                  <br/>
                  <h6>
                    {resources.SESSION.LOGIN.SESSION_TEXT}&nbsp;
                    <span className="badge bg-secondary text-light">
                      {resources.SESSION.LOGIN.SESSION_INACTIVE}
                    </span>
                  </h6>
                </div>
              }
            </div>
          </div>
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