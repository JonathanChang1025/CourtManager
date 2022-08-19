import { Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';

function AvailablePlayers(props) {

  return(
    <Card className="text-center mx-3 my-3 px-1 card-mid-background flex-grow" text="light" style={{height: "96vh"}} >
      <Card.Header>Available Players</Card.Header>
      <Card.Body className="p-0" style={{overflow: "auto"}}>
        <div className="col">
          <div className="row flex-grow">
            <Droppable droppableId="-1">
              {(provided, snapshot) => (
                <ul className="list-group flex-fill m-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{minHeight: 500}}
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
  )
}

export default AvailablePlayers;