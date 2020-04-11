const express = require('express');
const cors = require('cors');
const convert = require('xml-js');
const estimator = require('./estimator');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('You have to send a post request with input data!');
});

app.post('/api/v1/on-covid-19', (req, res, next) => {
  next();
});

app.post('/api/v1/on-covid-19/json', (req, res)=>{
  const data = JSON.parse(req.body.data);
  res.setHeader("Content-Type", "application/json");
  res.json(JSON.stringify(estimator(data)));

  // const url = req.url;
  // const xmlOrJSON = url.substring(url.lastIndexOf('/'));
  /**
   * if url ends with /json
   *      set content type to json
   *      respond with json formatted data
   * if url ends with /xml
   *      set content type to xml
   *      respond with xml formatted data
   */

  //  if(xmlOrJSON === '/json'){
  //   res.setHeader("Content-Type", "application/json");
  //   res.json(estimator(data))
  //  } else if (xmlOrJSON === '/xml'){
  //   res.setHeader("Content-Type", "application/xml");
  //   res.send(convert.js2xml(estimator(data)));
  //  }
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

app.post('/api/v1/on-covid-19/json/xml', (req, res)=>{
  const data = JSON.parse(req.body.data);
  res.setHeader("Content-Type", "application/xml");
  res.send(convert.js2xml(estimator(data)));
  /**
   * if url ends with /json
   *      set content type to json
   *      respond with json formatted data
   * if url ends with /xml
   *      set content type to xml
   *      respond with xml formatted data
   */

   if(xmlOrJSON === '/json'){
    res.setHeader("Content-Type", "application/json");
    res.json(estimator(data))
   } else if (xmlOrJSON === '/xml'){
    res.setHeader("Content-Type", "application/xml");
    res.send(convert.js2xml(estimator(data)));
   }
});

app.listen(port, ()=>{
  console.log(`Estimator is running on port ${port}`);
})