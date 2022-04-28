import React, { useState } from "react";
import LoginForm from "./LoginForm";

function CheckIn() {
  const [member, setMember] = useState(null);
  const [guest, setGuest] = useState("");
  const [error, setError] = useState("");

  //const query = usersRef.orderByChild('createdAt').limit(25)
  //const [messages] = useCollectionData(query, { idField: 'id' })

  const Login = details => {
    setMember(details);
  }

  const Logout = () => {
    setMember(null);
  }

  return (
    <div className="CheckIn">
        {member != null ?
            <div className="welcome">
                <h2>Welcome, <span>{member.name}</span></h2>
                <button onClick={Logout}>Logout</button>
            </div> :
            <LoginForm Login={Login} error={error}/>
        }
    </div>
  );
}

export default CheckIn;