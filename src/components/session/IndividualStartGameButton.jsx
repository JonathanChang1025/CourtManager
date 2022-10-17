import { RESOURCES } from '../../resource'

function IndividualStartGameButton(props) {
  function validCourt(court_id) { // Check whether the selected queue court can on go playing court based on if players are currently busy playing on another court
    var valid = true;

    for (const player of props.playerList) {
      if (player.next_court === props.queueCourtSelected) {
        if (!(player.current_court === -1 || player.current_court === court_id)) {
          valid = false;
          break;
        }
      }
    }

    return valid;
  }

  return(
    <div className="col">
      <div className="row flex-grow" style={{height: "100%"}}>
        {[...Array(props.numOfCourts)].map((x, court_id) =>
          <div
            className={props.buttonEdgePadding(court_id)}
            key={court_id}
          >
            {
              props.queueCourtSelected === -1 || !validCourt(court_id) ?
              <button
                className="btn btn-dark btn-block"
                type="button"
                onClick={() => {props.startGame(court_id)}}
                style={{height: "100%"}}
                disabled
              >
                {RESOURCES[props.language].SESSION.LABELS.INDIVIDUAL_START_GAME}
              </button> :
              <button
                className="btn btn-warning btn-block"
                type="button"
                onClick={() => {props.startGame(court_id)}}
                style={{height: "100%"}}
              >
                {RESOURCES[props.language].SESSION.LABELS.INDIVIDUAL_START_GAME}
              </button>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualStartGameButton;