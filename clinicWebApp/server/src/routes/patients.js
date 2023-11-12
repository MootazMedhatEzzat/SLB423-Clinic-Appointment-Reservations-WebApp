// server/src/routes/patients.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Patient routes
router.get('/patients/:id/getslots', patientController.getDoctorSlots);
router.post('/patients/bookappointment', patientController.bookAppointment);
router.put('/patients/updateappointment', patientController.updateAppointment);
router.delete('/patients/cancelappointment', patientController.cancelAppointment);
router.get('/patients/:id/reservations', patientController.getPatientReservations);

module.exports = router;