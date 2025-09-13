import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../AuthStyles.css';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/", form);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login after successful registration
      }, 1500);
    } catch (error) {
      setMessage(
        "Registration failed: " +
        (error.response?.data?.username || error.response?.data?.email || error.message)
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card modern-register">
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">Join Abhi Travels to book your journey</p>

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
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              required
            />
            <label className="form-label">Email</label>
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

          <button type="submit" className="auth-button">Register</button>

          {message && (
            <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
              {message}
            </div>
          )}

          <p className="register-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;




