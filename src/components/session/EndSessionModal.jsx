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
          <Modal.Title>{RESOURCES.SESSION.END.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{RESOURCES.SESSION.END.MESSAGE}</Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={hideModal}>Cancel</button>
          <button type="button" className="btn btn-warning" onClick={endSession}>End Session</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EndSessionModal;