const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin:['http://localhost:3000'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api', require('./routes/questions.js'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
