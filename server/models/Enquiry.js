import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'responded'],
    default: 'new'
  },
  response: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: 'unknown'
  },
  discordMessageId: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Enquiry', enquirySchema);