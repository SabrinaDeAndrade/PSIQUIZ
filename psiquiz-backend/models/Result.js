const mongoose = require('mongoose');
const ResultSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  total: Number,
  date_taken: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Result', ResultSchema);
