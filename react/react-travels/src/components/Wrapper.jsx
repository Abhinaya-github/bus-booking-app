import React from 'react';
import { Link } from 'react-router-dom';
import '../WrapperStyles.css';

const Wrapper = ({ token, handleLogout, children }) => {
  return (
    <div className="app-wrapper">
      <header className="app-header">
        <Link to="/" className="logo">🚌 Abhi Travels</Link>
        <nav className="nav-menu">
          {token ? (
            <div className="nav-buttons">
              <Link to="/my-bookings" className="nav-link">My Bookings</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="nav-buttons">
              <Link to="/login" className="nav-link"><button className="login-btn">Login</button></Link>
              <Link to="/register" className="nav-link"><button className="register-btn">Register</button></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>&copy; 2024 Abhi Travels. Your journey, our priority.</p>
      </footer>
    </div>
  );
};

export default Wrapper;

