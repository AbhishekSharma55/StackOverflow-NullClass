// routes/questions.js
const express = require("express");
const Question = require("../models/Question.js");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js"); // Assuming you have an auth middleware
const { check, validationResult } = require("express-validator");
const router = express.Router();

// Route to submit a question
router.post(
  "/postquestion",
  [
    auth, // Protect this route with authentication
    [
      check("title", "Title is required").not().isEmpty(),
      check("questionBody", "Question body is required").not().isEmpty(),
      check("questionTags", "Tags are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, questionBody, questionTags } = req.body;

    const user = await User.findById(req.user.id);
    const userName = user.username;
    try {
      const newQuestion = new Question({
        question: title,
        questionBody : questionBody,
        questionTags: questionTags.split(",").map((tag) => tag.trim()), // Split and trim tags
        userPosted: userName, // User ID from the auth middleware
        noOfAnswers: 0,
        askedOn: new Date().toISOString(),
      });
      const question = await newQuestion.save();
      res.json(question);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Other routes
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/totalquestions", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    res.json(count);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).send("Question not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Downvote a question
router.post('/questions/:id/downvote', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const userId = req.user.id;

    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    if (question.downvotes.includes(userId)) {
      return res.status(400).json({ msg: 'User already downvoted this question' });
    }

    question.upvotes.pull(userId);
    question.downvotes.push(userId);
    await question.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Upvote a question
router.post('/questions/:id/upvote', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    console.log(req.body);
    const userId = req.user.id;


    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    if (question.upvotes.includes(userId)) {
      return res.status(400).json({ msg: 'User already upvoted this question' });
    }

    question.downvotes.pull(userId);
    question.upvotes.push(userId);
    await question.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
