const path = require('path');

const log = (req, res)=>{
  const logFile = path.resolve(path.join(__dirname,'../log.txt'));
  res.sendFile(logFile);
}

module.exports = log;