const mongoose = require('mongoose');

// Emergency Report Schema
const reportSchema = new mongoose.Schema({
  name: String,
  email: String,
  incident: String,
  details: String,
  location: String,
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  phone: String,
}, { timestamps: true });

// Recording Schema (optional if you want to save recording metadata)
const recordingSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  url: String,
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Recording = mongoose.model('Recording', recordingSchema);

module.exports = { Report, Contact, Recording };
