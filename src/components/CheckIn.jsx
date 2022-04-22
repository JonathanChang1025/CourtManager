import React, { useState } from "react";
import { useInRouterContext } from "react-router-dom";
import LoginForm from "./LoginForm"

function CheckIn() {
  // React States
  const [user, setUser] = useState({name: "", phone: ""})
  const [error, setError] = useState("");

  // User Login info
  const database = [
    {
        phone: 4168828519
    },
    {
        phone: 4164123359
    }
  ];


  const Login = details => {
      console.log(details);
  }

  const Logout = () => {
      console.log("Logout");
  }

  return (
    <div className="CheckIn">
        {(user.phone != "") ? (
            <div className="welcome">
                <h2>Welcome, <span>{user.name}</span></h2>
                <button>Logout</button>
            </div>
        ) : (
            <LoginForm Login={Login} error={error}/>
        )}
    </div>
  );
}

export default CheckIn;