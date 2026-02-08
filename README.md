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

### Estructura de datos (POST) – campos en inglés

```json
{
  "name": "Juan Pérez",
  "professionalTitle": "Dr. Juan Pérez",
  "specialty": "Cardiology",
  "profileImageUrl": "https://storage.example.com/foto-perfil.jpg",
  "biography": "Médico con amplia experiencia en cardiología...",
  "yearsOfExperience": 15,
  "consultationPrice": 500,
  "languages": ["Español", "English"],
  "location": {
    "city": "Ciudad de México",
    "state": "CDMX"
  },
  "licenseNumber": "12345678",
  "licenseDocumentUrl": "https://storage.example.com/cedula.pdf",
  "degreeDocumentUrl": "https://storage.example.com/titulo.pdf",
  "status": "Under Review",
  "nearProtocolAccount": "juan.near",
  "accountIdentifier": "abc123xyz"
}
```

Optional fields: `professionalTitle`, `profileImageUrl`, `biography`, `yearsOfExperience`, `consultationPrice`, `languages`. Specialty examples: Cardiology, Dermatology, etc.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/specialists` | Registrar nuevo especialista |
| GET | `/api/specialists` | Listar todos (filtros: `?status=Verificado&specialty=Cardiology&city=CDMX`) |
| GET | `/api/specialists/identifier/:identifier` | Find by account identifier |
| GET | `/api/specialists/by-document-id/:id` | Get by MongoDB document _id |
| GET | `/api/specialists/:id` | Get by privyWallet |
| PATCH | `/api/specialists/:id/status` | Update status (body: `{ "status": "Verified" }`) |
| PUT | `/api/specialists/:id` | Update specialist (by privyWallet) |
| DELETE | `/api/specialists/:id` | Delete specialist |

### Status values

- `Under Review`
- `Verified`
