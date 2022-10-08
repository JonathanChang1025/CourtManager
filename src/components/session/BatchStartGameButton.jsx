import { RESOURCES } from '../../resource'

function BatchStartGameButton(props) {
  return(
    <button className="btn btn-warning btn-block" type="button" onClick={() => {props.startGame(-1)}}>
      {RESOURCES[props.language].SESSION.LABELS.BATCH_START_GAMES}
    </button>
  );
}

export default BatchStartGameButton;