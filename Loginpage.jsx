import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post("http://localhost:8000/api/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("name", response.data.name);

      if (response.data.role === "manager") {
        window.location.href = "/manager";
      } else {
        window.location.href = "/employee";
      }
    } catch (error) {
      setErrorMsg("❌ Invalid email or password");
    }
  };

  const styles = getStyles(darkMode);

  return (
    <div style={styles.page}>
      <div style={styles.toggleBar}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />{" "}
          🌙 Dark Mode
        </label>
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>🚀 Welcome to Feedback Portal</h2>

        {errorMsg && <div style={styles.error}>{errorMsg}</div>}

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ ...styles.input, marginBottom: "0" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleBtn}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" style={styles.button}>
            🔐 Login
          </button>
        </form>
      </div>
    </div>
  );
};

function getStyles(darkMode) {
  const base = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: "all 0.3s ease",
  };

  return {
    page: {
      ...base,
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: darkMode
        ? "linear-gradient(120deg, #1c1c1c, #333)"
        : "linear-gradient(120deg, #74ebd5 0%, #acb6e5 100%)",
      color: darkMode ? "#fff" : "#000",
    },
    toggleBar: {
      position: "absolute",
      top: 15,
      right: 25,
      fontSize: "14px",
    },
    card: {
      backgroundColor: darkMode ? "#2c3e50" : "#ffffff",
      padding: "50px 40px",
      borderRadius: "16px",
      boxShadow: darkMode
        ? "0 8px 20px rgba(255,255,255,0.1)"
        : "0 8px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "24px",
      color: darkMode ? "#ecf0f1" : "#2c3e50",
    },
    error: {
      backgroundColor: "#fce4e4",
      color: "#e74c3c",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      textAlign: "center",
      fontSize: "14px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      padding: "14px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
      outline: "none",
    },
    button: {
      marginTop: "20px",
      padding: "14px",
      backgroundColor: "#2980b9",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s",
    },
    passwordWrapper: {
      position: "relative",
      marginBottom: "15px",
    },
    toggleBtn: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      color: darkMode ? "#eee" : "#555",
    },
  };
}

export default LoginPage;
