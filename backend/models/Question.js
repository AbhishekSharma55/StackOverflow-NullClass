const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  question: { type: String, required: true },
  questionBody: { type: String, required: true },
  questionTags: [String],
  userPosted: { type: String, required: true },
  noOfAnswers: { type: Number, default: 0 },
  askedOn: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionsSchema);

module.exports = Question;
