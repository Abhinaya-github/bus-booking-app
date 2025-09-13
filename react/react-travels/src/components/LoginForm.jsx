import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../AuthStyles.css';

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login/", form);
      const token = response.data.token;
      const userId = response.data.user_id;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        setMessage("Login successful");

        if (onLogin) onLogin(token, userId);
        navigate("/"); // Redirect to home (bus list)
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed. Try again!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card modern-login">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue your journey</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-input"
              required
            />
            <label className="form-label">Username</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              required
            />
            <label className="form-label">Password</label>
          </div>

          <button type="submit" className="auth-button">Login</button>

          {message && (
            <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}

          <p className="register-link">
            New here? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


