import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorDropdown from './DoctorDropdown';
import SlotsTable from './SlotsTable';
import '../css/PatientDashboard.css';

const PatientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedUpdatedAppointmentId, setSelectedUpdatedAppointmentId] = useState('');
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

  const bookPatientAppointment = async (slotId) => {
    const selectedSlot = doctorSlots.find((slot) => slot.slot_id === slotId);
    slotId = selectedSlot.id;
    try {
      const response = await fetch('http://localhost:3000/api/patients/bookappointment`, {
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
      if (!selectedAppointment) {
        throw new Error('Please select an appointment to update.');
      }

      // Use the selectedUpdatedAppointmentId instead of updatedSlotId
      const response = await fetch('http://localhost:3000/api/patients/updateappointment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_id: userId,
          slot_id: selectedAppointment.slot_id,
          updated_slot_id: selectedUpdatedAppointmentId, // Use the selectedUpdatedAppointmentId
        }),
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

  const cancelPatientAppointment = async (canceledSlotId) => {
    try {
      const response = await fetch('http://localhost:3000/api/patients/cancelappointment`, {
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
    <div className="patient-dashboard-container">
      <div className="header-container">
        <h2>
          Welcome <span style={{ color: '#0056b3' }}>{name}</span>
        </h2>
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
            <th style={{ textAlign: 'center' }}>Appointment</th>
            <th style={{ textAlign: 'center' }}>Doctor</th>
            <th style={{ textAlign: 'center' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.appointment_id}>
              <td style={{ textAlign: 'center' }}>
                {formatDate(reservation.date)} | {formatTime(reservation.start_time)} -{' '}
                {formatTime(reservation.end_time)}
              </td>
              <td style={{ textAlign: 'center' }}>Dr.{reservation.doctor_name}</td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => cancelPatientAppointment(reservation.slot_id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="book-appointment-container" style={{ textAlign: 'center' }}>
        <DoctorDropdown onSelect={handleDoctorSelect} />
        {doctorSlots.length > 0 && <SlotsTable slots={doctorSlots} onBookAppointment={bookPatientAppointment} />}
      </div>

      <div className="update-appointment-container">

        <div className="appointment-groups-container">
          <div className="update-appointment-group">
            <label>Select Appointment to Update:</label>
            <select
              value={selectedAppointment ? selectedAppointment.slot_id : ''}
              onChange={(e) =>
                setSelectedAppointment(
                  reservations.find((appt) => appt.slot_id === parseInt(e.target.value))
                )
              }
            >
              <option value="">Select Appointment to Update</option>
              {reservations.map((reservation) => (
                <option key={reservation.appointment_id} value={reservation.slot_id}>
                  {formatDate(reservation.date)} | {formatTime(reservation.start_time)} -{' '}
                  {formatTime(reservation.end_time)}
                </option>
              ))}
            </select>
          </div>

          <div className="updated-appointment-group">
            <label>Select Updated Appointment:</label>
            <select
              value={selectedUpdatedAppointmentId}
              onChange={(e) => setSelectedUpdatedAppointmentId(e.target.value)}
            >
              <option value="">Select Updated Appointment</option>
              {doctorSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {formatDate(slot.date)} | {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={handleUpdate} className="update-appointment-button">
            Update Appointment
          </button>
        </div>
      </div>

      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default PatientDashboard;
