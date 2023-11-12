// server/src/controllers/doctorController.js

const pool = require('../../database');

exports.addDoctorSlot = async (req, res) => {
  try {
    //const doctor_id  = req.params.id;
    const { doctor_id , date, start_time, end_time, reservations_num } = req.body;

    // Check if the slot is already inserted
    const existingSlot = await pool.query(
        'SELECT * FROM slots WHERE doctor_id = $1 AND date = $2 AND start_time <= $3 AND end_time >= $4',
        [doctor_id, date, end_time, start_time]
    );
  
    if (existingSlot.rows.length > 0) {
        return res.status(400).json({ message: 'Slot Is Already Added' });
    }

    // Check if the slot is reserved by another doctor
    const reservedSlot = await pool.query(
        'SELECT * FROM slots WHERE doctor_id != $1 AND date = $2 AND start_time < $3 AND end_time > $4',
        [doctor_id, date, end_time, start_time]
    );
  
    if (reservedSlot.rows.length > 0) {
        return res.status(400).json({ message: 'Slot Is Reserved By Another Doctor' });
    }

    // Create a new slot
    await pool.query(
      'INSERT INTO slots (doctor_id, date, start_time, end_time, reservations_num) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [doctor_id, date, start_time, end_time, reservations_num]
    );

    // Retrieve all slots for the doctor
    const doctorSlots = await pool.query(
      'SELECT * FROM slots WHERE doctor_id = $1',
      [doctor_id]
    );

    res.json({ slots: doctorSlots.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.cancelDoctorSlot = async (req, res) => {
  try {
    //const doctor_id  = req.params.id;
    const { doctor_id, slot_id }  = req.body;

    const existingSlot = await pool.query(
      'SELECT * FROM slots WHERE doctor_id = $1 AND id = $2',
      [doctor_id, slot_id]
    ); 

    if (existingSlot.rows.length > 0) {
      
      await pool.query(
        'DELETE FROM slots WHERE doctor_id = $1 AND id = $2',
        [doctor_id, slot_id]
      );

      res.json({ message: 'Slot canceled successfully' });
      
    } else {
      res.status(400).json({ message: "You Do Not Have a Slot With This ID" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.doctorSlots = async (req, res) => {
  try {
    const doctor_id = req.params.id;

    // Retrieve all slots for the doctor
    const doctorSlots = await pool.query(
      'SELECT * FROM slots WHERE doctor_id = $1',
      [doctor_id]
    );

    res.json({ slots: doctorSlots.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};