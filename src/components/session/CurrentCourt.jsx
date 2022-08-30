import { Card } from 'react-bootstrap';

function CurrentCourt(props) {

  return(
    <Card className="text-center card-mid-background" style={{height: "100%"}} text="light">
      <Card.Header>Currently Playing</Card.Header>
      <Card.Body className="p-0" style={{overflow: "clip"}}>
        <div className="col">
          <div className="row flex-grow">
            {[...Array(props.numOfCourts)].map((x, court_id) =>
              <div className="col p-0">
                <p>Court {court_id+1}</p>
                <ul className="list-group flex-fill m-2"
                >
                  {
                    props.playerList.map(function(player){
                      if (player.current_court === court_id) {
                        return (
                          <li className="list-group-item list-group-item-light">{player.name}</li>
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
  )
}

export default CurrentCourt;