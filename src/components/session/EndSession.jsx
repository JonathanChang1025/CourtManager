import { useState } from "react";
import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'

function EndSession(props) {
  const hideModal = () => {
    props.setShowLogoutModal(false);
  };

  const endSession = () => {
    props.setShowLogoutModal(false);
    props.logout();
  }
  return(
    <div>
      <Modal show={props.showLogoutModal} onHide={hideModal}>
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