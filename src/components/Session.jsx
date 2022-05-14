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
  const [playerList, setPlayerList] = useState([]);


  useEffect(() => {
    SetSessionsListener(setSessionList, setLoggedIn);
    SetPlayersListener(setPlayerList);
	}, []);

  const Login = () => {
    setLoggedIn(true);
  }

  const Logout = () => {
    DeleteSession();
    setLoggedIn(false);
  }

  // All players are stored in a single array: playerList
  // Each context (idle players, court 1, court 2, ...) are denoted by player.next_court = -1, 0, 1, ... respectively
  // Each list is rendered by loading only those players in that context.
  // The result index returns the index the player is in WITHIN the context of each individual list (withinContext)
  // In order to reorder them, we move them around in the master array: playerList, which means we need to know the
  //   index from playerList (withinGlobal)
  function handleOnDragEnd(result) {
    console.log(result);
    
    console.log(playerList);
    if (!result.destination) return;
    const items = Array.from(playerList);
    var globalSourceIndex = getIndexWithinGlobal(result.source.index, result.source.droppableId);

    if (result.source.droppableId === result.destination.droppableId) {
      const [reorderedItem] = items.splice(globalSourceIndex, 1);
      var globalDestinationIndex = getIndexWithinGlobal(result.destination.index, result.destination.droppableId);
      items.splice(globalDestinationIndex, 0, reorderedItem);
  
      setPlayerList(items);
    } else {
      items[globalSourceIndex].next_court = Number(result.destination.droppableId);
      setPlayerList(items);
    }
  }

  function getIndexWithinGlobal(indexTarget, context) {
    var indexWithinGlobal = -1;
    for (let i = 0; i < playerList.length; i++) {
      if (playerList[i].next_court === Number(context)) indexWithinGlobal++;
      if (indexWithinGlobal === indexTarget) return i;
    }
  }

  function getIndexWithinContext(indexTarget, context) {
    var indexWithinContext = 0;

    for (let i = 0; i < playerList.length; i++) {
      if (i === indexTarget) return indexWithinContext;
      if (playerList[i].next_court === context) indexWithinContext++;
    }
  }

  return (
    <>
      {loggedIn ?
        <div className="container-fluid">
          <div className="row flex-grow p-2">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <div className="col p-0">
                <Card className="text-center" bg="success" text="light">
                  <Card.Header>Currently Playing</Card.Header>
                  <Card.Body className="p-0">
                    <div className="col">
                      <div className="row flex-grow">
                        {[...Array(numOfCourts)].map((x, i) =>
                          <ul className="list-group flex-fill m-2">
                            <li className="list-group-item list-group-item-success">Court {i+1}</li>
                          </ul>
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
                        {[...Array(numOfCourts)].map((x, court_id) =>
                          <Droppable droppableId={court_id.toString()}>
                            {(provided, snapshot) => (
                              <div className="col p-0">
                                <ul className="list-group flex-fill m-2"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{
                                    //background: snapshot.isDraggingOver ? "lightblue" : null,
                                    minHeight: 245
                                  }}  
                                >
                                  <li className="list-group-item list-group-item-primary">Court {court_id+1}</li>
                                  {
                                    playerList.map((player, index) => {
                                      if (player.next_court === court_id) {
                                        var indexWithinContext = getIndexWithinContext(index, court_id);
                                        return (
                                          <Draggable key={player.uuid} draggableId={player.uuid} index={indexWithinContext}>
                                            {(provided) => (
                                              <li
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className="list-group-item list-group-item-light"
                                              >
                                                {player.name}
                                              </li>
                                            )}
                                          </Draggable>
                                        );
                                      }
                                    })
                                  }
                                  {provided.placeholder}
                                </ul>
                              </div>
                            )}
                          </Droppable>
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
                        <Droppable droppableId="-1">
                          {(provided, snapshot) => (
                            <ul className="list-group flex-fill m-2"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                //background: snapshot.isDraggingOver ? "lightblue" : null,
                                minHeight: 500
                              }}
                            >
                              {
                                playerList.map((player, index) =>
                                {
                                  // Only display available players if they don't have next court set for them
                                  if (player.next_court === -1) {
                                    var indexWithinContext = getIndexWithinContext(index, -1);
                                    return (
                                      <Draggable key={player.uuid} draggableId={player.uuid} index={indexWithinContext}>
                                        {(provided) => (
                                          <li
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="list-group-item
                                              d-flex
                                              justify-content-between
                                              align-items-center
                                              list-group-item-light"
                                          >
                                            {player.name}
                                            <span className="badge badge-primary badge-pill">{player.total_games}</span>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  }
                                })
                              }
                              {provided.placeholder}
                            </ul>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </DragDropContext>
          </div>
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