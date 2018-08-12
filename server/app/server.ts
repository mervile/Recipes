import * as express from 'express';
//import MongoClient from 'mongodb';
import * as bodyParser from 'body-parser';

const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

require('./routes')(app, {});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
