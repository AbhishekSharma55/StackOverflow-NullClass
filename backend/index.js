const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

// Routes
app.get("/", (req, res) => {
  res.json("Hello World from Stack Overflow Clone backend ! Your in.");
});
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api", require("./routes/main.js"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
