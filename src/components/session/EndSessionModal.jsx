import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'

function EndSessionModal(props) {
  const hideModal = () => {
    props.setShowEndSessionModal(false);
  };

  const endSession = () => {
    props.setShowEndSessionModal(false);
    props.logout();
  }
  return(
    <div>
      <Modal show={props.showEndSessionModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{RESOURCES[props.language].SESSION.END.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{RESOURCES[props.language].SESSION.END.MESSAGE}</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={hideModal}
          >
            {RESOURCES[props.language].SESSION.END.CANCEL}
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={endSession}
          >
            {RESOURCES[props.language].SESSION.END.END_SESSION}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EndSessionModal;