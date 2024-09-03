import React, { useState } from "react";
import axios from "axios";
import httpClient from "../../httpClient";
import { useNavigate } from "react-router-dom";

const Auth = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("giras@gmail.com");
  const [password, setPassword] = useState("18125");
  const [authType, setAuthType] = useState("register");

  const handleAuth = async () => {
    try {
      const user = { email: email, password: password };
      const res = await httpClient.post(
        `http://localhost:5000/login`, //${authType}
        user
      );
      console.log(res.data);

      const res_client = await httpClient.get("http://127.0.0.1:5000/@me");
      console.log(res_client.data);
      //navigate('/task');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
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
      <button
        onClick={(e) => {
          handleAuth();
        }}
      >
        {authType}
      </button>
      <button
        onClick={() =>
          setAuthType(authType == "register" ? "login" : "register")
        }
      >
        Change to {authType == "register" ? "login" : "register"}
      </button>
    </div>
  );
};

export default Auth;
