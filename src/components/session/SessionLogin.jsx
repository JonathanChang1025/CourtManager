import { useState } from 'react';
import { Form } from 'react-bootstrap';
import firebase from "../../services/firebase";
import { RESOURCES } from '../../resource';

function SessionLogin({ login, sessionList }) {
  const [passwordInput, setPasswordInput] = useState("");
	const [showPasswordWrongAlert, setShowPasswordWrongAlert] = useState(false);

	const accessSessionHandler = e => {
		e.preventDefault();

    if (passwordInput === process.env.REACT_APP_ADMIN_PASSWORD) {
      setShowPasswordWrongAlert(false);
      login();
    } else {
      setShowPasswordWrongAlert(true);
    }
	}

  const createAndAccessSessionHandler = e => {
    e.preventDefault();

    if (passwordInput === process.env.REACT_APP_ADMIN_PASSWORD) {
      setShowPasswordWrongAlert(false);
      createSession();
      login();
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
                  {RESOURCES.SESSION.LOGIN.ERROR_NOT_FOUND}
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
                  {RESOURCES.SESSION.LOGIN.ENTER_SESSION}
                  </button>
                  <br/>
                  <h6>
                    {RESOURCES.SESSION.LOGIN.SESSION_TEXT}&nbsp;
                    <span className="badge bg-success text-light">
                      {RESOURCES.SESSION.LOGIN.SESSION_ACTIVE}
                    </span>
                  </h6>
                </div> :
                <div>
                  <button type="button" className="btn btn-success btn-block" onClick={createAndAccessSessionHandler}>
                    {RESOURCES.SESSION.LOGIN.CREATE_SESSION}
                  </button>
                  <br/>
                  <h6>
                    {RESOURCES.SESSION.LOGIN.SESSION_TEXT}&nbsp;
                    <span className="badge bg-secondary text-light">
                      {RESOURCES.SESSION.LOGIN.SESSION_INACTIVE}
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

function createSession() {
	const sessionRef = firebase.database().ref('Sessions');
  sessionRef.push({
    created_at : Date(),
    active : true
  })
}

export default SessionLogin