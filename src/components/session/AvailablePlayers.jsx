import { Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { RESOURCES } from '../../resource'

function AvailablePlayers(props) {

  return(
    <div className="p-3" style={{height: "100vh"}}>
      <Card className="text-center mh-100 card-mid-background" style={{height: "100vh"}} text="light">
        <Card.Header>{RESOURCES[props.language].SESSION.LABELS.AVAILABLE_PLAYERS}</Card.Header>
        <Card.Body className="p-3" style={{overflow: "auto"}}>
          <div className="col">
            <div className="row flex-grow">
              <Droppable droppableId="-1">
                {(provided, snapshot) => (
                  <ul className="list-group flex-fill"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{minHeight: "400px"}}
                  >
                    {
                      props.playerList.map((player, index) =>
                      {
                        // Only display available players if they don't have next court set for them
                        if (player.next_court === -1 && player.approved === true) {
                          var indexWithinContext = props.getIndexWithinContext(index, -1);
                          return (
                            <Draggable key={player.uuid} draggableId={player.uuid} index={indexWithinContext}>
                              {(provided) => (
                                <li
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="list-group-item
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                    list-group-item-light"
                                >
                                  {player.name}
                                  {
                                    player.current_court === -1 ?
                                    <span className="badge badge-success badge-pill">{player.total_games}</span> :
                                    <span className="badge badge-warning badge-pill">{player.total_games}</span>
                                  }
                                </li>
                              )}
                            </Draggable>
                          );
                        } else {
                          return null;
                        }
                      })
                    }
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AvailablePlayers;