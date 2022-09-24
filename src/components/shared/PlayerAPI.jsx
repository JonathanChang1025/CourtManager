import firebase from "../../services/firebase";

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
    name: name,
    approved: isApproved,
    ipv4_address: userIpAddress
  });
}

export function updatePlayerData(playerFullData) {
  const playerRef = firebase.database().ref('Players');
  const {uuid, ...playerData} = playerFullData;
  playerRef.child(uuid).set(playerData);
}