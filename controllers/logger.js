const fs = require('fs');
const getDurationInMilliseconds = require('./durationInMilliseconds');

const logger = (req, res, startTime)=>{
  const durationInMilliseconds =  getDurationInMilliseconds(startTime);
    console.log(`${req.method}\t\t${req.path}\t\t${res.statusCode}\t\t${durationInMilliseconds}ms\n`);
    const log = `${req.method}\t\t${req.path}\t\t${res.statusCode}\t\t${durationInMilliseconds}ms\n`;

    fs.writeFileSync('log.txt', log, {flag: 'a', encoding: 'utf8'});
}

module.exports = logger;