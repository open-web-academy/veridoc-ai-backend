const Consultation = require('../models/Consultation');

/**
 * @desc    Create a new consultation request
 * @route   POST /api/consultations
 */
exports.createConsultation = async (req, res) => {
    try {
        const {
            patientAccount,
            specialistAccount,
            specialistName,
            documentUrl,
            analysisCommentsAI
        } = req.body;

        if (!patientAccount || !specialistAccount || !specialistName || !documentUrl) {
            return res.status(400).json({
                success: false,
                message: 'Please provide patientAccount, specialistAccount, specialistName and documentUrl'
            });
        }

        const consultation = await Consultation.create({
            patientAccount,
            specialistAccount,
            specialistName,
            documentUrl,
            analysisCommentsAI,
            analysisCommentsSpecialist: ''
        });

        res.status(201).json({
            success: true,
            data: consultation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * @desc    Get all consultations for a specific specialist
 * @route   GET /api/consultations/specialist/:account
 */
exports.getConsultationsBySpecialist = async (req, res) => {
    try {
        const { account } = req.params;
        const consultations = await Consultation.find({ specialistAccount: account }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: consultations.length,
            data: consultations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * @desc    Get a single consultation by ID
 * @route   GET /api/consultations/:id
 */
exports.getConsultationById = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: 'Consultation not found'
            });
        }

        res.status(200).json({
            success: true,
            data: consultation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * @desc    Update consultation status and comments
 * @route   PATCH /api/consultations/:id
 */
exports.updateConsultation = async (req, res) => {
    try {
        const { status, analysisCommentsSpecialist } = req.body;

        let consultation = await Consultation.findById(req.params.id);

        if (!consultation) {
            return res.status(404).json({
                success: false,
                message: 'Consultation not found'
            });
        }

        consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            { status, analysisCommentsSpecialist },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: consultation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

/**
 * @desc    Get all consultations for a specific patient
 * @route   GET /api/consultations/patient/:account
 */
exports.getConsultationsByPatient = async (req, res) => {
    try {
        const { account } = req.params;
        const consultations = await Consultation.find({ patientAccount: account }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: consultations.length,
            data: consultations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
