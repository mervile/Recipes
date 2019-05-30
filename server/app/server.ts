import * as express from 'express';
import DBService from './services/AbstractDBService';
import { MongoDBService } from './services/MongoDBService';
const path = require('path');

const dbClient: DBService = MongoDBService.getInstance();
const app = express();

app.use(express.json());

const distDir = path.resolve(__dirname, "../../client/dist/");
app.use(express.static(distDir));

const port = process.env.PORT || 8000;

require('./routes')(app, {});

app.listen(port, () => {
  console.log('We are live on ' + port);
  dbClient.connect();
});

process.on('SIGINT', async () => {
  await dbClient.close();
  process.exit(0);
});