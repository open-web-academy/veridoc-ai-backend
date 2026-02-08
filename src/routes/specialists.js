const express = require('express');
const router = express.Router();
const {
  createSpecialist,
  getAllSpecialists,
  getSpecialistById,
  getSpecialistByIdentificador,
  updateStatus,
  updateSpecialist,
  deleteSpecialist
} = require('../controllers/specialistController');

// POST - Registrar nuevo especialista
router.post('/', createSpecialist);

// GET - Listar todos los especialistas (query: ?estatus=Verificado&especialidad=Medicina&ciudad=CDMX)
router.get('/', getAllSpecialists);

// GET - Buscar por identificador de cuenta
router.get('/identificador/:identificador', getSpecialistByIdentificador);

// GET - Obtener especialista por ID
router.get('/:id', getSpecialistById);

// PATCH - Actualizar solo el estatus
router.patch('/:id/estatus', updateStatus);

// PUT - Actualizar especialista completo
router.put('/:id', updateSpecialist);

// DELETE - Eliminar especialista
router.delete('/:id', deleteSpecialist);

module.exports = router;
