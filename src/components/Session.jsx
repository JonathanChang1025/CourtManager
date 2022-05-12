import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup } from 'react-bootstrap';
import { resources } from '../resource'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SessionLogin from "./SessionLogin";
import EndSession from "./EndSession";
import firebase from "../services/firebase";
import { Navigation } from "./";

var numOfCourts = 3;

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [currConfig, setCurrConfig] = useState([[]]);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    SetSessionsListener(setSessionList, setLoggedIn);
    SetPlayersListener(setPlayerList);

    // setCurrConfig([
    //                 ["Jonathan", "Jessie", "Ranran", "Ruru"],
    //                 ["Dudu", "Sully", "Pooh", "mPooh"],
    //                 [, "Conrad", , "Beary"]
    //               ]);
	}, []);

  const Login = () => {
    setLoggedIn(true);
  }

  const Logout = () => {
    DeleteSession();
    setLoggedIn(false);
  }

  return (
    <>
      {loggedIn ?
        <div className="container-fluid">
          <div className="row flex-grow p-2">
            <div className="col p-0">
              <Card className="text-center" bg="success" text="light">
                <Card.Header>Currently Playing</Card.Header>
                <Card.Body className="p-0">
                  <div className="col">
                    <div className="row flex-grow">
                      {[...Array(numOfCourts)].map((x, i) =>
                        <ListGroup as="ul" key={i} className="list-group flex-fill m-2">
                          <ListGroup.Item as="li" className="list-group-item list-group-item-success">
                            Court {i+1}
                          </ListGroup.Item>
                          <ShowCourtList courtId={i} slotId={0} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={1} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={2} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={3} currConfig={currConfig}/>
                        </ListGroup>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="w-100"></div>
              <button type="button" className="btn btn-warning btn-block my-2">⬆ start next game ⬆</button>
              <Card className="text-center" bg="primary" text="light">
                <Card.Header>In Queue</Card.Header>
                <Card.Body className="p-0">
                  <div className="col">
                    <div className="row flex-grow">
                      {[...Array(numOfCourts)].map((x, i) =>
                        <ListGroup as="ul" key={i} className="list-group flex-fill m-2">
                          <ListGroup.Item as="li" className="list-group-item list-group-item-primary">Court {i+1}</ListGroup.Item>
                          <ShowCourtList courtId={i} slotId={0} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={1} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={2} currConfig={currConfig}/>
                          <ShowCourtList courtId={i} slotId={3} currConfig={currConfig}/>
                        </ListGroup>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-3 p-0">
              <Card className="text-center ml-2 h-100" bg="dark" text="light">
                <Card.Header>Available Players</Card.Header>
                <Card.Body className="p-0">
                  <div className="col">
                    <div className="row flex-grow">
                      <ListGroup as="ul" className="list-group flex-fill m-2">
                        {
                          playerList.map((player) =>
                            <ListGroup.Item 
                              as="li"
                              key={player.uuid}
                              className="list-group-item
                                d-flex
                                justify-content-between
                                align-items-center
                                list-group-item-light"
                            >
                              {player.name}
                              <span className="badge badge-primary badge-pill">{player.total_games}</span>
                            </ListGroup.Item>
                          )
                        }
                      </ListGroup>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <EndSession Logout={Logout}></EndSession>
        </div>:
        <>
          <Navigation/>
          <SessionLogin Login={Login} sessionList={sessionList}/>
        </>
      }
    </>
  );
}

function DeleteSession() {
  const sessionRef = firebase.database().ref('Sessions');
  const playerRef = firebase.database().ref('Players');

  sessionRef.remove();
  playerRef.remove();
}

function ShowCourtList(props) {
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

function ShowAvailablePlayerList(props) {
  const playerList = props.playerList;

  
}

function SetSessionsListener(setSessionList, setLoggedIn) {
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
}

function SetPlayersListener(setPlayerList) {
  const sessionRef = firebase.database().ref('Players')

  sessionRef.on('value', (snapshot) => {
    const players = snapshot.val();
    const playerList = [];
    for (let uuid in players) {
      playerList.push({uuid, ...players[uuid]});
    }
    setPlayerList(playerList);
  });
}

export default Session;