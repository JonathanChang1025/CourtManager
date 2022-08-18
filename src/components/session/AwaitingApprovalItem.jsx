import { RESOURCES } from '../../resource'

function AwaitingApprovalItem(props) {

  return(
    <li
      className="list-group-item
      d-flex
      justify-content-between
      align-items-center
      list-group-item-light"
    >
      {props.player.name}
      <button type="button" class="btn btn-danger">Reject</button>
      <button type="button" class="btn btn-success">Approve</button>
    </li>
    
  )
}

export default AwaitingApprovalItem;