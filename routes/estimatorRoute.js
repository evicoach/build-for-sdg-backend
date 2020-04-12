const express = require('express');
const jsonRes = require('../controllers/jsonRes');
const xmlRes = require('../controllers/xmlRes');
const logger = require('../controllers/logger');
const logs = require('../controllers/logs');

const estimatorRouter = express.Router();

// const estimate = ()=>{
  estimatorRouter.use((req, res, next)=>{
    const start = process.hrtime();
    res.on('finish', ()=>{
      console.log('[FINISH]')
      logger(req, res, start);
    });
    
    res.on('close', ()=>{
      logger(req, res, start);
    });
    next();
  });
  estimatorRouter.route('/api/v1/on-covid-19').post(jsonRes);
  estimatorRouter.route('/api/v1/on-covid-19/json').post(jsonRes);
  estimatorRouter.route('/api/v1/on-covid-19/xml').post(xmlRes);
  estimatorRouter.route('/api/v1/on-covid-19/logs').get(logs); // redirect to noLog
  // return estimatorRouter;
// }

module.exports = estimatorRouter;