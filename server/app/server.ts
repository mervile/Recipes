import * as express from 'express';
import DBService from './services/AbstractDBService';
import { MongoDBService } from './services/MongoDBService';

const dbClient: DBService = MongoDBService.getInstance();
const app = express();

app.use(express.json());

const port = 8000;

require('./routes')(app, {});

app.listen(port, () => {
  console.log('We are live on ' + port);
  dbClient.connect();
});

process.on('SIGINT', async () => {
  await dbClient.close();
  process.exit(0);
});