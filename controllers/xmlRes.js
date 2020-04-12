const convert = require('xml-js');
const estimator = require('../estimator');

const xmlRes = (req, res)=>{
  const data = req.body;
  const options = {compact: true, ignoreComment: true, spaces: 4};
  res.setHeader("Content-Type", "application/xml");
  res.status(200);
  res.send(convert.json2xml(JSON.stringify(estimator(data)), options));
}

module.exports = xmlRes;