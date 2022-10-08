import { Card } from 'react-bootstrap';
import { RESOURCES } from '../../resource'

function CurrentCourt(props) {

  return(
    <Card className="text-center card-mid-background" style={{height: "100%"}} text="light">
      <Card.Header className="p-1">{RESOURCES[props.language].SESSION.LABELS.CURRENTLY_PLAYING}</Card.Header>
      <Card.Body className="p-0" style={{overflow: "clip"}}>
        <div className="col">
          <div className="row flex-grow">
            {[...Array(props.numOfCourts)].map((x, court_id) =>
              <div className="col p-0" key={court_id}>
                <p>{RESOURCES[props.language].SESSION.LABELS.COURT} {court_id+1}</p>
                <ul className="list-group flex-fill m-2">
                  {
                    props.playerList.map(function(player){
                      if (player.current_court === court_id) {
                        return (
                          <li className="list-group-item list-group-item-light" key={player.uuid}>{player.name}</li>
                        );
                      } else {
                        return null;
                      }
                    })
                  }
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CurrentCourt;