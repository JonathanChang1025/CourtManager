import { RESOURCES } from '../../resource'
import { createPlayer } from "../shared/PlayerAPI"

function AddPlayersItem(props) {

  return(
    <li
      className="list-group-item
      d-flex
      justify-content-between
      align-items-center
      list-group-item-light"
      key={props.member.uuid}
    >
      {props.member.name}
      <div style={{display: "inline-grid"}}>
        <button
          className="btn btn-success"
          type="button"
          onClick={() => {createPlayer(props.member, props.sessionUuid, props.playerListCount, true, 0)}}
        >
          {RESOURCES[props.language].SESSION.ADD_PLAYERS.DROPIN_ADD}
        </button>
      </div>
    </li>
  )
}

export default AddPlayersItem;