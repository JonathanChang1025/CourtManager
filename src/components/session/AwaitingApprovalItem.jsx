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
        <button type="button" className="btn btn-danger" onClick={() => {props.removePlayer(props.player.uuid)}}>Reject</button>
        &nbsp;
        <button type="button" className="btn btn-success" onClick={() => {props.updatePlayerData(props.player.uuid, true, "approved")}}>Approve</button>
      </div>
    </li>
    
  )
}

export default AwaitingApprovalItem;