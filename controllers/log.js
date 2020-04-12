const path = require('path');

const log = (req, res)=>{
  const logFile = path.resolve(path.join(__dirname,'../log.txt'));
  res.setHeader("Content-Type", "text/plain");
  res.status(200);
  res.sendFile(logFile);
}

module.exports = log;