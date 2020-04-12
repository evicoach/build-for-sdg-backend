const estimator = require('../estimator');

const jsonRes = (req, res)=>{
  const data = req.body;
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(estimator(data)));
}

module.exports = jsonRes;