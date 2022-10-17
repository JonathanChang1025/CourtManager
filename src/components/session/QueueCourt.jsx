import { Card } from 'react-bootstrap';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { RESOURCES } from '../../resource'

function QueueCourt(props) {

  return(
    <Card className="text-center card-mid-background" style={{height: "100%"}} text="light">
      <Card.Header className="p-1">{RESOURCES[props.language].SESSION.LABELS.IN_QUEUE}</Card.Header>
      <Card.Body className="p-0" style={{overflow: "clip"}}>
        <div className="col">
          <div className="row flex-grow">
            {[...Array(props.numOfCourts)].map((x, court_id) =>
              <Droppable
                droppableId={court_id.toString()}
                isDropDisabled={props.courtFull[court_id]}
                key={court_id}
              >
                {(provided, snapshot) => (
                  <div className="col p-0">
                    {
                      props.individualCourtControl ?
                      (
                        <div className="mx-2">
                          {
                            props.queueCourtSelected === -1 || props.queueCourtSelected !== court_id ?
                            <button className="btn btn-warning btn-block" type="button" onClick={() => props.setQueueCourtSelected(court_id)}>
                              {RESOURCES[props.language].SESSION.LABELS.COURT} {court_id+1}
                            </button> :
                            <button className="btn btn-light-yellow-background btn-block" type="button" onClick={() => props.setQueueCourtSelected(-1)}>
                              {RESOURCES[props.language].SESSION.LABELS.COURT_SELECTED}
                            </button>
                          }
                        </div>
                      ) :
                      <div className="mx-2">
                        <button className="btn btn-dark-background text-light btn-block" type="button" disabled>
                          {RESOURCES[props.language].SESSION.LABELS.COURT} {court_id+1}
                        </button>
                      </div>
                    }
                    <ul className="list-group flex-fill m-2"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{minHeight: "200px"}}
                    >
                      {
                        props.playerList.map((player, index) => {
                          if (player.next_court === court_id) {
                            var indexWithinContext = props.getIndexWithinContext(index, court_id);
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
                  </div>
                )}
              </Droppable>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default QueueCourt;