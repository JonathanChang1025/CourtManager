import { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import SessionLogin from "./SessionLogin";
import EndSessionModal from "./EndSessionModal";
import CurrentCourt from "./CurrentCourt";
import QueueCourt from "./QueueCourt";
import AvailablePlayers from "./AvailablePlayers";
import firebase from "../../services/firebase";
import { Navigation } from "..";
import Sidebar from "./Sidebar";
import AddPlayersModal from "./AddPlayersModal";
import AwaitingApprovalModal from "./AwaitingApprovalModal";
import ManagePlayersModal from "./ManagePlayersModal";
import IndividualClearCourtButton from "./IndividualClearCourtButton";
import IndividualStartGameButton from "./IndividualStartGameButton";
import BatchClearCourtButton from "./BatchClearCourtButton";
import BatchStartGameButton from "./BatchStartGameButton";

// The way this class works is by adding a listener on the players; the local playerList will be updated as the realtime database is changed
// When modifying player data, just call updatePlayerData() to update it onto the cloud so that all instances will reflect the change

const numOfCourts = 3;
const maxPlayerPerCourt = 4;

function Session() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [showAddPlayersModal, setShowAddPlayersModal] = useState(false);
  const [showAwaitingApprovalModal, setShowAwaitingApprovalModal] = useState(false);
  const [showManagePlayersModal, setShowManagePlayersModal] = useState(false);
  const [courtFull, setCourtFull] = useState([]);
  const [individualCourtControl, setIndividualCourtControl] = useState(false);
  const [queueCourtSelected, setQueueCourtSelected] = useState(-1);
  const [language, setLanguage] = useState("EN");
  const [textToSpeech, setTextToSpeech] = useState(true);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = voices[94];
  utterance.rate = 1;

  useEffect(() => {
    setSessionsListener();
    setPlayersListener();
    setMembersListener();
	}, []);

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    deleteSession();
    setLoggedIn(false);
  }

  const sortAvailablePlayersByName = (byAscending) => {
    const nonQueuedPlayers = playerList.filter((player) => {
      return player.next_court === -1;
    });

    nonQueuedPlayers.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return byAscending + !byAscending * -1;
      }
      if (nameA > nameB) {
        return !byAscending + byAscending * -1;
      }
      return 0;
    });

    nonQueuedPlayers.forEach((player, position) => {
      player.position = getIndexWithinGlobal(position, -1);
    })

    nonQueuedPlayers.forEach((player) => {
      updatePlayerData(player.uuid, "position", player.position);
    })
  }

  const sortAvailablePlayersByPlayCount = (byAscending) => {
    const nonQueuedPlayers = playerList.filter((player) => {
      return player.next_court === -1;
    });

    nonQueuedPlayers.sort((a, b) => {
      return (a.total_games - b.total_games) * (!byAscending + byAscending * -1);
    });

    nonQueuedPlayers.forEach((player, position) => {
      player.position = getIndexWithinGlobal(position, -1);
    })

    nonQueuedPlayers.forEach((player) => {
      updatePlayerData(player.uuid, "position", player.position);
    })
  }

  function clearCourts(court_id) {
    playerList.forEach(function (player) {
      if (court_id === -1) {
        // Increase game count for those who just got off
        if (player.current_court !== -1) {
          player.total_games += 1;
          // Clear everyone off
          player.current_court = -1;
        }
      } else {
        if (player.current_court === court_id) {
          player.total_games += 1;
          player.current_court = -1;
        }
      }

      updatePlayerData(player["uuid"], "current_court", player["current_court"]);
      updatePlayerData(player["uuid"], "next_court", player["next_court"]);
      updatePlayerData(player["uuid"], "total_games", player["total_games"]);
    });
  }

  function startGame(court_id) {
    playerList.forEach(function (player) {
      if (court_id === -1) {
        if (player.current_court !== -1) {
          // Clear everyone off
          player.current_court = -1;
        }
        // Set those who are next to play onto court and clear them off of queue
        if (player.next_court !== -1) {
          player.total_games += 1; // Increment their game count as they go on
          player.current_court = player.next_court;
          player.next_court = -1;
        }
      } else {
        if (player.current_court === court_id) {
          player.current_court = -1;
        }

        if (player.next_court === queueCourtSelected) { // the 0 will change if they are unable to go; need an algorithm to find
          player.total_games += 1;
          player.current_court = court_id;
          player.next_court = -1;
        }
      }

      updatePlayerData(player["uuid"], "current_court", player["current_court"]);
      updatePlayerData(player["uuid"], "next_court", player["next_court"]);
      updatePlayerData(player["uuid"], "total_games", player["total_games"]);
    });

    if (textToSpeech) {
      announceCurrentlyPlaying(court_id);
    }
    setQueueCourtSelected(-1);
  }

  function announceCurrentlyPlaying(court_id) {
    if (synth.speaking) {
      synth.cancel();
      return;
    }

    var textBuilder = "";

    // court id of -1 is announce all
    if (court_id === -1) {
      for (let i = 0; i < numOfCourts; i++) {
        textBuilder += buildTextAndSpeak(i);
      }
    } else {
      textBuilder = buildTextAndSpeak(court_id);
    }

    utterance.text = textBuilder;
    console.log(textBuilder);
    synth.speak(utterance);
  }

  function buildTextAndSpeak(court_id) {
    var courtText = "Court " + (court_id + 1) + ": ";
    var textBuilder = "";

    playerList.forEach(function (player) {
      if (player.current_court === court_id) {
        textBuilder += player.name + ". ";
      }
    });

    if (textBuilder !== "") {
      return courtText + textBuilder;
    }

    return "";
  }

  function buttonEdgePadding(court_id) {
    switch(court_id) {
      case 0:
        return "col pl-0 pr-1";
      case numOfCourts-1:
        return "col pl-1 pr-0";
      default:
        return "col px-1";
    }
  }

  function deleteSession() {
    const sessionRef = firebase.database().ref('Sessions');
    const playerRef = firebase.database().ref('Players');
  
    sessionRef.remove();
    playerRef.remove();
  }

  function removePlayer(player_uuid) {
    const playerRef = firebase.database().ref("Players").child(player_uuid);
  
    playerRef.remove();
  }
  
  function updateCourtStates(playerList) {
    var numberOfPlayersOnCourt = 0;
    var courtStates = [];

    for (let courtId = 0; courtId < numOfCourts; courtId++) {
      playerList.forEach(function(player) {
        if (player.next_court === courtId) {
          numberOfPlayersOnCourt++;
        }
      })

      if (numberOfPlayersOnCourt === maxPlayerPerCourt) {
        courtStates = [...courtStates, true];
      } else {
        courtStates = [...courtStates, false];
      }
      numberOfPlayersOnCourt = 0;
    }
    setCourtFull(courtStates);
  }

  function setSessionsListener() {
    const sessionRef = firebase.database().ref('Sessions')
  
    sessionRef.on('value', (snapshot) => {
      const sessions = snapshot.val();
      const sessionList = [];
      for (let uuid in sessions) {
        sessionList.push({uuid, ...sessions[uuid]});
      }
      setSessionList(sessionList);
  
      if (!sessionList.length) { // We eventualy need to check on which one it is, but we assume there can ony be one rn
        setLoggedIn(false);
      }
    });
  }
  
  function setPlayersListener() {
    const playerRef = firebase.database().ref('Players')
  
    playerRef.orderByChild("position").on("value", (snapshot) => {
      const playerListBuilder = [];
      snapshot.forEach(function(player) {
        playerListBuilder.push({uuid: player.key, ...player.val()});
      });
      setPlayerList(playerListBuilder);
      updateCourtStates(playerListBuilder);
    });
  }

  function setMembersListener() {
    const memberRef = firebase.database().ref('Members');

		memberRef.on('value', (snapshot) => {
			const members = snapshot.val();
			const memberList = [];
			for (let uuid in members) {
				memberList.push({uuid, ...members[uuid]});
			}
			setMemberList(memberList);
		});
  }
  
  function updatePlayerData(player_uuid, key, value) {
    const KEY_INTEGER = ["total_games", "current_court", "next_court", "position"]
    const playerRef = firebase.database().ref('Players');

    if (KEY_INTEGER.indexOf(key) > -1) {
      value = Number(value);
    }

    playerRef.child(player_uuid).child(key).set(value);
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
        updatePlayerData(tempPlayer["uuid"], "position", tempPlayer["position"]);
      })
    } else {
      const numberOfPriorPlayersOnThisCourt = result.destination.index;
      const destinationCourtId = Number(result.destination.droppableId);

      var numberOfPriorPlayersCounter = 0;
      if (numberOfPriorPlayersOnThisCourt === 0) {
        tempPlayerList[globalSourceIndex].next_court = Number(result.destination.droppableId);
        updatePlayerData(tempPlayerList[globalSourceIndex]["uuid"], "next_court", tempPlayerList[globalSourceIndex]["next_court"]);

        const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
        tempPlayerList.splice(playerList.length-1, 0, movingPlayer);
      } else {
        for (var index = 0; index < tempPlayerList.length; index++) {
          if (tempPlayerList[index].next_court === destinationCourtId) {
            numberOfPriorPlayersCounter++;
            if (numberOfPriorPlayersOnThisCourt === numberOfPriorPlayersCounter) {
              const [movingPlayer] = tempPlayerList.splice(globalSourceIndex, 1);
              if (globalSourceIndex > index) index+=1;

              tempPlayerList.splice(index, 0, movingPlayer);
              tempPlayerList[index].next_court = Number(result.destination.droppableId);
              updatePlayerData(tempPlayerList[index]["uuid"], "next_court", tempPlayerList[index]["next_court"]);
              break;
            }
          }
        }
      }
    }
    // Reconfigure all the position value based on index of array
    tempPlayerList.forEach(function(tempPlayer, index){
      tempPlayer.position = index;
      updatePlayerData(tempPlayer["uuid"], "position", tempPlayer["position"]);
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

  return(
    <>
      {
        loggedIn ?
        <>
          <AddPlayersModal
            showAddPlayersModal={showAddPlayersModal}
            setShowAddPlayersModal={setShowAddPlayersModal}
            memberList={memberList}
            playerList={playerList}
            sessionUuid={sessionList[0].uuid} // We make this assumption for now..
            language={language}
          />
          <AwaitingApprovalModal
            showAwaitingApprovalModal={showAwaitingApprovalModal}
            setShowAwaitingApprovalModal={setShowAwaitingApprovalModal}
            playerList={playerList}
            updatePlayerData={updatePlayerData}
            removePlayer={removePlayer}
            language={language}
          />
          <ManagePlayersModal
            showManagePlayersModal={showManagePlayersModal}
            setShowManagePlayersModal={setShowManagePlayersModal}
            playerList={playerList}
            updatePlayerData={updatePlayerData}
            removePlayer={removePlayer}
            language={language}
          />
          <EndSessionModal
            logout={logout}
            showEndSessionModal={showEndSessionModal}
            setShowEndSessionModal={setShowEndSessionModal}
            language={language}
          />
          <div className="container-fluid card-dark-background" style={{ height: "100vh"}}>
            <div className="row">
              <div className="col-md-auto px-0">
                <Sidebar
                  playerList={playerList}
                  setShowAddPlayersModal={setShowAddPlayersModal}
                  setShowAwaitingApprovalModal={setShowAwaitingApprovalModal}
                  setShowManagePlayersModal={setShowManagePlayersModal}
                  setShowEndSessionModal={setShowEndSessionModal}
                  setIndividualCourtControl={setIndividualCourtControl}
                  individualCourtControl={individualCourtControl}
                  setLanguage={setLanguage}
                  language={language}
                  sortAvailablePlayersByName={sortAvailablePlayersByName}
                  sortAvailablePlayersByPlayCount={sortAvailablePlayersByPlayCount}
                  textToSpeech={textToSpeech}
                  setTextToSpeech={setTextToSpeech}
                  announceCurrentlyPlaying={announceCurrentlyPlaying}
                />
              </div>
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="col p-0">
                  <div className="pb-3" style={{height: "100vh"}}>
                    <div className="d-flex justify-content-center py-3" style={{height: "10%"}}>
                      {
                        individualCourtControl ?
                        <IndividualClearCourtButton
                          numOfCourts={numOfCourts}
                          buttonEdgePadding={buttonEdgePadding}
                          clearCourts={clearCourts}
                          language={language}
                        /> :
                        <BatchClearCourtButton
                          clearCourts={clearCourts}
                          language={language}
                        />
                      }
                    </div>
                    <div style={{height: "40%"}}>
                      <CurrentCourt
                        playerList={playerList}
                        numOfCourts={numOfCourts}
                        language={language}
                      />
                    </div>
                    <div className="d-flex justify-content-center py-3" style={{height: "10%"}}>
                      {
                        individualCourtControl ?
                        <IndividualStartGameButton
                          numOfCourts={numOfCourts}
                          playerList={playerList}
                          buttonEdgePadding={buttonEdgePadding}
                          startGame={startGame}
                          language={language}
                          queueCourtSelected={queueCourtSelected}
                        /> :
                        <BatchStartGameButton
                          startGame={startGame}
                          language={language}
                        />
                      }
                    </div>
                    <div style={{height: "40%"}}>
                      <QueueCourt
                        playerList={playerList}
                        numOfCourts={numOfCourts}
                        getIndexWithinContext={getIndexWithinContext}
                        courtFull={courtFull}
                        individualCourtControl={individualCourtControl}
                        language={language}
                        setQueueCourtSelected={setQueueCourtSelected}
                        queueCourtSelected={queueCourtSelected}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <AvailablePlayers
                    playerList={playerList}
                    getIndexWithinContext={getIndexWithinContext}
                    language={language}
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