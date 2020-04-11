const express = require('express');
const cors = require('cors');
const convert = require('xml-js');
const estimator = require('./estimator');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
 /**
   * if url ends with /json
   *      set content type to json
   *      respond with json formatted data
   * if url ends with /xml
   *      set content type to xml
   *      respond with xml formatted data
   */
const getDurationInMilliseconds = (start)=>{
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

const jsonRes = (req, res)=>{
  const data = req.body;
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(estimator(data)));
}
app.use((req, res, next)=>{
  const start = process.hrtime();
  res.on('finish', ()=>{
    const durationInMilliseconds =  parseInt(getDurationInMilliseconds(start));
    console.log(`${req.method} ${req.path} ${res.statusCode} ${durationInMilliseconds}\n ms`);
  });
  res.on('close', ()=>{
    const durationInMilliseconds =  parseInt(getDurationInMilliseconds(start));
    console.log(`${req.method} ${req.path} ${res.statusCode} ${durationInMilliseconds}\n ms`);
  });

  next();
});

app.get('/', (req, res) => {
  res.send('You have to send a post request with input data!');
});

app.post('/api/v1/on-covid-19', (req, res, next) => {
    jsonRep(req, res);
});

app.post('/api/v1/on-covid-19/json', (req, res)=>{
  jsonRes(req, res);
});

app.post('/api/v1/on-covid-19/xml', (req, res)=>{
  const data = req.body;
  const options = {compact: true, ignoreComment: true, spaces: 4};
  res.setHeader("Content-Type", "application/xml");
  res.status(200);
  res.send(convert.json2xml(JSON.stringify(estimator(data)), options));
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  /**
   * use morgan
   * or
   * create an object for each request that has the 
   * {method, path, resultStatus code, time}
   * push each object into an array
   * persist the array
   */
});

app.listen(port, ()=>{
  console.log(`Estimator is running on port ${port}`);
})