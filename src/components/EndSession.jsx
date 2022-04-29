import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import { resources } from '../resource'

function EndSession({ Logout }) {
  const [isModelOpen, setIsModelOpen] = React.useState(false);

  const showModal = () => {
    setIsModelOpen(true);
  };

  const hideModal = () => {
    setIsModelOpen(false);
  };

  const endSession = () => {
    Logout();
  }
  return(
    <div>
      <button type="button" className="btn btn-danger btn-block" onClick={showModal}>End Session</button>
      <Modal show={isModelOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{resources.SESSION.END.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{resources.SESSION.END.MESSAGE}</Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={hideModal}>Cancel</button>
          <button type="button" className="btn btn-warning" onClick={endSession}>End Session</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EndSession;