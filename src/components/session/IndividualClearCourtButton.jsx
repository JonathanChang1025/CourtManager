function IndividualClearCourtButton(props) {
  return(
    <div className="col">
      <div className="row flex-grow" style={{height: "100%"}}>
        {[...Array(props.numOfCourts)].map((x, court_id) =>
          <div
            className={props.buttonEdgePadding(court_id)}
            key={court_id}
          >
            <button
              className="btn btn-danger btn-block"
              type="button"
              onClick={() => {props.clearCourts(court_id)}}
              style={{height: "100%"}}
            >
              ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualClearCourtButton;