import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://54.160.199.81:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error registering user");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://54.160.199.81:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      setMessage(text);
    } catch (err) {
      setMessage("Error logging in");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>3-Tier App — Gmail Register/Login</h2>
      <input
        type="email"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
