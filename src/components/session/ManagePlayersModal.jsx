import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'
import ManagePlayersItem from './ManagePlayersItem';

function ManagePlayersModal(props) {
  const hideModal = () => {
    props.setShowManagePlayersModal(false);
  };

  return(
    <div>
      <Modal show={props.showManagePlayersModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>{RESOURCES.SESSION.MANAGE.TITLE}</Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{minHeight: 200}}>
          <ul className="list-group flex-fill m-2">
            {
              props.playerList.map((player) =>
              {
                if (player.approved) {
                   return(
                    <ManagePlayersItem
                      player={player}
                      updatePlayerData={props.updatePlayerData}
                      removePlayer={props.removePlayer}
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

export default ManagePlayersModal;