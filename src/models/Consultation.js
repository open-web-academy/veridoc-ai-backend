const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patientAccount: {
        type: String,
        required: true,
        trim: true
    },
    specialistAccount: {
        type: String,
        required: true,
        trim: true
    },
    specialistName: {
        type: String,
        required: true,
        trim: true
    },
    documentUrl: {
        type: String,
        required: true,
        trim: true
    },
    analysisCommentsAI: {
        type: String,
        trim: true,
        default: ''
    },
    analysisCommentsSpecialist: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'attended'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);
