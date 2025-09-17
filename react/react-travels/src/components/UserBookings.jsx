import React, { useEffect, useState } from "react";
import axios from "axios";
import "../BusStyles.css"; // keep your styles or add more

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return;

      try {
        const response = await axios.get(
          // `http://localhost:8000/api/user/${userId}/bookings/`,
          `https://bus-booking-app-4-za7c.onrender.com/api/user/${userId}/bookings/`,
          { headers: { Authorization: `Token ${token}` } }
        );
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token, userId]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(
        // `http://localhost:8000/api/booking/${bookingId}/cancel/`,
        `https://bus-booking-app-4-za7c.onrender.com/api/booking/${bookingId}/cancel/`,
        { headers: { Authorization: `Token ${token}` } }
      );
      // Remove canceled booking from state
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking cancelled successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel booking");
    }
  };

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-bookings-container">
      <h2 className="bus-list-title">My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found.</p>}

      <div className="bookings-grid">
        {bookings.map((b) => (
  <div key={b.id} className="booking-card">
    <h3 className="bus-name">{b.bus?.bus_name || "Unknown Bus"}</h3>
    <p>
      Route: {b.bus?.origin || "-"} → {b.bus?.destination || "-"}
    </p>
    <p>Seat: {b.seat?.seat_number || "-"}</p>
    <p>Booking Time: {new Date(b.booking_time).toLocaleString()}</p>
    <p>Status: {b.seat?.is_booked ? "Booked" : "Available"}</p>

    <button
      className="cancel-button"
      onClick={() => handleCancel(b.id)}
    >
      Cancel Booking
    </button>
  </div>
))}
      </div>
    </div>
  );
};

export default UserBookings;



// import React, { useState } from "react";
// import axios from 'axios';
// import '../AuthStyles.css';

// const RegisterForm = () => {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/api/register/', form);
//       setMessage('Registration successful');
//     } catch(error) {
//       setMessage('Registration failed: ' + (error.response?.data?.username || error.message));
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">Join Abhi Travels</h2>
//         <p className="auth-subtitle">Create your account to start your journey</p>
        
//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//               className="form-input"
//               placeholder="Choose a username"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="form-input"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="form-input"
//               placeholder="Create a password"
//             />
//           </div>

//           <button type="submit" className="auth-button">
//             Register
//           </button>
          
//           {message && (
//             <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
//               {message}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

// import axios from 'axios'
// import React ,{useState, useEffect}from 'react'

// const UserBookings = ({token,userId}) => {
//     const [bookings,setBookings]=useState([])
//     const [bookingError,setBookingError]=useState(null)

// useEffect(()=>{
//     const fetchBookings= async()=>{
//         if(!token|| !userId){
//             return
//         }
//         try{
//             const response = await axios.get(`http://localhost:8000/api/user/${userId}/bookings/`,{
//                 headers:{
//                     Authorization :`Token ${token}`
//                 }
//             })
//             console.log("Booking data =", response.data)
//             setBookings(response.data)
//             console.log("checking for user booking=",response.data)
//         } catch(error){
//            console.log("fetching details failed",error)
//            setBookingError(
//             error.response?.data?.message
//            )
//         }
//     }
//     fetchBookings()
// },[userId, token])
//   return (
//     <div>
//       {bookings.map((item)=>{
//         return(
//             <div key={item.id}>
//                 {item.user}-
//                 {item.bus}-
//                 {item.seat.seat_number}-
//                 {item.booking_time}
//             </div>
//         )
        
            
        
//       })}
//     </div>
//   )
// }

// export default UserBookings
