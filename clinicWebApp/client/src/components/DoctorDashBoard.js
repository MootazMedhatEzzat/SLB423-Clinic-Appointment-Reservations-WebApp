import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/DoctorDashboard.css';

const DoctorDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reservationsNum, setReservationsNum] = useState(1);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');

  const fetchDoctorSlots = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/doctors/slots/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctor slots');
      }
      const data = await response.json();
      setSlots(data.slots);
    } catch (error) {
      setMessage('Failed to fetch doctor slots');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctorSlots();
  }, []);

  const addDoctorSlot = async () => {
    try {
      if (!date || !startTime || !endTime || isNaN(reservationsNum) || reservationsNum < 0) {
        throw new Error('Please provide valid date, time, and reservations number.');
      }
  
      const currentDate = new Date();
      const selectedDate = new Date(`${date}T${startTime}`);
      
      // Check if the selected date is in the past
      if (selectedDate < currentDate) {
        throw new Error('Please select a future date and time.');
      }
  
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/doctors/addslot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: userId,
          date,
          start_time: startTime,
          end_time: endTime,
          reservations_num: reservationsNum,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setSlots(data.slots);
      fetchDoctorSlots();
      setMessage('Slot Added Successfully');
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  const cancelDoctorSlot = async (slotId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/doctors/cancelslot`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: userId,
          slot_id: slotId,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      fetchDoctorSlots();
      setMessage('Slot Canceled Successfully');
    } catch (error) {
      setMessage(`Failed to cancel slot: ${error.message}`);
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="doctor-dashboard-container">
      <div className="header-container">
        <h2>
          Welcome Doctor <span style={{ color: '#0056b3' }}>{name}</span>
        </h2>
        <div className="top-right">
          <Link to="/" className="button-link">
            Home
          </Link>
        </div>
      </div>
      <h3>My Slots</h3>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Date</th>
            <th style={{ textAlign: 'center' }}>From</th>
            <th style={{ textAlign: 'center' }}>To</th>
            <th style={{ textAlign: 'center' }}>Reservations Number</th>
            <th style={{ textAlign: 'center' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {slots &&
            slots.map((slot) => (
              <tr key={slot.id}>
                <td style={{ textAlign: 'center' }}>{formatDate(slot.date)}</td>
                <td style={{ textAlign: 'center' }}>{formatTime(slot.start_time)}</td>
                <td style={{ textAlign: 'center' }}>{formatTime(slot.end_time)}</td>
                <td style={{ textAlign: 'center' }}>{slot.reservations_num}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => cancelDoctorSlot(slot.id)}>Cancel</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="add-slot-container">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>From:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>To:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <label>Reservations Number:</label>
        <input type="number" min="1" value={reservationsNum} onChange={(e) => setReservationsNum(e.target.value)} />
        <button onClick={addDoctorSlot}>Add Slot</button>
      </div>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default DoctorDashboard;
