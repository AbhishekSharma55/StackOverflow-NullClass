var $hXvsm$express = require("express");
var $hXvsm$bcryptjs = require("bcryptjs");
var $hXvsm$jsonwebtoken = require("jsonwebtoken");
var $hXvsm$dotenv = require("dotenv");
var $hXvsm$mongoose = require("mongoose");
var $hXvsm$expressvalidator = require("express-validator");
var $hXvsm$cors = require("cors");
var $hXvsm$cookieparser = require("cookie-parser");
var $hXvsm$process = require("process");


      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9763"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9763"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("epZHA", function(module, exports) {




var $5HTly = parcelRequire("5HTly");

var $frFFI = parcelRequire("frFFI");
const $a7f3433243898403$var$router = $hXvsm$express.Router();

$hXvsm$dotenv.config();
// JWT Secret
const $a7f3433243898403$var$jwtSecret = "AbhishekJWTSecretKey";
// Signup
$a7f3433243898403$var$router.post("/signup", async (req, res)=>{
    const { username: username, email: email, password: password } = req.body;
    try {
        let user = await $5HTly.findOne({
            email: email
        });
        if (user) return res.status(400).json({
            msg: "User already exists"
        });
        user = new $5HTly({
            username: username,
            email: email,
            password: password
        });
        const salt = await $hXvsm$bcryptjs.genSalt(10);
        user.password = await $hXvsm$bcryptjs.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = await $hXvsm$jsonwebtoken.sign(payload, $a7f3433243898403$var$jwtSecret, {
            expiresIn: 3600
        });
        res.json({
            token: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
// Login
$a7f3433243898403$var$router.post("/login", async (req, res)=>{
    const { email: email, password: password } = req.body;
    try {
        const user = await $5HTly.findOne({
            email: email
        });
        if (!user) return res.status(400).json({
            msg: "Invalid Credentials"
        });
        const isMatch = await $hXvsm$bcryptjs.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            msg: "Invalid Credentials"
        });
        const payload = {
            user: {
                id: user.id
            }
        };
        $hXvsm$jsonwebtoken.sign(payload, $a7f3433243898403$var$jwtSecret, {
            expiresIn: 3600
        }, (err, token)=>{
            if (err) throw err;
            res.json({
                token: token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
$a7f3433243898403$var$router.get("/current", $frFFI, async (req, res)=>{
    try {
        const token = req.header("Authorization").split(" ")[1];
        const decoded = $hXvsm$jsonwebtoken.verify(token, $a7f3433243898403$var$jwtSecret);
        const user = await $5HTly.findById(decoded.user.id);
        if (!user) return res.json({
            error: "User not found"
        });
        res.json({
            user: user,
            message: "User found"
        });
    } catch (error) {
        res.json({
            error: "Unauthorized"
        });
    }
});
module.exports = $a7f3433243898403$var$router;

});
parcelRegister("5HTly", function(module, exports) {

const $427be69b332eaca5$var$UserSchema = new $hXvsm$mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const $427be69b332eaca5$var$User = $hXvsm$mongoose.model("User", $427be69b332eaca5$var$UserSchema);
module.exports = $427be69b332eaca5$var$User;

});

parcelRegister("frFFI", function(module, exports) {


$hXvsm$dotenv.config();
const $b3e9b3c691206aba$var$jwtSecret = "AbhishekJWTSecretKey";
module.exports = function(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({
        msg: "No token, authorization denied"
    });
    // Check if the token starts with 'Bearer ' before splitting
    if (!token.startsWith("Bearer ")) return res.status(401).json({
        msg: "Invalid token format"
    });
    try {
        // Split the token and extract the second part
        const tokenParts = token.split(" ");
        const tokenValue = tokenParts[1];
        const decoded = $hXvsm$jsonwebtoken.verify(tokenValue, $b3e9b3c691206aba$var$jwtSecret);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: "Token is not valid"
        });
    }
};

});


parcelRegister("fzWKa", function(module, exports) {
// routes/questions.js


var $e1iwP = parcelRequire("e1iwP");

var $c2qX3 = parcelRequire("c2qX3");

var $5HTly = parcelRequire("5HTly");

var $frFFI = parcelRequire("frFFI");

var $b577b1268a02e755$require$check = $hXvsm$expressvalidator.check;
var $b577b1268a02e755$require$validationResult = $hXvsm$expressvalidator.validationResult;
const $b577b1268a02e755$var$router = $hXvsm$express.Router();
// Route to submit a question
$b577b1268a02e755$var$router.post("/postquestion", [
    $frFFI,
    [
        $b577b1268a02e755$require$check("title", "Title is required").not().isEmpty(),
        $b577b1268a02e755$require$check("questionBody", "Question body is required").not().isEmpty(),
        $b577b1268a02e755$require$check("questionTags", "Tags are required").not().isEmpty()
    ]
], async (req, res)=>{
    const errors = $b577b1268a02e755$require$validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors: errors.array()
    });
    const { title: title, questionBody: questionBody, questionTags: questionTags } = req.body;
    const user = await $5HTly.findById(req.user.id);
    const userName = user.username;
    try {
        const newQuestion = new $e1iwP({
            question: title,
            questionBody: questionBody,
            questionTags: questionTags.split(",").map((tag)=>tag.trim()),
            userPosted: userName,
            noOfAnswers: 0,
            askedOn: new Date().toISOString()
        });
        const question = await newQuestion.save();
        res.json(question);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// Other routes
$b577b1268a02e755$var$router.get("/questions", async (req, res)=>{
    try {
        const questions = await $e1iwP.find();
        res.json(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});
$b577b1268a02e755$var$router.get("/totalquestions", async (req, res)=>{
    try {
        const count = await $e1iwP.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).send(err);
    }
});
$b577b1268a02e755$var$router.get("/questions/:id", async (req, res)=>{
    try {
        const question = await $e1iwP.findById(req.params.id);
        if (question) res.json(question);
        else res.status(404).send("Question not found");
    } catch (err) {
        res.status(500).send(err);
    }
});
$b577b1268a02e755$var$router.delete("/questions/:id", $frFFI, async (req, res)=>{
    try {
        const question = await $e1iwP.findById(req.params.id);
        if (!question) return res.json({
            err: "Question not found"
        });
        const user = await $5HTly.findById(req.user.id);
        if (question.userPosted.toString() !== user.username.toString()) return res.json({
            err: "You are not the questioner"
        });
        await $e1iwP.findByIdAndDelete(req.params.id);
        res.json({
            msg: "Question removed"
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// Downvote a question
$b577b1268a02e755$var$router.post("/questions/:id/downvote", $frFFI, async (req, res)=>{
    try {
        const question = await $e1iwP.findById(req.params.id);
        const userId = req.user.id;
        if (!question) return res.json({
            err: "Question not found"
        });
        if (question.downvotes.includes(userId)) return res.json({
            err: "User already downvoted this question"
        });
        question.upvotes.pull(userId);
        question.downvotes.push(userId);
        await question.save();
        res.json({
            question: question,
            msg: "Downvoted successfully"
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});
// Upvote a question
$b577b1268a02e755$var$router.post("/questions/:id/upvote", $frFFI, async (req, res)=>{
    try {
        const question = await $e1iwP.findById(req.params.id);
        const userId = req.user.id;
        if (!question) return res.json({
            err: "Question not found"
        });
        if (question.upvotes.includes(userId)) return res.json({
            err: "User already upvoted this question"
        });
        question.downvotes.pull(userId);
        question.upvotes.push(userId);
        await question.save();
        res.json({
            question: question,
            msg: "Upvoted successfully"
        });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});
// Route to submit an answer
$b577b1268a02e755$var$router.post("/questions/:id/answer", [
    $frFFI,
    [
        $b577b1268a02e755$require$check("answer", "Answer is required").not().isEmpty()
    ]
], async (req, res)=>{
    const errors = $b577b1268a02e755$require$validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        errors: errors.array()
    });
    try {
        const user = await $5HTly.findById(req.user.id);
        const userName = user.username;
        const question = await $e1iwP.findByIdAndUpdate(req.params.id, {
            $inc: {
                noOfAnswers: 1
            }
        }, {
            new: true
        });
        const answer = await $c2qX3.create({
            question: req.params.id,
            answer: req.body.answer,
            userPosted: userName
        });
        res.json({
            question: question,
            msg: "Answer posted successfully",
            answers: answer
        });
    } catch (error) {
        console.error("catched error ", error);
        res.status(500).send("Server Error");
    }
});
$b577b1268a02e755$var$router.delete("/questions/:id/answers/:answerId", $frFFI, async (req, res)=>{
    try {
        const answer = await $c2qX3.findById(req.params.answerId);
        if (!answer) return res.json({
            err: "Answer not found"
        });
        const user = await $5HTly.findById(req.user.id);
        if (answer.userPosted.toString() !== user.username.toString()) return res.json({
            err: "You are not the answerer"
        });
        await $c2qX3.findByIdAndDelete(req.params.answerId);
        await $e1iwP.findByIdAndUpdate(req.params.id, {
            $inc: {
                noOfAnswers: -1
            }
        }, {
            new: true
        });
        res.json({
            msg: "Answer removed"
        });
    } catch (err) {
        res.status(500).send(err);
    }
});
// Route to get answers for a question
$b577b1268a02e755$var$router.get("/questions/:id/answers", async (req, res)=>{
    try {
        const answers = await $c2qX3.find({
            question: req.params.id
        });
        res.json(answers);
    } catch (err) {
        res.status(500).send(err);
    }
});
$b577b1268a02e755$var$router.get("/users", async (req, res)=>{
    try {
        const users = await $5HTly.find();
        res.json(users);
    } catch (err) {
        res.json({
            err: "Error Fetching Message"
        });
    }
});
$b577b1268a02e755$var$router.get("/user/:id", async (req, res)=>{
    try {
        const user = await $5HTly.findById(req.params.id);
        if (user) res.json({
            email: user.email,
            username: user.username
        });
        else res.json({
            err: "User not found"
        });
    } catch (err) {
        res.json({
            err: "Error Fetching Message"
        });
    }
});
$b577b1268a02e755$var$router.put("/user/update", $frFFI, async (req, res)=>{
    try {
        console.log("req.body", req.body);
        const errors = $b577b1268a02e755$require$validationResult(req);
        console.log("errors", errors);
        if (!errors.isEmpty()) return res.status(400).json({
            errors: errors.array()
        });
        const user = await $5HTly.findById(req.user.id);
        if (user) {
            user.username = req.body.userName;
            user.email = req.body.email;
            await user.save();
            res.json({
                msg: "User updated successfully"
            });
        } else res.json({
            err: "User not found"
        });
    } catch (err) {
        res.json({
            err: "Error Fetching Message"
        });
    }
});
module.exports = $b577b1268a02e755$var$router;

});
parcelRegister("e1iwP", function(module, exports) {

const $a34f88087acfa1ae$var$QuestionsSchema = new $hXvsm$mongoose.Schema({
    upvotes: [
        {
            type: $hXvsm$mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    downvotes: [
        {
            type: $hXvsm$mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    question: {
        type: String,
        required: true
    },
    questionBody: {
        type: String,
        required: true
    },
    questionTags: [
        String
    ],
    userPosted: {
        type: String,
        required: true
    },
    noOfAnswers: {
        type: Number,
        default: 0
    },
    askedOn: {
        type: Date,
        default: Date.now
    }
});
const $a34f88087acfa1ae$var$Question = $hXvsm$mongoose.model("Question", $a34f88087acfa1ae$var$QuestionsSchema);
module.exports = $a34f88087acfa1ae$var$Question;

});

parcelRegister("c2qX3", function(module, exports) {

const $8c3a93f27a3f898c$var$AnswerSchema = new $hXvsm$mongoose.Schema({
    question: {
        type: $hXvsm$mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answer: {
        type: String,
        required: true
    },
    userPosted: {
        type: String,
        required: true
    },
    upvotes: [
        {
            type: $hXvsm$mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    downvotes: [
        {
            type: $hXvsm$mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    answeredOn: {
        type: Date,
        default: Date.now
    }
});
const $8c3a93f27a3f898c$var$Answer = $hXvsm$mongoose.model("Answer", $8c3a93f27a3f898c$var$AnswerSchema);
module.exports = $8c3a93f27a3f898c$var$Answer;

});




var $f49e8db61c1611be$exports = {};



$hXvsm$dotenv.config();
const $f49e8db61c1611be$var$connectDB = async ()=>{
    try {
        await $hXvsm$mongoose.connect("mongodb://localhost:27017/StackOverFlow", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err.message);
        $hXvsm$process.exit(1);
    }
};
$f49e8db61c1611be$exports = $f49e8db61c1611be$var$connectDB;




// Load environment variables from .env file
$hXvsm$dotenv.config();
const $2685e5b20c9f29f6$var$app = $hXvsm$express();
const $2685e5b20c9f29f6$var$port = 4000;
const $2685e5b20c9f29f6$var$clientUrl = "http://localhost:3000";
// Connect to MongoDB
$f49e8db61c1611be$exports();
// Middleware
$2685e5b20c9f29f6$var$app.use($hXvsm$express.json());
$2685e5b20c9f29f6$var$app.use($hXvsm$cookieparser());
$2685e5b20c9f29f6$var$app.use($hXvsm$cors({
    origin: $2685e5b20c9f29f6$var$clientUrl,
    credentials: true
}));

// Routes
$2685e5b20c9f29f6$var$app.use("/api/auth", (parcelRequire("epZHA")));

$2685e5b20c9f29f6$var$app.use("/api", (parcelRequire("fzWKa")));
$2685e5b20c9f29f6$var$app.listen($2685e5b20c9f29f6$var$port, ()=>{
    console.log(`Server running at http://localhost:${$2685e5b20c9f29f6$var$port}`);
});


//# sourceMappingURL=index.js.map
