import React from 'react';

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

function SlotsTable({ slots }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Appointment</th>
          <th>Reservations Number</th>
        </tr>
      </thead>
      <tbody>
        {slots.map(slot => (
          <tr key={slot.slot_id}>
            <td>{slot.id}</td>
            <td>{formatDate(slot.date)} | {formatTime(slot.start_time)} - {formatTime(slot.end_time)}</td>
            <td>{slot.reservations_num}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SlotsTable;
