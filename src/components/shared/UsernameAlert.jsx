function UsernameAlert(props) {
  return(
    <div className="alert alert-danger" role="alert">
      <button type="button" className="close" onClick={props.closeMessageAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
      {props.showMessageAlert}
    </div>
  )
}

export default UsernameAlert;