import { Card } from 'react-bootstrap';

function CurrentCourt(props) {

  return(
    <Card className="text-center mt-3 card-mid-background" text="light">
      <Card.Header>Currently Playing</Card.Header>
      <Card.Body className="p-0">
        <div className="col">
          <div className="row flex-grow">
            {[...Array(props.numOfCourts)].map((x, court_id) =>
              <div className="col p-0">
                <p>Court {court_id+1}</p>
                <ul className="list-group flex-fill m-2"
                  style={{minHeight: 200}}
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