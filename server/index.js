import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Donation from './models/Donation.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'UniSHIFT API Server',
    version: '2.0.0',
    endpoints: {
      'POST /api/questions': 'Submit a new question',
      'GET /api/questions': 'Get all enquiries (admin)',
      'GET /api/questions/stats': 'Get enquiry statistics',
      'GET /api/donations': 'Get all donations',
      'POST /api/donations': 'Add a new donation',
      'GET /api/donations/total': 'Get total donation amount',
      'GET /api/health': 'Health check'
    }
  });
});

// POST endpoint to submit a question
app.post('/api/questions', async (req, res) => {
  try {
    const { email, question } = req.body;

    // Validate input
    if (!email || !question) {
      return res.status(400).json({
        success: false,
        message: 'Email and question are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create new enquiry
    const newEnquiry = new Enquiry({
      email: email.trim(),
      question: question.trim(),
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
    });

    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: 'Your question has been submitted successfully! We\'ll get back to you within 24 hours.',
      enquiryId: savedEnquiry._id
    });

  } catch (error) {
    console.error('Error submitting question:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your question. Please try again.'
    });
  }
});

// GET endpoint to retrieve all enquiries (for admin purposes)
app.get('/api/questions', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      enquiries
    });
  } catch (error) {
    console.error('Error retrieving enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries'
    });
  }
});

// GET endpoint to get enquiry statistics
app.get('/api/questions/stats', async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    const newCount = await Enquiry.countDocuments({ status: 'new' });
    const responded = await Enquiry.countDocuments({ status: 'responded' });
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = await Enquiry.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    const stats = {
      total,
      new: newCount,
      responded,
      thisMonth
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get statistics'
    });
  }
});

// GET endpoint to retrieve all donations
app.get('/api/donations', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const donations = await Donation.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Donation.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      donations,
      pagination: {
        currentPage: page,
        totalPages,
        totalDonations: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error retrieving donations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve donations'
    });
  }
});

// POST endpoint to add a new donation
app.post('/api/donations', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid donation amount is required'
      });
    }

    const newDonation = new Donation({
      amount: parseFloat(amount)
    });

    const savedDonation = await newDonation.save();

    res.status(201).json({
      success: true,
      message: 'Donation added successfully',
      donation: savedDonation
    });

  } catch (error) {
    console.error('Error adding donation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add donation'
    });
  }
});

// GET endpoint to get total donation amount
app.get('/api/donations/total', async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    res.json({
      success: true,
      total: parseFloat(total.toFixed(2))
    });
  } catch (error) {
    console.error('Error getting total donations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get total donations'
    });
  }
});

// PUT endpoint to update enquiry status and response
app.put('/api/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status, response },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry: updatedEnquiry
    });

  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enquiry'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: [
      'GET /',
      'POST /api/questions',
      'GET /api/questions',
      'GET /api/questions/stats',
      'GET /api/donations',
      'POST /api/donations',
      'GET /api/donations/total',
      'PUT /api/questions/:id',
      'GET /api/health'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}`);
});