import React, { useState } from "react";
import httpClient from "../../httpClient";
import { useNavigate } from "react-router-dom";

import "./index.css"

const Auth = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState("Log-in");

  const handleAuth = async () => {
    try {
      const user = { email: email, password: password };
      httpClient.post(`/${authType == "Log-in" ?"login":"register"}`, user).then((response)=>{
        console.log(response)
        if(!response.data.error){
          navigate("/task")
        }
      })
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="authWrapper">
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="authBTNWrapper">
        <button
        onClick={(e) => {
          handleAuth();
        }}
      >
        {authType}
      </button>
      <button
        onClick={() =>
          setAuthType(authType == "Register" ? "Log-in" : "Register")
        }
      >
        Change to {authType == "Register" ? "Log-in" : "Register"}
      </button>
      </div>
      
    </div>
  );
};

export default Auth;
