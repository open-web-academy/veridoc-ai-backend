const Specialist = require('../models/Specialist');

// POST - Crear nuevo especialista
const createSpecialist = async (req, res) => {
  try {
    const specialist = await Specialist.create(req.body);
    res.status(201).json({
      success: true,
      data: specialist,
      message: 'Especialista registrado correctamente'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al registrar el especialista',
      error: error.message
    });
  }
};

// GET - Listar todos los especialistas (con filtros opcionales)
const getAllSpecialists = async (req, res) => {
  try {
    const { estatus, especialidad, ciudad } = req.query;
    const filter = {};

    if (estatus) filter.estatus = estatus;
    if (especialidad) filter.especialidad = new RegExp(especialidad, 'i');
    if (ciudad) filter['ubicacion.ciudad'] = new RegExp(ciudad, 'i');

    const specialists = await Specialist.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: specialists.length,
      data: specialists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al consultar especialistas',
      error: error.message
    });
  }
};

// GET - Obtener un especialista por ID
const getSpecialistById = async (req, res) => {
  try {
    const specialist = await Specialist.findById(req.params.id);

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de especialista inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al consultar especialista',
      error: error.message
    });
  }
};

// GET - Obtener especialista por identificador de cuenta
const getSpecialistByIdentificador = async (req, res) => {
  try {
    const specialist = await Specialist.findOne({
      identificadorCuenta: req.params.identificador
    });

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al consultar especialista',
      error: error.message
    });
  }
};

// PATCH - Actualizar estatus del especialista
const updateStatus = async (req, res) => {
  try {
    const { estatus } = req.body;

    if (!estatus) {
      return res.status(400).json({
        success: false,
        message: 'El estatus es requerido'
      });
    }

    if (!['En Verificación', 'Verificado'].includes(estatus)) {
      return res.status(400).json({
        success: false,
        message: 'Estatus inválido. Use: "En Verificación" o "Verificado"'
      });
    }

    const specialist = await Specialist.findByIdAndUpdate(
      req.params.id,
      { estatus },
      { new: true, runValidators: true }
    );

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist,
      message: 'Estatus actualizado correctamente'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de especialista inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estatus',
      error: error.message
    });
  }
};

// PUT - Actualizar especialista completo
const updateSpecialist = async (req, res) => {
  try {
    const specialist = await Specialist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist,
      message: 'Especialista actualizado correctamente'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de especialista inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar especialista',
      error: error.message
    });
  }
};

// DELETE - Eliminar especialista
const deleteSpecialist = async (req, res) => {
  try {
    const specialist = await Specialist.findByIdAndDelete(req.params.id);

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Especialista no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Especialista eliminado correctamente'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de especialista inválido'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al eliminar especialista',
      error: error.message
    });
  }
};

module.exports = {
  createSpecialist,
  getAllSpecialists,
  getSpecialistById,
  getSpecialistByIdentificador,
  updateStatus,
  updateSpecialist,
  deleteSpecialist
};
