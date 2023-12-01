// server/src/controllers/patientController.js

const pool = require('../../database');

exports.getDoctors = async (req, res) => {
  try {
    // Get the all doctors
    const doctors = await pool.query(
      'SELECT doctors.doctor_id, users.name FROM doctors INNER JOIN users ON doctors.doctor_id = users.id'
    );

    res.json({ doctors: doctors.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getDoctorSlots = async (req, res) => {
  try {
    const doctorId  = req.params.id;

    // Check if the doctor is registered
    const existingDoctor = await pool.query(
        'SELECT * FROM doctors WHERE doctor_id = $1',
        [doctorId]
    );
  
    if (existingDoctor.rows.length === 0) {
        return res.status(400).json({ message: 'There Is No Doctor Registered With This Id' });
    }

    // Get the doctor's available slots
    const slots = await pool.query(
      'SELECT * FROM slots WHERE doctor_id = $1',
      [doctorId]
    );

    res.json({ slots: slots.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { patient_id, slot_id } = req.body;

    const availableReservations = await pool.query(
      'SELECT * FROM slots WHERE id = $1',
      [slot_id]
    );

    if (availableReservations.rows.length === 0) {
      return res.status(400).json({ message: 'There Is No Slot With This ID' });
    }

    const slot = availableReservations.rows[0];
    if (slot.reservations_num <= 0) {
      return res.status(400).json({ message: 'No Available Reservations For This Slot' });
    }

    const existingAppointment = await pool.query(
      'SELECT * FROM appointments WHERE patient_id = $1 AND slot_id = $2',
      [patient_id, slot_id]
    );

    if (existingAppointment.rows.length > 0) {
      return res.status(400).json({ message: 'Appointment Is Already Reserved' });
    }

    // Reserve the appointment and update the available reservations
    await pool.query(
      'UPDATE slots SET reservations_num = reservations_num - 1 WHERE id = $1',
      [slot_id]
    );
    await pool.query(
      'INSERT INTO appointments (patient_id, slot_id) VALUES ($1, $2)',
      [patient_id, slot_id]
    );

    // Retrieve all reservations for the patient with the doctor's name, slot details, date, start_time, and end_time
    const patientReservations = await pool.query(
      `SELECT appointments.id AS appointment_id, slots.id AS slot_id, users.name AS doctor_name, slots.date, slots.start_time, slots.end_time
      FROM appointments
      INNER JOIN slots ON appointments.slot_id = slots.id
      INNER JOIN doctors ON slots.doctor_id = doctors.id
      INNER JOIN users ON doctors.doctor_id = users.id
      WHERE appointments.patient_id = $1`,
      [patient_id]
    );

    res.json({ reservations: patientReservations.rows });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { patient_id , slot_id, updated_slot_id } = req.body;

    const existingReservation = await pool.query(
      'SELECT * FROM appointments WHERE patient_id = $1 AND slot_id = $2',
      [patient_id, slot_id]
    ); 

    if (existingReservation.rows.length > 0) {
      
      const availableReservations = await pool.query(
        'SELECT * FROM slots WHERE id = $1',
        [updated_slot_id]
      );
      
      if (availableReservations.rows[0].reservations_num > 0) {
        
        // Check if the appointment is already reserved
        const existingAppointment = await pool.query(
            'SELECT * FROM appointments WHERE patient_id = $1 AND slot_id = $2',
            [patient_id, updated_slot_id]
        );
  
        if (existingAppointment.rows.length > 0) {
            return res.status(400).json({ message: 'Appointment Is Already Reserved' });
        }

        await pool.query(
            'UPDATE slots SET reservations_num = reservations_num + 1 WHERE id = $1',
            [slot_id]
        );

        await pool.query(
          'UPDATE slots SET reservations_num = reservations_num - 1 WHERE id = $1',
          [updated_slot_id]
        );
        await pool.query(
            'UPDATE appointments SET slot_id = $1 WHERE patient_id = $2 AND slot_id = $3',
            [updated_slot_id, patient_id, slot_id]
        );
        
        res.json({ message: 'Appointment Updated Successfully' });
      } else {
        res.status(400).json({ message: 'The Number of Available Reservations of This Slot Is Out' });
      } 
    } else {
      res.status(400).json({ message: "You Don't Have Any Reservations With This Slot Id" });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { patient_id, slot_id } = req.body;

    const existingReservation = await pool.query(
      'SELECT * FROM appointments WHERE patient_id = $1 AND slot_id = $2',
      [patient_id, slot_id]
    ); 

    if (existingReservation.rows.length > 0) {
      
      await pool.query(
        'UPDATE slots SET reservations_num = reservations_num + 1 WHERE id = $1',
        [slot_id]
      );
      await pool.query(
        'DELETE FROM appointments WHERE patient_id = $1 AND slot_id = $2',
        [patient_id, slot_id]
      );

      res.json({ message: 'Appointment canceled successfully' });
      
    } else {
      res.status(400).json({ message: "You Don't Have Any Reservations With This Slot Id" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPatientReservations = async (req, res) => {
  try {
    const patientId = req.params.id;

    // Get the patient's reservations
    const reservations = await pool.query(
      `SELECT appointments.id AS appointment_id, slots.id AS slot_id, users.name AS doctor_name, slots.date, slots.start_time, slots.end_time
      FROM appointments
      LEFT JOIN slots ON appointments.slot_id = slots.id
      LEFT JOIN doctors ON slots.doctor_id = doctors.doctor_id
      LEFT JOIN users ON doctors.doctor_id = users.id
      WHERE appointments.patient_id = $1`,
      [patientId]
    );

    res.json({ reservations: reservations.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
