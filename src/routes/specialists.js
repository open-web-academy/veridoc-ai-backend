const express = require('express');
const router = express.Router();
const {
  createSpecialist,
  getAllSpecialists,
  getSpecialistById,
  getSpecialistByMongoId,
  getSpecialistByIdentificador,
  updateStatus,
  updateSpecialist,
  deleteSpecialist
} = require('../controllers/specialistController');

// POST - Create specialist
router.post('/', createSpecialist);

// GET - List all specialists (query: ?status=Verified&specialty=Cardiology&city=CDMX)
router.get('/', getAllSpecialists);

// GET - Find by account identifier
router.get('/identifier/:identifier', getSpecialistByIdentificador);

// GET - Get specialist by MongoDB document _id
router.get('/by-document-id/:id', getSpecialistByMongoId);

// GET - Get specialist by privyWallet
router.get('/:id', getSpecialistById);

// PATCH - Update status only
router.patch('/:id/status', updateStatus);

// PUT - Update specialist
router.put('/:id', updateSpecialist);

// DELETE - Delete specialist
router.delete('/:id', deleteSpecialist);

module.exports = router;
