import { RESOURCES } from '../../resource'

function AwaitingApprovalItem(props) {

  return(
    <li
      className="list-group-item
      d-flex
      justify-content-between
      align-items-center
      list-group-item-light"
      key={props.player.user_uuid}
    >
      {props.player.name}
      <div>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {props.removePlayer(props.player.uuid)}}
        >
          {RESOURCES[props.language].SESSION.APPROVAL.REJECT}
        </button>
        &nbsp;
        <button
          className="btn btn-success"
          type="button"
          onClick={() => {props.updatePlayerData(props.player.uuid, "approved", true)}}
        >
          {RESOURCES[props.language].SESSION.APPROVAL.APPROVE}
        </button>
      </div>
    </li>
    
  )
}

export default AwaitingApprovalItem;