import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import { RESOURCES } from "../../resource";
import firebase from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import AwaitingApproval from "./AwaitingApproval";
import { Navigation } from "../";
import { createPlayer, updatePlayerData } from "../shared/PlayerAPI"

function CheckIn() {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionUuid, setSessionUuid] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [showDropinRejectAlert, setShowDropinRejectAlert] = useState(false);
  const [userIpAddress, setUserIpAddress] = useState();
  
  useEffect(() => {
    fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
      .then(response => response.json())
      .then(data => data.IPv4)
      .then(IPv4 => setUserIpAddress(IPv4))

		setSessionsListener();

    const userDetailStorage = JSON.parse(localStorage.getItem("userDetails"));
    console.log(userDetailStorage);
    // Get user detail from browser, if it exists and player hasn't been initiated already, initiate it
    if (userDetailStorage !== null && Object.keys(userDetailStorage).length !== 0) {
      login(true, userDetailStorage);
    }
	}, []);

  const login = (isMember, userDetails) => {
    if (userDetails != null) {
      instantiatePlayerData(userDetails, sessionUuid, isMember);
      localStorage.setItem("userDetails", JSON.stringify(userDetails)); // If valid user, save it to browser
    } else {
      console.log("userDetails is null: Memeber does not exist in member table database");
    }
  }

  const createPlayerButton = () => {
    const playerRef = firebase.database().ref('Players')

    playerRef.once('value', (snapshot) => {
      createPlayer(
        {
          uuid: uuidv4(),
          name: Math.random(),
          phone: "1010101010"
        },
        sessionUuid,
        snapshot.numChildren(),
        true,
        userIpAddress
      );
    });
    
  }

  const logout = () => {
    playerData.active = false;
    updatePlayerData(playerData);
    stopPlayerListener(playerData);
    localStorage.clear();
  }

  const callConsole = () => {
    const playerRef = firebase.database().ref('Players')

    playerRef.orderByChild("position").once("value", (snapshot) => {
      snapshot.forEach(function(player) {
        console.log(player.key);
      });
    });
  }

  function setSessionsListener() {
    const sessionRef = firebase.database().ref('Sessions')
  
    sessionRef.on('value', (snapshot) => {
      const sessions = snapshot.val();
      const sessionList = [];
      for (let uuid in sessions) {
        sessionList.push({uuid, ...sessions[uuid]});
        setSessionUuid(uuid); // In the future we'll have more sessions not just one
      }
  
      if (!sessionList.length) {
        setSessionActive(false);
      } else {
        setSessionActive(true);
      }
    });
  }
  
  function startPlayerListener(playerData) {
    const playerRef = firebase.database().ref('Players').child(playerData.uuid)
  
    playerRef.on('value', (snapshot) => {
      const player = snapshot.val();
      if (player === null) {
        setPlayerData({});
        setShowDropinRejectAlert(true);
      } else if (!player.active) {
        setPlayerData({});
        stopPlayerListener(playerData);
      } else {
        var fullPlayerData = {uuid: playerData.uuid, ...player};
        setPlayerData(fullPlayerData);
      }
    });
  }
  
  function stopPlayerListener(playerData) {
    const playerRef = firebase.database().ref('Players').child(playerData.uuid)
    playerRef.off('value');
  }
  
  function instantiatePlayerData(userFullDetails, sessionUuid, isMember) {
    const playerRef = firebase.database().ref('Players')
  
    playerRef.once('value', (snapshot) => {
      const players = snapshot.val();
      var fullPlayerData = null;
  
      // Search if player has already logged in
      for (let uuid in players) {
        if (userFullDetails.uuid === players[uuid].user_uuid) {
          fullPlayerData = {uuid: uuid, ...players[uuid]};
          fullPlayerData.active = true;
          updatePlayerData(fullPlayerData);
          startPlayerListener(fullPlayerData);
          break;
        }
      }

      // First time logging in
      if (fullPlayerData == null) {
        createPlayer(userFullDetails, sessionUuid, snapshot.numChildren(), isMember, userIpAddress);
  
        // Still need to fetch again from firebase because we want to get the generated player UUID
        playerRef.once('value', (snapshot) => {
          const players = snapshot.val();
     
          for (let uuid in players) {
            if (userFullDetails.uuid === players[uuid].user_uuid) {
              fullPlayerData = {uuid: uuid, ...players[uuid]};
              startPlayerListener(fullPlayerData);
              break;
            }
          }
        });
      }
    });
  }

  return (
    <div className="CheckIn">
      {
        sessionActive ?
        <>
          {
            Object.keys(playerData).length !== 0 ?
            <>
              {
                playerData.approved ?
                <Profile
                  playerData={playerData}
                  logout={logout}
                  callConsole={callConsole}
                /> :
                <AwaitingApproval/>
              }
            </>:
            <LoginForm
              login={login}
              showDropinRejectAlert={showDropinRejectAlert}
              setShowDropinRejectAlert={setShowDropinRejectAlert}
              userIpAddress={userIpAddress}
            />
          }
        </> :
        <>
          <Navigation/>
          <div className="m-4 p-5 bg-secondary text-white rounded">
            <div className="container">
              <h1 className="display-4">{RESOURCES.CHECKIN.INACTIVE.TITLE}</h1>
              <p className="lead">{RESOURCES.CHECKIN.INACTIVE.MESSAGE}</p>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default CheckIn;