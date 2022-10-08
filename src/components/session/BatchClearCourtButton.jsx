import { RESOURCES } from '../../resource'

function BatchClearCourtButton(props) {

  return(
    <button className="btn btn-danger btn-block" type="button" onClick={() => {props.clearCourts(-1)}}>
      {RESOURCES[props.language].SESSION.LABELS.BATCH_CLEAR_COURTS}
    </button>
  );
}

export default BatchClearCourtButton;