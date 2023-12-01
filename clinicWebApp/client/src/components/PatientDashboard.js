import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import DoctorDropdown from './DoctorDropdown';
import SlotsTable from './SlotsTable';
import '../css/PatientDashboard.css';

const PatientDashboard = () => {

  const [reservations, setReservations] = useState([]);
  const [slotId, setSlotId] = useState(0);
  const [updatedSlotId, setUpdatedSlotId] = useState(0);
  const [canceledSlotId, setcanceledSlotId] = useState(0);
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('name');
  const [doctorId, setDoctorId] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/patients/${userId}/reservations`);
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
      const response = await fetch('http://localhost:3000/api/patients/bookappointment', {
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
    setMessage('Appointment Reserved Successfully');
  } catch (error) {
    setMessage(error.message);
    console.error(error);
  }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/patients/updateappointment', {
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
      const response = await fetch('http://localhost:3000/api/patients/cancelappointment', {
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

  const handleDoctorSelect = async (selectedDoctorId) => {
    setDoctorId(selectedDoctorId);
    if (selectedDoctorId) {
      try {
        const response = await fetch(`http://localhost:3000/api/patients/${selectedDoctorId}/getslots`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor slots');
        }
        const data = await response.json();
        setDoctorSlots(data.slots);
      } catch (error) {
        setMessage(error.message);
        console.error(error);
      }
    } else {
      setDoctorSlots([]);
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
  
  <div className="patient-dashboard-container">
    <div className="header-container">
        <h2>Welcome <span style={{ color: '#0056b3' }}>{name}</span></h2>
        <div className="top-right">
          <Link to="/" className="button-link">
            Home
          </Link>
        </div>
      </div>
    <h3>My Appointments</h3>
    <table>
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
            <td>{formatDate(reservation.date)} | {formatTime(reservation.start_time)} - {formatTime(reservation.end_time)}</td>
            <td>Dr.{reservation.doctor_name}</td>
          </tr>
       ))}
     </tbody>
   </table>
   <div className="book-appointment-container">
   <DoctorDropdown onSelect={handleDoctorSelect} />
      {doctorSlots.length > 0 && <SlotsTable slots={doctorSlots} />}
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
  {message && <p className="error-message">{message}</p>}
</div>
  );
};
export default PatientDashboard;
