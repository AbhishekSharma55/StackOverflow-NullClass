const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: String, required: true },
  userPosted: { type: String, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  answeredOn: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
