import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const products = [
  { name: "Fresh Apples", price: "₹120/kg" },
  { name: "Organic Milk", price: "₹60/litre" },
  { name: "Tomatoes", price: "₹40/kg" },
  { name: "Potatoes", price: "₹30/kg" },
];

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const register = async () => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        email,
        password,
        mobile,
      });
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Check backend or network.");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setMessage(res.data.message);
      setLoggedIn(true);
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Check credentials or backend.");
    }
  };

  if (loggedIn) {
    return (
      <div className="container">
        <h2>FreshMart Grocery</h2>
        <div className="products">
          {products.map((p, i) => (
            <div key={i} className="card">
              <h3>{p.name}</h3>
              <p>{p.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="formCard">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            placeholder="Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLogin ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={register}>Register</button>
        )}

        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "New user? Register here"
            : "Already have account? Login"}
        </p>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
