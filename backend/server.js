const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 4000;

// Use cors as middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/StackOverFlow', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const QuestionsSchema = new mongoose.Schema({
  upvotes: Number,
  question: String,
  questionBody: String,
  questionTags: [String],
  userPosted: String,
  noOfAnswers: Number,
  askedOn: String
});

const questions = mongoose.model('questions', QuestionsSchema);

// Routes
app.get('/api/questions', async (req, res) => {
  try {
    const Questions = await questions.find();
    res.json(Questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/totalquestions', async (req, res) => {
  try {
    const count = await questions.countDocuments();
    res.json(count);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/questions/:id', async (req, res) => {
  try {
    const Question = await questions.findById(req.params.id);
    if (Question) {
      res.json(Question);
    } else {
      res.status(404).send('Question not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
