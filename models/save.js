const mongoose = require("mongoose")

var saveSchema = new mongoose.Schema({
  name: String,
  safetyScore: Number,
  headerImage: String,
  events: Array,
  customActivities: Array,
  washEntries: Array,
  code: String,
  lastDay: Number
});
module.exports = mongoose.model('Save', saveSchema );
  