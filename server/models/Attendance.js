// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ipAddress: String,
  isApproved: Boolean,
  attendanceMarked: Boolean,
  fingerprintData: String, // fingerprint data (hashed or reference ID)
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
