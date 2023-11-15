// server/src/routes/doctors.js

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor routes
router.post('/doctors/addslot', doctorController.addDoctorSlot);
router.delete('/doctors/cancelslot', doctorController.cancelDoctorSlot);
router.get('/doctors/slots/:id', doctorController.doctorSlots);

module.exports = router;
