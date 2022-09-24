function BatchStartGameButton(props) {

  return(
    <button className="btn btn-warning btn-block" type="button" onClick={() => {props.startGame(-1)}}>
      ⬆ start next games ⬆
    </button>
  );
}

export default BatchStartGameButton;