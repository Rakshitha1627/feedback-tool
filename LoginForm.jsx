import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        username: email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("name", res.data.name);

      if (res.data.role === "manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/employee";
      }
    } catch (error) {
      setErrorMsg("❌ Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.title}>🔐 Login to Feedback Portal</h2>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>
          🚀 Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    transition: "0.4s ease",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#34495e",
    fontSize: "24px",
  },
  input: {
    padding: "12px 14px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    transition: "all 0.3s ease-in-out",
    outline: "none",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "10px",
    fontSize: "14px",
    textAlign: "center",
  },
};

styles.input[":hover"] = {
  borderColor: "#2980b9",
  boxShadow: "0 0 4px rgba(41, 128, 185, 0.3)",
};

styles.button[":hover"] = {
  backgroundColor: "#1c5980",
};

export default LoginForm;
