const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  professionalTitle: {
    type: String,
    trim: true,
    default: ''
  },
  specialty: {
    type: String,
    trim: true,
    default: ''
  },
  profileImageUrl: {
    type: String,
    trim: true,
    default: ''
  },
  biography: {
    type: String,
    trim: true,
    default: ''
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  consultationPrice: {
    type: Number,
    min: 0,
    default: 0
  },
  languages: {
    type: [String],
    default: []
  },
  licenseDocumentUrl: {
    type: String,
    trim: true,
    default: ''
  },
  degreeDocumentUrl: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['Under Review', 'Verified'],
    default: 'Under Review'
  },
  nearAddress: {
    type: String,
    trim: true,
    default: ''
  },
  privyWallet: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});

// Only allow "Verified" when both document URLs are present and non-empty
specialistSchema.pre('save', function (next) {
  const hasLicense = this.licenseDocumentUrl && String(this.licenseDocumentUrl).trim() !== '';
  const hasDegree = this.degreeDocumentUrl && String(this.degreeDocumentUrl).trim() !== '';
  if (!hasLicense || !hasDegree) {
    this.status = 'Under Review';
  }
  next();
});

module.exports = mongoose.model('Specialist', specialistSchema);
