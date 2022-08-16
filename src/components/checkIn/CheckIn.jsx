import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import { RESOURCES } from "../../resource";
import firebase from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

function CheckIn() {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionUuid, setSessionUuid] = useState("");
  const [playerData, setPlayerData] = useState({});
  
  useEffect(() => {
		setSessionsListener(setSessionActive, setSessionUuid);

    const userDetailStorage = JSON.parse(localStorage.getItem("userDetails"));
    // Get user detail from browser, if it exists and player hasn't been initiated already, initiate it
    if (userDetailStorage !== null &&
        Object.keys(userDetailStorage).length !== 0 &&
        Object.keys(playerData).length === 0) {
      login(null, userDetailStorage);
    }
	}, []);

  const login = (isMember, userDetails) => {
    if (userDetails != null) {
      instantiatePlayerData(setPlayerData, userDetails, sessionUuid, isMember);
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
          name: "Test Name",
          phone: "1010101010"
        },
        sessionUuid,
        snapshot.numChildren()
      );
    });
    
  }

  const logout = () => {
    playerData.active = false;
    updatePlayerData(playerData);
    stopPlayerListener(playerData);
    setPlayerData({});    
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

  return (
    <div className="CheckIn">
      {sessionActive ?
        <>
          {Object.keys(playerData).length !== 0 ?
            <Profile
              playerData={playerData}
              logout={logout}
              callConsole={callConsole}
              createPlayerButton={createPlayerButton}
            /> :
            <LoginForm login={login} createPlayer={createPlayer} sessionUuid={sessionUuid}/>
          }
        </> :
        <div className="m-4 p-5 bg-secondary text-white rounded">
          <div className="container">
            <h1 className="display-4">{RESOURCES.CHECKIN.INACTIVE.TITLE}</h1>
            <p className="lead">{RESOURCES.CHECKIN.INACTIVE.MESSAGE}</p>
          </div>
        </div>
      }
    </div>
  );
}

function setSessionsListener(setSessionActive, setSessionUuid) {
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

function startPlayerListener(setPlayerData, playerData) {
  const playerRef = firebase.database().ref('Players').child(playerData.uuid)

  playerRef.on('value', (snapshot) => {
    const player = snapshot.val();
    if (!player.active) {
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

function instantiatePlayerData(setPlayerData, userFullDetails, sessionUuid, isMember) {
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
        setPlayerData(fullPlayerData);
        startPlayerListener(setPlayerData, fullPlayerData);
        break;
      }
    }

    // First time logging in
    if (fullPlayerData == null) {
      createPlayer(userFullDetails, sessionUuid, snapshot.numChildren(), isMember);

      // Still need to fetch again from firebase because we want to get the generated player UUID
      playerRef.once('value', (snapshot) => {
        const players = snapshot.val();
   
        for (let uuid in players) {
          if (userFullDetails.uuid === players[uuid].user_uuid) {
            fullPlayerData = {uuid: uuid, ...players[uuid]};
            setPlayerData(fullPlayerData);
            startPlayerListener(setPlayerData, fullPlayerData);
            break;
          }
        }
      });
    }
  });
}

function createPlayer(playerFullDetails, sessionUuid, playerCount, isApproved) {
  const playerRef = firebase.database().ref('Players')
  const {uuid, name, phone} = playerFullDetails;

  playerRef.push({
    user_uuid : uuid,
    created_at : Date(),
    active : true,
    session_uuid : sessionUuid,
    total_games : 0,
    current_court : -1,
    next_court : -1,
    position : playerCount,
    name: name,
    approved: isApproved
  });
}

function updatePlayerData(playerFullData) {
  const playerRef = firebase.database().ref('Players');
  const {uuid, ...playerData} = playerFullData;
  playerRef.child(uuid).set(playerData);
}

export default CheckIn;