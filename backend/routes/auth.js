const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as necessary
const auth = require("../middleware/auth");
const UserLog = require("../models/UserLog");
const useragent = require("user-agent-parser");
const sendEmail = require("./mail");
const { detect } = require("detect-browser");
const browser = detect();
const router = express.Router();
require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

// JWT Secret
const jwtSecret = process.env.JWT_SECRET;

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = { user: { id: user.id } };
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Generate OTP and send via email
router.post("/login", async (req, res) => {
  const { email, password ,currentHour} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ err: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ err: "Invalid Credentials" });
    }

    const userAgent = useragent(req.headers["user-agent"]);
    const isMobileDevice = userAgent.os.name === "Android";

    if (isMobileDevice) {
      const startHour = 10; // 10 AM
      const endHour = 13;  // 1 PM

      if (currentHour <= startHour || currentHour >= endHour) {
        return res.json({ err: "Access is allowed on mobile devices only between 10 AM and 1 PM." });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const payload = { user: { id: user.id, otp } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 86400 });

    // Send OTP via email
    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp} and Android Status : ${isMobileDevice} current time is ${currentHour}`);

    res.json({ token, msg: "OTP sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify OTP
router.post("/verify-otp", (req, res, next) => {
  const { token, otp, browser } = req.body;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.user.otp === parseInt(otp, 10)) {
      const payload = { user: { id: decoded.user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      const userAgent = useragent(req.headers["user-agent"]);
      const userLog = new UserLog({
        ip: req.ip,
        user: decoded.user.id,
        browser: browser,
        os: userAgent.os.name,
        device: userAgent.device.type || "desktop",
      });

      userLog
        .save()
        .then(() => {
          next();
        })
        .catch((err) => {
          console.error("Error saving user log:", err);
          next();
        });
      res.json({ authToken });
    } else {
      res.json({ err: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err.message);
    res.json({ err: "Server error" });
  }
});
router.post("/no-otp-required", async (req, res,next) => {
  const { email, password , browser } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ err: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ err: "Invalid Credentials" });
    }
    const payload = { user: { id: user.id } };
    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    const userAgent = useragent(req.headers["user-agent"]);
    const userLog = new UserLog({
      ip: req.ip,
      user: user.id,
      browser: browser,
      os: userAgent.os.name,
      device: userAgent.device.type || "desktop",
    });
    console.log(userLog)
    userLog
      .save()
      .then(() => {
        next();
      })
      .catch((err) => {
        console.error("Error saving user log:", err);
        next();
      });
    res.json({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Verify OTP
router.post("/verify-otp-forgot-password", (req, res) => {
  const { token, otp } = req.body;

  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (decoded.user.otp === parseInt(otp, 10)) {
      const payload = { user: { id: decoded.user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      res.json({ authToken });
    } else {
      res.json({ err: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err.message);
    res.json({ err: "Server error" });
  }
});

router.post("/verify-otp-email", (req, res) => {
  const { tokenForEmailOTP, OTPForEmail } = req.body;
  try {
    const decoded = jwt.verify(tokenForEmailOTP, jwtSecret);
    if (decoded.user.otp === parseInt(OTPForEmail, 10)) {
      const payload = { user: { id: decoded.user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      res.json({ authToken });
    } else {
      res.json({ err: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err.message);
    res.json({ err: "Server error" });
  }
});

router.post("/verify-otp-phone-number", (req, res) => {
  const { tokenForPhoneOTP, OTPForPhone } = req.body;
  try {
    const decoded = jwt.verify(tokenForPhoneOTP, jwtSecret);
    if (decoded.user.otp === parseInt(OTPForPhone, 10)) {
      const payload = { user: { id: decoded.user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      res.json({ authToken });
    } else {
      res.json({ err: "Invalid OTP" });
    }
  } catch (err) {
    console.error(err.message);
    res.json({ err: "Server error" });
  }
});

router.get("/current", auth, async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.json({ error: "User not found" });
    }
    res.json({ user: user, message: "User found" });
  } catch (error) {
    res.json({ error: "Unauthorized" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ err: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const payload = { user: { id: user.id, otp } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 300 });

    // Send OTP via email
    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`);

    res.json({ token, msg: "OTP sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/update-password", async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.json({ err: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: "Password Updated Successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/MyProfile", auth, async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decoded = jwt.verify(token, jwtSecret);
  const id = decoded.user.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ email: user.email, username: user.username });
    } else {
      res.json({ err: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.json({ err: "Error Fetching User Profile." });
  }
});

router.post("/emailotp", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ err: "Invalid Credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const payload = { user: { id: user.id, otp } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 86400 });

    // Send OTP via email
    await sendEmail(
      user.email,
      "Your OTP Code For Language Selection to French",
      `Your OTP code is ${otp}`
    );

    res.json({ token, msg: "OTP sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/phoneotp", async (req, res) => {
  let { email, phoneNumber } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ err: "Invalid Credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const payload = { user: { id: user.id, otp } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 86400 });

    if (!phoneNumber.includes("+")) {
      phoneNumber = "+91" + phoneNumber;
    }
    // Send OTP via phone
    client.messages.create({
      body: `your OTP verification for language change is ${otp}`,
      messagingServiceSid: process.env.MESSAGE_SERVICE_SID,
      to: phoneNumber,
    });

    res.json({ token, msg: "OTP sent to your Phone Number" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/isloggedin", auth, async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  const decoded = jwt.verify(token, jwtSecret);
  const id = decoded.user.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json({ email: user.email, username: user.username });
    } else {
      res.json({ err: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.json({ err: "Error Fetching User Profile." });
  }
});

module.exports = router;
