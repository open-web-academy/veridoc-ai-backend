const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  especialidad: {
    type: String,
    required: [true, 'La especialidad es requerida'],
    trim: true
  },
  ubicacion: {
    ciudad: {
      type: String,
      required: [true, 'La ciudad es requerida'],
      trim: true
    },
    estado: {
      type: String,
      required: [true, 'El estado es requerido'],
      trim: true
    }
  },
  numeroCedula: {
    type: String,
    required: [true, 'El número de cédula es requerido'],
    trim: true
  },
  enlaceCedula: {
    type: String,
    required: [true, 'El enlace de la cédula es requerido'],
    trim: true
  },
  enlaceTitulo: {
    type: String,
    required: [true, 'El enlace del título es requerido'],
    trim: true
  },
  estatus: {
    type: String,
    enum: ['En Verificación', 'Verificado'],
    default: 'En Verificación'
  },
  cuentaNearProtocol: {
    type: String,
    required: [true, 'La cuenta de Near Protocol es requerida'],
    trim: true
  },
  identificadorCuenta: {
    type: String,
    required: [true, 'El identificador de cuenta es requerido'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Specialist', specialistSchema);
