import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'
import AddPlayersItem from './AddPlayersItem';

function AddPlayersModal(props) {
  const hideModal = () => {
    props.setShowAddPlayersModal(false);
  };

  return(
    <div>
      <Modal show={props.showAddPlayersModal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Add Players</Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{minHeight: 200}}>
          <h6>Drop-in</h6>
          <div className="container ph-3">
            <div className="row">
              <div className="col-9 p-0">
                <input
                  className="form-control"
                  placeholder="Enter full name"
                  //onChange={(e) => {props.updatePlayerData(props.player.uuid, "total_games", e.currentTarget.value)}}
                />
              </div>
              <div className="col-3 pr-0">
                <button
                  className="btn btn-success btn-block"
                  type="button"
                  //onClick={() => {props.removePlayer(props.player.uuid)}}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <hr/>
          <h6>Members</h6>
          <ul className="list-group flex-fill m-2">
            {
              props.memberList.map((member) =>
              {
                if (!props.playerUuidList.includes(member.uuid)) {
                   return(
                    <AddPlayersItem
                      member={member}
                      sessionUuid={props.sessionUuid}
                      playerListCount={props.playerUuidList.length}
                      key={member.uuid}
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

export default AddPlayersModal;