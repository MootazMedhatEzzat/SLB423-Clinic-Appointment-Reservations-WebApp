import React, { useState, useEffect } from 'react';
import '../css/DoctorDashboard.css';

const DoctorDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [reservationsNum, setReservationsNum] = useState(0);
  const [slotIdToCancel, setSlotIdToCancel] = useState(0);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');

  const fetchDoctorSlots = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/doctors/slots/${userId}`);
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
      const response = await fetch('http://localhost:3000/api/doctors/addslot', {
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

  const cancelDoctorSlot = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/doctors/cancelslot', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: userId,
          slot_id: slotIdToCancel,
        }),
      });
      if (!response.ok) {
        throw new Error(data.message);
      }
      fetchDoctorSlots();
      setMessage('Slot Canceled Successfully');
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  // Function to format the date in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Function to format the time in AM/PM format
  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="doctor-dashboard-container">
      <h2>Welcome Doctor <span style={{ color: '#ff988f' }}>{name}</span></h2>
      <h3>My Slots</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Reservations Number</th>
          </tr>
        </thead>
        <tbody>
          {slots && slots.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.id}</td>
              <td>{formatDate(slot.date)}</td>
              <td>{formatTime(slot.start_time)}</td>
              <td>{formatTime(slot.end_time)}</td>
              <td>{slot.reservations_num}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-slot-container">
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <label>Start Time:</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <label>End Time:</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <label>Reservations Number:</label>
        <input type="number" value={reservationsNum} onChange={(e) => setReservationsNum(e.target.value)} />
        <button onClick={addDoctorSlot}>Add Slot</button>
      </div>
      <div className="cancel-slot-container">
        <label>Slot ID to Cancel:</label>
        <input type="number" value={slotIdToCancel} onChange={(e) => setSlotIdToCancel(e.target.value)} />
        <button onClick={cancelDoctorSlot}>Cancel Slot</button>
      </div>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default DoctorDashboard;
