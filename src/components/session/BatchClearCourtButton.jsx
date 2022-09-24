function BatchClearCourtButton(props) {

  return(
    <button className="btn btn-danger btn-block" type="button" onClick={() => {props.clearCourts(-1)}}>
      ➡clear all courts➡
    </button>
  );
}

export default BatchClearCourtButton;