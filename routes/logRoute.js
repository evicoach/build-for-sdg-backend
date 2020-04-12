const express = require('express');
const log = require('../controllers/log');

const logRouter = express.Router();

// send the file to the user
logRouter.get('/', log);

module.exports = logRouter;
  