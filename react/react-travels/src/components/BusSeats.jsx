import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../BusStyles.css';

const BusSeats = ({ token }) => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/buses/${busId}/`);
        setBus(res.data);
        setSeats(res.data.seats || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBus();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      if (window.confirm("Please login to book a seat. Go to login page?")) {
        navigate("/login");
      }
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/booking/", { seat: seatId }, {
        headers: { Authorization: `Token ${token}` }
      });
      alert("Booking Successful");
      setSeats(seats.map(seat => seat.id === seatId ? { ...seat, is_booked: true } : seat));
    } catch (err) {
      alert(err.response?.data?.error || "Booking Failed");
    }
  };

  return (
    <div className="bus-seats-container">
      {bus && (
        <>
          <h2>{bus.bus_name} ({bus.number})</h2>
          <p>{bus.origin} → {bus.destination}</p>
          <p>Departure: {bus.start_time} | Arrival: {bus.reach_time}</p>

          <h3>Seats</h3>
          <div className="seats-grid">
            {seats.map(seat => (
              <button
                key={seat.id}
                onClick={() => handleBook(seat.id)}
                disabled={seat.is_booked}
                className={seat.is_booked ? "booked" : "available"}
              >
                {seat.seat_number} {seat.is_booked && "(Booked)"}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusSeats;

