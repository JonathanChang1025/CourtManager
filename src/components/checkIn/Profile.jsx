import { Card } from 'react-bootstrap';

function Profile(prop) {

  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-4 col-md-offset-5 align-center ">
          <Card className="text-center">
            <Card.Header><h4>Welcome, <span>{prop.playerData.name}</span></h4></Card.Header>
          </Card>
          <Card className="text-center">
            <Card.Header>You are on court</Card.Header>
            <Card.Body>
              <Card.Text className="display-1">
                {
                  prop.playerData.current_court === -1 ?
                  "n/a" :
                  prop.playerData.current_court + 1
                }
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-center">
            <Card.Header>You are in queue for court</Card.Header>
            <Card.Body>
              <Card.Text className="display-1">
                {
                  prop.playerData.next_court === -1 ?
                  "n/a" :
                  prop.playerData.next_court + 1
                }
                </Card.Text>
            </Card.Body>
          </Card>
          <button onClick={prop.logout}>Check out</button>
          <button onClick={prop.callConsole}>Console.log</button>
          <button onClick={prop.createPlayerButton}>Create New Player</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;