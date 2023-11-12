clinicWebApp/server/src/controllers/doctorsController.js

const pool = require('../../database');
const {
  addDoctorSlotCheckExistingQuery,
  addDoctorSlotReservedQuery,
  addDoctorSlotInsertQuery,
  cancelDoctorSlotCheckExistingQuery,
  cancelDoctorSlotDeleteQuery,
  retrieveDoctorSlotsQuery,
} = require('../queries/doctorsQueries');

exports.addDoctorSlot = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { doctor_id, date, start_time, end_time, reservations_num } = req.body;

    // Check if the slot is already inserted
    const existingSlot = await client.query(addDoctorSlotCheckExistingQuery, [
      doctor_id,
      date,
      start_time,
      end_time,
    ]);

    if (existingSlot.rows.length > 0) {
      await client.query('ROLLBACK'); // Rollback the transaction
      return res.status(400).json({ message: 'Slot Is Already Added' });
    }

    // Check if the slot is reserved by another doctor
    const reservedSlot = await client.query(addDoctorSlotReservedQuery, [
      doctor_id,
      date,
      end_time,
      start_time,
    ]);

    if (reservedSlot.rows.length > 0) {
      await client.query('ROLLBACK'); // Rollback the transaction
      return res.status(400).json({ message: 'Slot Is Reserved By Another Doctor' });
    }

    // Create a new slot
    const newSlot = await client.query(addDoctorSlotInsertQuery, [
      doctor_id,
      date,
      start_time,
      end_time,
      reservations_num,
    ]);

    await client.query('COMMIT'); // Commit the transaction

    res.json({ slot: newSlot.rows[0] });
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK'); // Rollback the transaction in case of an error
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    client.release(); // Release the database connection
  }
};

exports.cancelDoctorSlot = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { doctor_id, slot_id } = req.body;

    const existingSlot = await client.query(cancelDoctorSlotCheckExistingQuery, [
      doctor_id,
      slot_id,
    ]);

    if (existingSlot.rows.length > 0) {
      await client.query(cancelDoctorSlotDeleteQuery, [doctor_id, slot_id]);
      await client.query('COMMIT'); // Commit the transaction
      res.json({ message: 'Slot canceled successfully' });
    } else {
      await client.query('ROLLBACK'); // Rollback the transaction
      res.status(400).json({ message: 'You Do Not Have a Slot With This ID' });
    }
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK'); // Rollback the transaction in case of an error
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release(); // Release the database connection
  }
};

exports.doctorSlots = async (req, res) => {
  try {
    const doctor_id = req.params.id;

    // Check if the doctor is registered
    const existingDoctor = await pool.query('SELECT * FROM doctors WHERE doctor_id = $1', [
      doctor_id,
    ]);

    if (existingDoctor.rows.length === 0) {
      return res.status(400).json({ message: 'There Is No Doctor Registered With This Id' });
    }

    // Retrieve all slots for the doctor
    const doctorSlots = await pool.query(retrieveDoctorSlotsQuery, [doctor_id]);

    res.json({ slots: doctorSlots.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
