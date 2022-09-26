import firebase from "../../services/firebase";
import { RESOURCES } from '../../resource';

export function createPlayer(playerFullDetails, sessionUuid, playerCount, isApproved, userIpAddress) {
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
    name: name.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
    approved: isApproved,
    ipv4_address: userIpAddress
  });
}

export function updatePlayerData(playerFullData) {
  const playerRef = firebase.database().ref('Players');
  const {uuid, ...playerData} = playerFullData;
  playerRef.child(uuid).set(playerData);
}

export function validatePlayerName(newPlayerName, playerNameList, memberNameList) {
  var nameTaken = false;
  newPlayerName = newPlayerName.toLowerCase();

  nameTaken ||= playerNameList.map(playerName => {return playerName.toLowerCase()}).indexOf(newPlayerName) > -1;
  nameTaken ||= memberNameList.map(memberName => {return memberName.toLowerCase()}).indexOf(newPlayerName) > -1;

  if (newPlayerName.length < 4) {
    throw new Error(RESOURCES.CHECKIN.DROPIN.ERROR_TOO_SHORT);
  } else if (newPlayerName.length > 20) {
    throw new Error(RESOURCES.CHECKIN.DROPIN.ERROR_TOO_LONG);
  } else if (nameTaken) {
    throw new Error(RESOURCES.CHECKIN.DROPIN.ERROR_NAME_TAKEN);
  } else if (newPlayerName.length-newPlayerName.replaceAll(' ', '').length != 1) {
    throw new Error(RESOURCES.CHECKIN.DROPIN.ERROR_WRONG_FORMAT);
  } else if (/[^a-z\s]/i.test(newPlayerName)) {
    throw new Error(RESOURCES.CHECKIN.DROPIN.ERROR_LETTERS_ONLY);
  }
}