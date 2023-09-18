const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const charterShipRoutes = require('./routes/charterShipRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use the charterShipRoutes for all requests to /charterShips
app.use('/charterShips', charterShipRoutes);

module.exports = app;
