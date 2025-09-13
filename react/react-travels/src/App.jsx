import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Wrapper from "./components/Wrapper";
import BusList from "./components/BusList";
import BusSeats from "./components/BusSeats";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserBookings from "./components/UserBookings";

// Set Axios header if token exists
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}

const App = () => {
  const [tokenState, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const handleLogin = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    setToken(token);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  return (
    <Wrapper token={tokenState} handleLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<BusList token={tokenState} />} />
        <Route path="/buses" element={<BusList token={tokenState} />} />
        <Route path="/bus/:busId" element={<BusSeats token={tokenState} />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/my-bookings" element={<UserBookings token={tokenState} userId={userId} />} />
      </Routes>
    </Wrapper>
  );
};

export default App;


