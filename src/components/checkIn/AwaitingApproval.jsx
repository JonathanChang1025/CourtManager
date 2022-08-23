import { Card } from 'react-bootstrap';

function AwaitingApproval(prop) {

  return(
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-4 col-md-offset-5 align-center ">
          <Card className="text-center">
            <Card.Header><h4>Drop-in Pending</h4></Card.Header>
            <Card.Body>
              <Card.Text>
                Please wait for approval by administrator
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AwaitingApproval;