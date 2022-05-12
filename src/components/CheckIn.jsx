import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { resources } from '../resource'
import firebase from "../services/firebase";
import { Navigation } from "./";

function CheckIn() {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionUUID, setSessionUUID] = useState("");
  const [playerData, setPlayerData] = useState(null);
  
  useEffect(() => {
		SetSessionsListener(setSessionActive, setSessionUUID);
	}, []);

  const Login = (playerType, userDetails) => {
    if (userDetails != null) {
      FetchPlayerData(setPlayerData, userDetails, sessionUUID);
    } else {
      console.log("userDetails is null: Memeber does not exist in member table database");
    }
  }

  const Logout = () => {
    playerData.active = false;
    UpdatePlayerData(playerData);
    setPlayerData(null);
    StopPlayerListener(playerData);
  }

  const Console = () => {
    console.log(playerData);
  }

  return (
    <>
      <Navigation/>
      <div className="CheckIn">
        {sessionActive ?
          <>
            {playerData != null ?
              <div className="welcome">
                  <h2>Welcome, <span>{playerData.name}</span></h2>
                  <button onClick={Logout}>Check out</button>
                  <button onClick={Console}>Console.log</button>
              </div> :
              <LoginForm Login={Login}/>
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
    </>
  );
}

function SetSessionsListener(setSessionActive, setSessionUUID) {
  const sessionRef = firebase.database().ref('Sessions')

  sessionRef.on('value', (snapshot) => {
    const sessions = snapshot.val();
    const sessionList = [];
    for (let uuid in sessions) {
      sessionList.push({uuid, ...sessions[uuid]});
      setSessionUUID(uuid); // In the future we'll have more sessions not just one
    }

    if (!sessionList.length) {
      setSessionActive(false);
    } else {
      setSessionActive(true);
    }
  });
}

function StartPlayerListener(setPlayerData, playerData) {
  const playerRef = firebase.database().ref('Players').child(playerData.uuid)

  playerRef.on('value', (snapshot) => {
    const player = snapshot.val();
    console.log(player);
    if (!player.active) {
      setPlayerData(null);
      StopPlayerListener(playerData);
    }
  });
}

function StopPlayerListener(playerData) {
  const playerRef = firebase.database().ref('Players').child(playerData.uuid)
  playerRef.off('value');
}

function FetchPlayerData(setPlayerData, userFullDetails, sessionUUID) {
  const playerRef = firebase.database().ref('Players')

  playerRef.once('value', (snapshot) => {
    const players = snapshot.val();
    var playerData = null;

    for (let uuid in players) {
      if (userFullDetails.uuid === players[uuid].user_uuid) {
        playerData = {uuid: uuid, ...players[uuid]};
        playerData.active = true;
        UpdatePlayerData(playerData);
        setPlayerData(playerData);
        StartPlayerListener(setPlayerData, playerData);
        break;
      }
    }

    if (playerData == null) {
      CreatePlayer(userFullDetails, sessionUUID);

      // Still need to fetch again from firebase because we want to get the generated player UUID
      playerRef.once('value', (snapshot) => {
        const players = snapshot.val();
   
        for (let uuid in players) {
          if (userFullDetails.uuid === players[uuid].user_uuid) {
            playerData = {uuid: uuid, ...players[uuid]};
            setPlayerData(playerData);
            StartPlayerListener(playerData);
            break;
          }
        }
      });
    }
  });
}

function CreatePlayer(playerFullDetails, sessionUUID) {
  const playerRef = firebase.database().ref('Players')
  
  const {uuid, ...playerDetails} = playerFullDetails;
  
  playerRef.push({
    user_uuid : uuid,
    created_at : Date(),
    active : true,
    session_uuid : sessionUUID,
    total_games : 0,
    current_court : -1,
    next_court : -1,
    ...playerDetails
  });
}

function UpdatePlayerData(playerFullData) {
  const playerRef = firebase.database().ref('Players');
  const {uuid, ...playerData} = playerFullData
  const inactivePlayerData = {...playerData};

  playerRef.child(uuid).set(inactivePlayerData);
}

export default CheckIn;