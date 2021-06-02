// Inititalisation
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Express Configs
const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '');
  res.setHeader('Access-Control-Allow-Headers', '');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

// Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('started');
});
