import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup } from 'react-bootstrap';
import { resources } from '../resource'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SessionLogin from "./SessionLogin";
import EndSession from "./EndSession";
import firebase from "../services/firebase";

var numOfCourts = 3;

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [currConfig, setCurrConfig] = useState(null);

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

    setCurrConfig([
                    ["Jonathan", "Jessie", "Ranran", "Ruru"],
                    ["Dudu", "Sully", "Pooh", "mPooh"],
                    [, "Conrad", , "Beary"]
                  ]);
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
      {true ?//loggedIn ?
        <div className="container-fluid">
          <div className="row flex-grow">
            <div className="col">
              <Card className="mt-3">
                <Card.Header>Currently Playing</Card.Header>
                <Card.Body className="p-0">
                  <div className="col">
                    <div className="row flex-grow">
                      {[...Array(numOfCourts)].map((x, i) =>
                        <ListGroup as="ul" key={i} className="list-group flex-fill m-2">
                          <ListGroup.Item as="li" className="list-group-item" active>Court {i+1}</ListGroup.Item>
                          <ShowCurrentList courtId={i} slotId={0} currConfig={currConfig}/>
                          <ShowCurrentList courtId={i} slotId={1} currConfig={currConfig}/>
                          <ShowCurrentList courtId={i} slotId={2} currConfig={currConfig}/>
                          <ShowCurrentList courtId={i} slotId={3} currConfig={currConfig}/>
                        </ListGroup>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="w-100"></div>
              <div className="col">
                <div className="row flex-grow">
                  {[...Array(numOfCourts)].map((x, i) =>
                    <div key={i} className="col">{i}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-4 bg-secondary text-white">
              List of players placeholder
            </div>
          </div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <EndSession Logout={Logout}></EndSession>
        </div>:
        <SessionLogin Login={Login} sessionList={sessionList}/>
      }
    </div>
  );
}

function DeleteSession() {
  const sessionRef = firebase.database().ref('Sessions');
  const playerRef = firebase.database().ref('Players');

  sessionRef.remove();
  playerRef.remove();
}

function ShowCurrentList(props) {
  const courtId = props.courtId;
  const slotId = props.slotId;
  const currConfig = props.currConfig;

  // Only render if name is not null otherwise render "Empty"
  if (currConfig && currConfig[courtId] && currConfig[courtId][slotId]) {
    return (
      <ListGroup.Item className="list-group-item" disabled>{currConfig[courtId][slotId]}</ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item className="list-group-item" disabled>Empty</ListGroup.Item>
    );
  }
}

export default Session;