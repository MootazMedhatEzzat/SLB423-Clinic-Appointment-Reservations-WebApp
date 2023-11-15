// server/src/routes/doctors.js

const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Doctor routes
router.post('/doctors/:id/addslot', doctorController.addDoctorSlot);
router.delete('/doctors/:id/slots/:slotId/cancelslot', doctorController.cancelDoctorSlot);

module.exports = router;
