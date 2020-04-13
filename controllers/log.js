const path = require('path');
const fs = require('fs');

const log = (req, res)=>{
  const logFile = path.resolve(path.join(__dirname,'../log.txt'));
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Location", "https://covid-19-estimator-sdg.herokuapp.com/api/v1/on-covid-19/logs");
  res.status(200);
  res.sendFile(logFile, (err)=>{
    console.log('Log sent successfully');
    // fs.unlinkSync(logFile, ()=>{
    //   console.log('file cleared');
    // });
  });
}

module.exports = log;