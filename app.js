const express = require('express');
const cors = require('cors');
const convert = require('xml-js');
const estimator = require('./estimator');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/v1/on-covid-19', (req, res)=>{
  const data = req.body.data;
  const url = req.url;
  const xmlOrJSON = url.substring(url.lastIndexOf('/'));
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