import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup } from 'react-bootstrap';
import { resources } from '../resource'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SessionLogin from "./SessionLogin";
import EndSession from "./EndSession";
import firebase from "../services/firebase";
import { Navigation } from "./";

// The way this class works is by adding a listener on the players; the local playerList will be updated as the realtime database is changed
// When modifying player data, just call UpdatePlayerData() to update it onto the cloud so that all instances will reflect the change

var numOfCourts = 3;
var maxPlayerPerCourt = 4;

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
    if (!result.destination) return;

    const tempPlayerList = Array.from(playerList);
    var globalSourceIndex = getIndexWithinGlobal(result.source.index, result.source.droppableId);
    var globalDestinationIndex = getIndexWithinGlobal(result.destination.index, result.destination.droppableId);

    // If list is just being re-ordered in the same context droppable area, otherwise go to else
    if (result.source.droppableId === result.destination.droppableId) {
      const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
      tempPlayerList.splice(globalDestinationIndex, 0, movingPlayer);

      // Reconfigure all the position value based on index of array
      for (var i = 0; i < tempPlayerList.length; i++) {
        tempPlayerList[i].position = i;
        UpdatePlayerData(tempPlayerList[i], "position");
      }
    } else {
      const numberOfPriorPlayersOnThisCourt = result.destination.index;
      const destinationCourtId = Number(result.destination.droppableId);

      var numberOfPlayersOnThisCourt = 0;
      playerList.forEach(function(player) {
        if (player.next_court == destinationCourtId) {
          numberOfPlayersOnThisCourt++;
        }
      })

      if (numberOfPlayersOnThisCourt < maxPlayerPerCourt) {
        var numberOfPriorPlayersCounter = 0;
        if (numberOfPriorPlayersOnThisCourt === 0) {
          tempPlayerList[globalSourceIndex].next_court = Number(result.destination.droppableId);
          UpdatePlayerData(tempPlayerList[globalSourceIndex], "next_court");

          const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
          tempPlayerList.splice(0, 0, movingPlayer);
        } else {
          for (var i = 0; i < tempPlayerList.length; i++) {
            if (tempPlayerList[i].next_court === destinationCourtId) {
              numberOfPriorPlayersCounter++;
              if (numberOfPriorPlayersOnThisCourt === numberOfPriorPlayersCounter) {
                console.log(tempPlayerList[i].name + " is above me. their global index is: " + i);
                console.log("my global index is: "+ globalSourceIndex);

                const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
                if (globalSourceIndex > i) i+=1;

                tempPlayerList.splice(i, 0, movingPlayer);
                tempPlayerList[i].next_court = Number(result.destination.droppableId);
                UpdatePlayerData(tempPlayerList[i], "next_court");
                break;
              }
            }
          }
        }
      }
    }
    // Reconfigure all the position value based on index of array
    for (var i = 0; i < tempPlayerList.length; i++) {
      tempPlayerList[i].position = i;
      UpdatePlayerData(tempPlayerList[i], "position");
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

  const startNextGame = () => {
    playerList.forEach(function (player) {
      // Increase game count for those who just got off
      if (player.current_court != -1) {
        player.total_games += 1;
      }
      // Clear everyone off
      player.current_court = -1;
      // Set those who are next to play onto court and clear them off of queue
      if (player.next_court != -1) {
        player.current_court = player.next_court;
        player.next_court = -1;
      }

      UpdatePlayerData(player, "current_court");
      UpdatePlayerData(player, "next_court");
      UpdatePlayerData(player, "total_games");
    });
  }

  return (
    <>
      {true ? //loggedIn ?
        <div className="container-fluid">
          <div className="row flex-grow p-2">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <div className="col p-0">
                <Card className="text-center" bg="success" text="light">
                  <Card.Header>Currently Playing</Card.Header>
                  <Card.Body className="p-0">
                    <div className="col">
                      <div className="row flex-grow">
                        {[...Array(numOfCourts)].map((x, court_id) =>
                          <div className="col p-0">
                            <p>Court {court_id+1}</p>
                            <ul className="list-group flex-fill m-2"
                              style={{minHeight: 200}}
                            >
                              {
                                playerList.map(function(player){
                                  if (player.current_court == court_id) {
                                    return (
                                      <li className="list-group-item list-group-item-success">{player.name}</li>
                                    );
                                  }
                                })
                              }
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <div className="w-100"></div>
                <button type="button" className="btn btn-warning btn-block my-2" onClick={startNextGame}>⬆ start next game ⬆</button>
                <Card className="text-center" bg="primary" text="light">
                  <Card.Header>In Queue</Card.Header>
                  <Card.Body className="p-0">
                    <div className="col">
                      <div className="row flex-grow">
                        {[...Array(numOfCourts)].map((x, court_id) =>
                          <Droppable droppableId={court_id.toString()}>
                            {(provided, snapshot) => (
                              <div className="col p-0">
                                <p>Court {court_id+1}</p>
                                <ul className="list-group flex-fill m-2"
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  style={{minHeight: 200}}  
                                >
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
  const playerRef = firebase.database().ref('Players')

  playerRef.orderByChild("position").on("value", (snapshot) => {
    const playerList = [];
    snapshot.forEach(function(player) {
      playerList.push({uuid: player.key, ...player.val()});
    });
    setPlayerList(playerList);
  });
}

function UpdatePlayerData(playerFullData, field) {
  const playerRef = firebase.database().ref('Players');

  playerRef.child(playerFullData["uuid"]).child(field).set(playerFullData[field]);
}

export default Session;