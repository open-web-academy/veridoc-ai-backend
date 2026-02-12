const express = require('express');
const router = express.Router();
const {
    createConsultation,
    getConsultationsBySpecialist,
    getConsultationsByPatient,
    getConsultationById,
    updateConsultation
} = require('../controllers/consultationsController');

// POST - Create a new consultation request
router.post('/', createConsultation);

// GET - Get all consultations for a specialist
router.get('/specialist/:account', getConsultationsBySpecialist);

// GET - Get all consultations for a patient
router.get('/patient/:account', getConsultationsByPatient);

// GET - Get single consultation by ID
router.get('/:id', getConsultationById);

// PATCH - Update consultation (status/comments)
router.patch('/:id', updateConsultation);

module.exports = router;
