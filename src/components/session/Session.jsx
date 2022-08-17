import { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import SessionLogin from "./SessionLogin";
import EndSession from "./EndSession";
import CurrentCourt from "./CurrentCourt";
import QueueCourt from "./QueueCourt";
import AvailablePlayers from "./AvailablePlayers";
import firebase from "../../services/firebase";
import { Navigation } from "..";
import Sidebar from "./Sidebar";

// The way this class works is by adding a listener on the players; the local playerList will be updated as the realtime database is changed
// When modifying player data, just call updatePlayerData() to update it onto the cloud so that all instances will reflect the change

var numOfCourts = 3;
var maxPlayerPerCourt = 4;

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setSessionsListener(setSessionList, setLoggedIn);
    setPlayersListener(setPlayerList);
	}, []);

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    deleteSession();
    setLoggedIn(false);
  }

  const startNextGame = () => {
    playerList.forEach(function (player) {
      // Increase game count for those who just got off
      if (player.current_court !== -1) {
        player.total_games += 1;
      }
      // Clear everyone off
      player.current_court = -1;
      // Set those who are next to play onto court and clear them off of queue
      if (player.next_court !== -1) {
        player.current_court = player.next_court;
        player.next_court = -1;
      }

      updatePlayerData(player, "current_court");
      updatePlayerData(player, "next_court");
      updatePlayerData(player, "total_games");
    });
  }

  function deleteSession() {
    const sessionRef = firebase.database().ref('Sessions');
    const playerRef = firebase.database().ref('Players');
  
    sessionRef.remove();
    playerRef.remove();
  }
  
  function setSessionsListener(setSessionList, setLoggedIn) {
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
  
  function setPlayersListener(setPlayerList) {
    const playerRef = firebase.database().ref('Players')
  
    playerRef.orderByChild("position").on("value", (snapshot) => {
      const playerList = [];
      snapshot.forEach(function(player) {
        playerList.push({uuid: player.key, ...player.val()});
      });
      setPlayerList(playerList);
    });
  }
  
  function updatePlayerData(playerFullData, field) {
    const playerRef = firebase.database().ref('Players');
  
    playerRef.child(playerFullData["uuid"]).child(field).set(playerFullData[field]);
  }

  // All players are stored in a single array: playerList
  // Each context (idle players, court 1, court 2, ...) are denoted by player.next_court = -1, 0, 1, ... respectively
  // Each list is rendered by loading only those players in that context.
  // The result index returns the index the player is in WITHIN the context of each individual list (withinContext)
  // In order to reorder them, we move them around in the master array: playerList, which means we need to know the
  //   index from playerList (withinGlobal)
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const tempPlayerList = Array.from(playerList);
    var globalSourceIndex = getIndexWithinGlobal(result.source.index, result.source.droppableId);
    var globalDestinationIndex = getIndexWithinGlobal(result.destination.index, result.destination.droppableId);

    // If list is just being re-ordered in the same context droppable area, otherwise go to else
    if (result.source.droppableId === result.destination.droppableId) {
      const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
      tempPlayerList.splice(globalDestinationIndex, 0, movingPlayer);

      // Reconfigure all the position value based on index of array
      tempPlayerList.forEach(function(tempPlayer, index) {
        tempPlayer.position = index;
        updatePlayerData(tempPlayer, "position");
      })
    } else {
      const numberOfPriorPlayersOnThisCourt = result.destination.index;
      const destinationCourtId = Number(result.destination.droppableId);

      var numberOfPlayersOnThisCourt = 0;
      if (destinationCourtId !== -1) {
        playerList.forEach(function(player) {
          if (player.next_court === destinationCourtId) {
            numberOfPlayersOnThisCourt++;
          }
        })
      }

      if (numberOfPlayersOnThisCourt < maxPlayerPerCourt) {
        var numberOfPriorPlayersCounter = 0;
        if (numberOfPriorPlayersOnThisCourt === 0) {
          tempPlayerList[globalSourceIndex].next_court = Number(result.destination.droppableId);
          updatePlayerData(tempPlayerList[globalSourceIndex], "next_court");

          const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
          tempPlayerList.splice(0, 0, movingPlayer);
        } else {
          for (var index = 0; index < tempPlayerList.length; index++) {
            if (tempPlayerList[index].next_court === destinationCourtId) {
              numberOfPriorPlayersCounter++;
              if (numberOfPriorPlayersOnThisCourt === numberOfPriorPlayersCounter) {
                const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
                if (globalSourceIndex > index) index+=1;

                tempPlayerList.splice(index, 0, movingPlayer);
                tempPlayerList[index].next_court = Number(result.destination.droppableId);
                updatePlayerData(tempPlayerList[index], "next_court");
                break;
              }
            }
          }
        }
      }
    }
    // Reconfigure all the position value based on index of array
    tempPlayerList.forEach(function(tempPlayer, index){
      tempPlayer.position = index;
      updatePlayerData(tempPlayer, "position");
    })
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
        <>
          <EndSession logout={logout} showLogoutModal={showLogoutModal} setShowLogoutModal={setShowLogoutModal}/>
          <div className="container-fluid card-dark-background" style={{ height: "100vh"}}>
            <div className="row flex-grow">
              <Sidebar setShowLogoutModal={setShowLogoutModal} playerList={playerList}/>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="col p-0">
                  <CurrentCourt
                    playerList={playerList}
                    numOfCourts={numOfCourts}
                  />
                  <div className="w-100"></div>
                  <button type="button" className="btn btn-warning btn-block my-3" onClick={startNextGame}>⬆ start next game ⬆</button>
                  <QueueCourt
                    playerList={playerList}
                    numOfCourts={numOfCourts}
                    getIndexWithinContext={getIndexWithinContext}
                  />
                </div>
                <div className="col-2 p-0">
                  <AvailablePlayers
                    playerList={playerList}
                    getIndexWithinContext={getIndexWithinContext}
                  />
                </div>
              </DragDropContext>
            </div>
          </div>
        </> :
        <>
          <Navigation/>
          <SessionLogin login={login} sessionList={sessionList}/>
        </>
      }
    </>
  );
}

export default Session;