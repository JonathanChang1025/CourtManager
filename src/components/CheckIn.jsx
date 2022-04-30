import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import { resources } from '../resource'
import firebase from "../services/firebase";

function CheckIn() {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionUUID, setSessionUUID] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [player, setPlayer] = useState({loginMember: null, approved: null, database: null, data: null});


  useEffect(() => {
		FetchSessions(setSessionActive, setSessionUUID);
    FetchPlayers(setPlayerList);
	}, []);

  const Login = (playerType, playerDetails) => {
    var playerData = {loginMember: playerType, approved: playerType, data: playerDetails};

    if (playerData.data != null) {
      FetchPlayers(setPlayerList);
      playerList.forEach((curr_player) => {
        if (curr_player.member_uuid === playerData.data.uuid) {
          playerData = {...playerData, database: curr_player};
        }
      })
      setPlayer(playerData);

      if (playerData.database == null) {
        CreatePlayer(playerData.data.uuid, sessionUUID);
      } else {
        SetPlayerActivity(playerData, true);
      }
    } else {
      console.log("player data is null");
    }
  }

  const Logout = () => {
    SetPlayerActivity(player, false);
    setPlayer({loginMember: null, approved: null, database: null, data: null});
  }

  return (
    <div className="CheckIn">
      {sessionActive ?
        <>
          {player.data != null ?
            <div className="welcome">
                <h2>Welcome, <span>{player.data.name}</span></h2>
                <button onClick={Logout}>Check out</button>
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
  );
}

function FetchSessions(setSessionActive, setSessionUUID) {
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

function FetchPlayers(setPlayerList) {
  const playerRef = firebase.database().ref('Players')

  playerRef.on('value', (snapshot) => {
			const players = snapshot.val();
			const playerList = [];
			for (let uuid in players) {
				playerList.push({uuid, ...players[uuid]});
			}

      setPlayerList(playerList);
		});
}

function CreatePlayer(member_uuid, session_uuid) {
	const playerRef = firebase.database().ref('Players');
  playerRef.push({
    member_uuid : member_uuid,
    created_at : Date(),
    active : true,
    session_uuid : session_uuid,
    total_games : 0,
    current_court : -1,
    next_court : -1
  })
}

function SetPlayerActivity(player, activity) {
  const databasePlayerData = player.database;
  const {uuid, ...playerData} = databasePlayerData
  const inactivePlayerData = {...playerData, active: activity};
  const playerRef = firebase.database().ref('Players');
  playerRef.child(uuid).set(inactivePlayerData);
}

export default CheckIn;