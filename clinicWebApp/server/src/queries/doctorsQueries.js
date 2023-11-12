// server/src/queries/doctorsQueries.js

// Add Doctor Slot Queries
const addDoctorSlotCheckExistingQuery = `
  SELECT * FROM slots WHERE doctor_id = $1 AND date = $2 AND start_time = $3 AND end_time = $4
`;

const addDoctorSlotReservedQuery = `
  SELECT * FROM slots WHERE doctor_id != $1 AND date = $2 AND start_time < $3 AND end_time > $4
`;

const addDoctorSlotInsertQuery = `
  INSERT INTO slots (doctor_id, date, start_time, end_time, reservations_num)
  VALUES ($1, $2, $3, $4, $5) RETURNING *
`;

// Cancel Doctor Slot Queries
const cancelDoctorSlotCheckExistingQuery = `
  SELECT * FROM slots WHERE doctor_id = $1 AND id = $2
`;

const cancelDoctorSlotDeleteQuery = `
  DELETE FROM slots WHERE doctor_id = $1 AND id = $2
`;

// Retrieve Doctor Slots Query
const retrieveDoctorSlotsQuery = `
  SELECT * FROM slots WHERE doctor_id = $1
`;

// Export the queries
module.exports = {
  addDoctorSlotCheckExistingQuery,
  addDoctorSlotReservedQuery,
  addDoctorSlotInsertQuery,
  cancelDoctorSlotCheckExistingQuery,
  cancelDoctorSlotDeleteQuery,
  retrieveDoctorSlotsQuery,
};
