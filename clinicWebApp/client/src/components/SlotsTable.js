import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const formatTime = (timeString) => {
  const time = new Date(`2000-01-01T${timeString}`);
  return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

function SlotsTable({ slots, onBookAppointment }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Appointment</th>
          <th>Reservations Number</th>
          <th>Book Appointment</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot) => (
          <tr key={slot.slot_id}>
            <td style={{ textAlign: 'center' }}>
              {formatDate(slot.date)} | {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
            </td>
            <td style={{ textAlign: 'center' }}>{slot.reservations_num}</td>
            <td style={{ textAlign: 'center' }}>
              <button onClick={() => onBookAppointment(slot.slot_id)}>Book</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SlotsTable;
