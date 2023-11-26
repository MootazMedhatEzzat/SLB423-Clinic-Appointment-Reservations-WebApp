import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorDropdown({ onSelect }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      const response = await axios.get('http://localhost:3000/api/patients/getdoctors');
      setDoctors(response.data.doctors);
    }
    fetchDoctors();
  }, []);

  function handleSelect(event) {
    const doctorId = event.target.value;
    onSelect(doctorId);
  }

  return (
    <select onChange={handleSelect}>
      <option value="">Select a doctor</option>
      {doctors.map(doctor => (
        <option key={doctor.doctor_id} value={doctor.doctor_id}>
          Dr.{doctor.name}
        </option>
      ))}
    </select>
  );
}

export default DoctorDropdown;
