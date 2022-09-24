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
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{minHeight: 200}}>
          <ul className="list-group flex-fill m-2">
            {
              props.playerList.map((player) =>
              {
                if (!player.approved) {
                   return(
                    <AwaitingApprovalItem
                      player={player}
                      updatePlayerData={props.updatePlayerData}
                      removePlayer={props.removePlayer}
                      key={player.uuid}
                    />
                  )
                 } else {
                   return null;
                 }
              })
            }
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AwaitingApprovalModal;