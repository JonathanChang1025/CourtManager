function IndividualStartGameButton(props) {
  return(
    <div className="col">
      <div className="row flex-grow" style={{height: "100%"}}>
        {[...Array(props.numOfCourts)].map((x, court_id) =>
          <div
            className={props.buttonEdgePadding(court_id)}
            key={court_id}
          >
            <button
              className="btn btn-warning btn-block"
              type="button"
              onClick={() => {props.startGame(court_id)}}
              style={{height: "100%"}}
            >
              start game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualStartGameButton;