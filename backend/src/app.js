const express = require('express');
const cors = require('cors');
const path = require('path');

const wishRoutes = require('./routes/wishRoutes');

const app = express();

app.use(cors());
app.use(express.json());

/* serve frontend */
app.use(express.static(path.join(__dirname, '../frontend')));

/* API routes */
app.use('/api/wishes', wishRoutes);

/* test api */
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Wedding Wish Wall API is running',
  });
});

module.exports = app;