import { RESOURCES } from '../../resource'

function ManagePlayersItem(props) {

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
        <div style={{display: "inline-grid"}}>
          <input
            className="form-control"
            type="number"
            defaultValue={props.player.total_games}
            min="0"
            onChange={(e) => {props.updatePlayerData(props.player.uuid, "total_games", e.currentTarget.value)}}
          />
        </div>
        &nbsp;
        <div style={{display: "inline-grid"}}>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {props.removePlayer(props.player.uuid)}}
          >
            Kick
          </button>
        </div>
      </div>
    </li>
    
  )
}

export default ManagePlayersItem;