const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://stack-overflow-null-class.vercel.app/"],
  credentials: true,
}));

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api', require('./routes/main.js'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
