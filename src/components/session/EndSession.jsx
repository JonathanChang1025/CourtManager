import { useState } from "react";
import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'

function EndSession({ logout }) {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const showModal = () => {
    setIsModelOpen(true);
  };

  const hideModal = () => {
    setIsModelOpen(false);
  };

  const endSession = () => {
    logout();
  }
  return(
    <div>
      <button type="button" className="btn btn-danger btn-block" onClick={showModal}>End Session</button>
      <Modal show={isModelOpen} onHide={hideModal}>
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

export default EndSession;