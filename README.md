# Veridoc AI - Backend API

Backend en Express y Node.js con MongoDB Atlas para la gestión de cuentas de especialistas.

## Requisitos

- Node.js 18+
- MongoDB Atlas (cuenta configurada)

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya contiene la cadena de conexión a MongoDB Atlas. Las variables disponibles:

- `MONGODB_URI` - Cadena de conexión a MongoDB Atlas
- `PORT` - Puerto del servidor (default: 3000)

## Ejecutar

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

## API - Especialistas

Base URL: `http://localhost:3000/api/specialists`

### Estructura de datos (POST)

```json
{
  "nombre": "Dr. Juan Pérez",
  "especialidad": "Medicina General",
  "ubicacion": {
    "ciudad": "Ciudad de México",
    "estado": "CDMX"
  },
  "numeroCedula": "12345678",
  "enlaceCedula": "https://storage.example.com/cedula.pdf",
  "enlaceTitulo": "https://storage.example.com/titulo.pdf",
  "estatus": "En Verificación",
  "cuentaNearProtocol": "juan.near",
  "identificadorCuenta": "abc123xyz"
}
```

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/specialists` | Registrar nuevo especialista |
| GET | `/api/specialists` | Listar todos (filtros: `?estatus=Verificado&especialidad=Medicina&ciudad=CDMX`) |
| GET | `/api/specialists/identificador/:identificador` | Buscar por identificador de cuenta |
| GET | `/api/specialists/:id` | Obtener por ID de MongoDB |
| PATCH | `/api/specialists/:id/estatus` | Actualizar estatus (body: `{ "estatus": "Verificado" }`) |
| PUT | `/api/specialists/:id` | Actualizar especialista completo |
| DELETE | `/api/specialists/:id` | Eliminar especialista |

### Valores de estatus

- `En Verificación`
- `Verificado`
