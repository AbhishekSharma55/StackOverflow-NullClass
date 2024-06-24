// routes/questions.js
const express = require("express");
const Question = require("../models/Question.js");
const UserLog = require("../models/UserLog.js");
const useragent = require("user-agent-parser");
const Answer = require("../models/Answer.js");
const User = require("../models/User.js");
const auth = require("../middleware/auth.js"); // Assuming you have an auth middleware
const { check, validationResult } = require("express-validator");
const router = express.Router();
const { detect } = require("detect-browser");
const browser = detect();

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
        questionBody: questionBody,
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

router.delete("/questions/:id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.json({ err: "Question not found" });
    }

    const user = await User.findById(req.user.id);
    if (question.userPosted.toString() !== user.username.toString()) {
      return res.json({ err: "You are not the questioner" });
    }
    await Question.findByIdAndDelete(req.params.id);
    res.json({ msg: "Question removed" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Downvote a question
router.post("/questions/:id/downvote", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const userId = req.user.id;

    if (!question) {
      return res.json({ err: "Question not found" });
    }

    if (question.downvotes.includes(userId)) {
      return res.json({ err: "User already downvoted this question" });
    }

    question.upvotes.pull(userId);
    question.downvotes.push(userId);
    await question.save();

    res.json({ question: question, msg: "Downvoted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Upvote a question
router.post("/questions/:id/upvote", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const userId = req.user.id;

    if (!question) {
      return res.json({ err: "Question not found" });
    }

    if (question.upvotes.includes(userId)) {
      return res.json({ err: "User already upvoted this question" });
    }

    question.downvotes.pull(userId);
    question.upvotes.push(userId);
    await question.save();

    res.json({ question: question, msg: "Upvoted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Route to submit an answer
router.post(
  "/questions/:id/answer",
  [
    auth, // Protect this route with authentication
    [check("answer", "Answer is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const userName = user.username;

      const question = await Question.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { noOfAnswers: 1 },
        },
        { new: true }
      );

      const answer = await Answer.create({
        question: req.params.id,
        answer: req.body.answer,
        userPosted: userName,
      });
      res.json({
        question: question,
        msg: "Answer posted successfully",
        answers: answer,
      });
    } catch (error) {
      console.error("catched error ", error);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/questions/:id/answers/:answerId", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) {
      return res.json({ err: "Answer not found" });
    }

    const user = await User.findById(req.user.id);
    if (answer.userPosted.toString() !== user.username.toString()) {
      return res.json({ err: "You are not the answerer" });
    }
    await Answer.findByIdAndDelete(req.params.answerId);
    await Question.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { noOfAnswers: -1 },
      },
      { new: true }
    );
    res.json({ msg: "Answer removed" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get answers for a question
router.get("/questions/:id/answers", async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.id });
    res.json(answers);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ err: "Error Fetching User" });
  }
});

router.put("/user/update", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    console.log("errors", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id);

    if (user) {
      user.username = req.body.userName;
      user.email = req.body.email;
      await user.save();
      res.json({ msg: "User updated successfully" });
    } else {
      res.json({ err: "User not found" });
    }
  } catch (err) {
    res.json({ err: "Failed to update" });
  }
});

router.get("/user/loginactivity", auth, async (req, res) => {
  try {
    const logs = await UserLog.find({ user: req.user.id });
    if (!logs) {
      return res.json({ err: "No logs found" });
    }
    res.json({ logs: logs });
  } catch (err) {
    console.error({ err });
    res.json({ err: "Error Fetching Log Activity" });
  }
});

// router.get("/sendsms",async (req,res)=>{
//     const { email, password, phone } = req.body;
//   const user = {
//     email,
//     password,
//     phone
//   };

//   userDatabase.push(user);

//   res.status(201).send({
//     message: 'Account created successfully, kindly check your phone to activate your account!',
//     data: user
//   })
// });

router.get("/testing", async (req, res) => {
  return res.json({ msg: navigator.userAgent });
});

module.exports = router;
