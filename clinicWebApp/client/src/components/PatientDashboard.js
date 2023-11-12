import React, { useState, useEffect } from 'react';
import '../css/PatientDashboard.css';

const PatientDashboard = () => {

  const [reservations, setReservations] = useState([]);
  const [slotId, setSlotId] = useState(0);
  const [updatedSlotId, setUpdatedSlotId] = useState(0);
  const [canceledSlotId, setcanceledSlotId] = useState(0);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/api/patients/${userId}/reservations`);
      if (!response.ok) {
        throw new Error('Failed To Fetch Patients Slot');
      }
      const data = await response.json();
      setReservations(data.reservations);
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleBooking = async () => {
    try {
      const response = await fetch('/api/patients/bookappointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id: userId, slot_id: slotId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    fetchReservations();
    setReservations(data.reservations);
  } catch (error) {
    setMessage(error.message);
    console.error(error);
  }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/patients/updateappointment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id: userId, slot_id: slotId, updated_slot_id: updatedSlotId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    fetchReservations();
    setMessage('Appointment Updated Successfully');
  } catch (error) {
    setMessage(error.message);
    console.error(error);
  }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch('/api/patients/cancelappointment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id: userId, slot_id: canceledSlotId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    fetchReservations();
    setMessage('Appointment Canceled Successfully');
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
  
  <div>
<h2 style={{ fontSize: '2em', marginBottom: '1em' }}>My Appointments</h2>
<table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Appointment</th>
      <th>Doctor</th>
    </tr>
  </thead>
  <tbody>
    {reservations.map((reservation) => (
    <tr key={reservation.appointment_id}>
      <td>{reservation.slot_id}</td>
      <td>{formatDate(reservation.date)} - {formatTime(reservation.start_time)} - {formatTime(reservation.end_time)}</td>
      <td>Dr.{reservation.doctor_name}</td>
    </tr>
    ))}
  </tbody>
</table>
<div className="book-appointment-container">
  <label>Appointment ID:</label>
  <input type="number" value={slotId} onChange={(e) => setSlotId(e.target.value)} /> 
  <button onClick={handleBooking}>Book Appointment</button>
</div>
<div className="update-appointment-container">
  <label> Current Appointment ID:</label>
  <input type="number" value={slotId} onChange={(e) => setSlotId(e.target.value)} />
  <label>Updated Appointment ID:</label>
  <input type="number" value={updatedSlotId} onChange={(e) => setUpdatedSlotId(e.target.value)} />
  <button onClick={handleUpdate}>Update Appointment</button>
</div>
<div className="cancel-appointment-container">
  <label>Appointment ID to Cancel:</label> 
  <input type="number" value={canceledSlotId} onChange={(e) => setcanceledSlotId(e.target.value)} />
  <button onClick={handleCancel}>Cancel Appointment</button>
</div>
{message && <p style={{ marginTop: '1em', color: '#ff0000' }}>{message}</p>}
</div>
  );
};
export default PatientDashboard;