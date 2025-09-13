import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../BusStyles.css';

const BusList = ({ token }) => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [filters, setFilters] = useState({ origin: "", destination: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/buses/");
        setBuses(res.data);
        setFilteredBuses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuses();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    const filtered = buses.filter(bus =>
      bus.origin.toLowerCase().includes(filters.origin.toLowerCase()) &&
      bus.destination.toLowerCase().includes(filters.destination.toLowerCase())
    );
    setFilteredBuses(filtered);
  };

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };

  return (
    <div className="bus-list-container">
      <h2 className="bus-list-title">Available Buses</h2>

      <div className="filter-container">
        <input
          type="text"
          name="origin"
          placeholder="Filter by Origin"
          value={filters.origin}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <input
          type="text"
          name="destination"
          placeholder="Filter by Destination"
          value={filters.destination}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>

      <div className="buses-grid">
        {filteredBuses.map(bus => (
          <div key={bus.id} className="bus-card">
            <h3>{bus.bus_name} ({bus.number})</h3>
            <p>{bus.origin} → {bus.destination}</p>
            <p>Departure: {bus.start_time} | Arrival: {bus.reach_time}</p>
            <button onClick={() => handleViewSeats(bus.id)}>View Seats & Book</button>
          </div>
        ))}
      </div>

      {filteredBuses.length === 0 && <p>No buses found.</p>}
    </div>
  );
};

export default BusList;

