const fs = require('fs');
const getDurationInMilliseconds = require('./durationInMilliseconds');

const logger = (req, res, startTime)=>{
  const durationInMilliseconds =  getDurationInMilliseconds(startTime);
    console.log(`${req.method}\t\t${req.path}\t\t${res.statusCode}\t\t${durationInMilliseconds}ms\n`);
    let statusCode = res.statusCode;
    if(req.path === '/api/v1/on-covid-19/logs'){
      statusCode = 200;
    } 
    const log = `${req.method}\t\t${req.path}\t\t${statusCode}\t\t${durationInMilliseconds}ms\n`;

    fs.writeFileSync('log.txt', log, {flag: 'a', encoding: 'utf8'});
}

module.exports = logger;