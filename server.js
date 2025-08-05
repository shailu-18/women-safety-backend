require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Report, Contact, Recording } = require('./models/womensafety');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected for Women Safety App'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

/* ----- ROUTES ----- */

// POST: Submit emergency report
app.post('/api/report', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All reports (optional, for admin view)
app.get('/api/report', async (_, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add emergency contact
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get contacts for a user
app.get('/api/contact/:email', async (req, res) => {
  try {
    const contacts = await Contact.find({ userEmail: req.params.email });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Save recording metadata (optional)
app.post('/api/recording', async (req, res) => {
  try {
    const newRec = new Recording(req.body);
    await newRec.save();
    res.status(201).json(newRec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all recordings for a user
app.get('/api/recording/:email', async (req, res) => {
  try {
    const recs = await Recording.find({ userEmail: req.params.email });
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ----- SERVER ----- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
