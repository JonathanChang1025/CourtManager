import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'
import AwaitingApprovalItem from './AwaitingApprovalItem';

function AwaitingApprovalModal(props) {
  const hideModal = () => {
    props.setShowAwaitingApprovalModal(false);
  };

  return(
    <div>
      <Modal show={props.showAwaitingApprovalModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{RESOURCES.SESSION.APPROVAL.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group flex-fill m-2">
            {
              props.playerList.map((player) =>
              {
                if (!player.approved) {
                   return <AwaitingApprovalItem player={player}/>
                 } else {
                   return null;
                 }
              })
            }
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={hideModal}>Finished</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AwaitingApprovalModal;