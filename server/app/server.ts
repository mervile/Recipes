import * as express from 'express';
//import MongoClient from 'mongodb';

const app            = express();

app.use(express.json());

const port = 8000;

require('./routes')(app, {});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
