const express = require('express');
const cors = require('cors');
const logRoute = require('./routes/logRoute');
const estimatorRoute = require('./routes/estimatorRoute');

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.get('/', logRoute);

app.use('/', estimatorRoute);
app.use('/',estimatorRoute);
app.use('/', estimatorRoute);

app.listen(port, ()=>{
  console.log(`Estimator is running on port ${port}`);
});

