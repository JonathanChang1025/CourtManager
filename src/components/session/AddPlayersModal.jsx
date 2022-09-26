import { useState } from 'react';
import { Modal } from 'react-bootstrap'
import { RESOURCES } from '../../resource'
import AddPlayersItem from './AddPlayersItem';
import { createPlayer } from "../shared/PlayerAPI"
import UsernameAlert from "../shared/UsernameAlert";
import { v4 as uuidv4 } from "uuid";
import { validatePlayerName } from "../shared/PlayerAPI";

function AddPlayersModal(props) {
  const [nameInput, setNameInput] = useState("");
	const [showDropinLoginAlert, setShowDropinLoginAlert] = useState("");

  const hideModal = () => {
    props.setShowAddPlayersModal(false);
  };

  const closeDropinLoginAlert = () => {
		setShowDropinLoginAlert("");
	}

  const addDropInPlayerHandler = () => {
    setNameInput(nameInput.trim());

    try {
      validatePlayerName(
        nameInput,
        props.playerList.map((player) => player.name),
        props.memberList.map((member) => member.name)
      );

      setShowDropinLoginAlert("");
      createPlayer(
        {
          name: nameInput,
          uuid: uuidv4()
        },
        props.sessionUuid,
        props.playerList.length,
        true,
        0
      );
  } catch (e) {
    setShowDropinLoginAlert(e.message);
  }
  }

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
          {
            showDropinLoginAlert !== "" ?
            <UsernameAlert
              showMessageAlert={showDropinLoginAlert}
              closeMessageAlert={closeDropinLoginAlert}
            /> :
            null
          }
          <h6>Drop-in</h6>
          <div className="container ph-3">
            <div className="row">
              <div className="col-9 p-0">
                <input
                  className="form-control"
                  placeholder="Enter full name"
                  onChange={(e) => {setNameInput(e.currentTarget.value.trim())}}
                />
              </div>
              <div className="col-3 pr-0">
                <button
                  className="btn btn-success btn-block"
                  type="button"
                  onClick={addDropInPlayerHandler}
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
                if (!props.playerList.map(player => player.user_uuid).includes(member.uuid)) {
                   return(
                    <AddPlayersItem
                      member={member}
                      sessionUuid={props.sessionUuid}
                      playerListCount={props.playerList.length}
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