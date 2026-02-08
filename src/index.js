require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const specialistRoutes = require('./routes/specialists');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/specialists', specialistRoutes);

// Ruta de salud
app.get('/', (req, res) => {
  res.json({
    message: 'Veridoc API - Backend funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      specialists: '/api/specialists',
      documentation: {
        'POST /api/specialists': 'Registrar nuevo especialista',
        'GET /api/specialists': 'Listar especialistas (?estatus, ?especialidad, ?ciudad)',
        'GET /api/specialists/identificador/:identificador': 'Buscar por identificador',
        'GET /api/specialists/:id': 'Obtener especialista por ID',
        'PATCH /api/specialists/:id/estatus': 'Actualizar estatus',
        'PUT /api/specialists/:id': 'Actualizar especialista',
        'DELETE /api/specialists/:id': 'Eliminar especialista'
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
