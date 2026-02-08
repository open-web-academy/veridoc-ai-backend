const Specialist = require('../models/Specialist');

const isValidMongoId = (id) => typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);

// POST - Create new specialist
const createSpecialist = async (req, res) => {
  try {
    const specialist = await Specialist.create(req.body);
    res.status(201).json({
      success: true,
      data: specialist,
      message: 'Specialist registered successfully'
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
      message: 'Error registering specialist',
      error: error.message
    });
  }
};

// GET - List all specialists (with optional filters)
const getAllSpecialists = async (req, res) => {
  try {
    const { status, specialty, city } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (specialty) filter.specialty = new RegExp(specialty, 'i');
    if (city) filter['location.city'] = new RegExp(city, 'i');

    const specialists = await Specialist.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: specialists.length,
      data: specialists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching specialists',
      error: error.message
    });
  }
};

// GET - Get specialist by MongoDB document _id
const getSpecialistByMongoId = async (req, res) => {
  try {
    const specialist = await Specialist.findById(req.params.id);

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
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
        message: 'Invalid document ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error fetching specialist',
      error: error.message
    });
  }
};

// GET - Get specialist by privyWallet (param :id is the privyWallet value)
const getSpecialistById = async (req, res) => {
  try {
    const specialist = await Specialist.findOne({ privyWallet: req.params.id });

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching specialist',
      error: error.message
    });
  }
};

// GET - Get specialist by identifier (MongoDB _id, privyWallet, or accountIdentifier)
const getSpecialistByIdentificador = async (req, res) => {
  try {
    const { identifier } = req.params;
    let specialist = null;

    if (isValidMongoId(identifier)) {
      specialist = await Specialist.findById(identifier);
    }
    if (!specialist) {
      specialist = await Specialist.findOne({
        $or: [
          { privyWallet: identifier },
          { accountIdentifier: identifier }
        ]
      });
    }

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }

    res.status(200).json({
      success: true,
      data: specialist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching specialist',
      error: error.message
    });
  }
};

// Only allow "Verified" when both document URLs are present and non-empty
const resolveStatus = (licenseUrl, degreeUrl, requestedStatus) => {
  const hasLicense = licenseUrl && String(licenseUrl).trim() !== '';
  const hasDegree = degreeUrl && String(degreeUrl).trim() !== '';
  if (requestedStatus === 'Verified' && (!hasLicense || !hasDegree)) {
    return 'Under Review';
  }
  return requestedStatus;
};

// Derive status only from document URLs: both present → Verified, otherwise → Under Review
const statusFromDocumentUrls = (licenseUrl, degreeUrl) => {
  const hasLicense = licenseUrl && String(licenseUrl).trim() !== '';
  const hasDegree = degreeUrl && String(degreeUrl).trim() !== '';
  return hasLicense && hasDegree ? 'Verified' : 'Under Review';
};

// PATCH - Update specialist status
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    if (!['Under Review', 'Verified'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use: "Under Review" or "Verified"'
      });
    }

    const existing = await Specialist.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }

    const effectiveStatus = resolveStatus(
      existing.licenseDocumentUrl,
      existing.degreeDocumentUrl,
      status
    );

    const specialist = await Specialist.findByIdAndUpdate(
      req.params.id,
      { status: effectiveStatus },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: specialist,
      message: 'Status updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid specialist ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message
    });
  }
};

// PUT - Update specialist (param :id is the privyWallet value)
const updateSpecialist = async (req, res) => {
  try {
    console.log('req.params.id', req.params.id);
    const existing = await Specialist.findOne({ privyWallet: req.params.id });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }

    const body = { ...req.body };
    const licenseUrl = body.licenseDocumentUrl ?? existing.licenseDocumentUrl;
    const degreeUrl = body.degreeDocumentUrl ?? existing.degreeDocumentUrl;
    // Always set status from document URLs: both present → Verified, otherwise → Under Review
    body.status = statusFromDocumentUrls(licenseUrl, degreeUrl);

    const specialist = await Specialist.findByIdAndUpdate(
      existing._id,
      body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: specialist,
      message: 'Specialist updated successfully'
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
      message: 'Error updating specialist',
      error: error.message
    });
  }
};

// DELETE - Delete specialist
const deleteSpecialist = async (req, res) => {
  try {
    const specialist = await Specialist.findByIdAndDelete(req.params.id);

    if (!specialist) {
      return res.status(404).json({
        success: false,
        message: 'Specialist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Specialist deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid specialist ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error deleting specialist',
      error: error.message
    });
  }
};

module.exports = {
  createSpecialist,
  getAllSpecialists,
  getSpecialistById,
  getSpecialistByMongoId,
  getSpecialistByIdentificador,
  updateStatus,
  updateSpecialist,
  deleteSpecialist
};
