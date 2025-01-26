import express, { Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import log4js from 'log4js';

import { loadGlobalErrorHandler } from './middleware/errorMiddleware';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();
const logger = log4js.getLogger('app.ts');
logger.level = 'debug';

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get<{}, MessageResponse>('/testError', () => {
  throw new Error('Test');
});


app.use('/api/v1', api);

app.all('*', (req, res) => {
  res.status(404).json('Page not found');
});

loadGlobalErrorHandler(app);


export default app;
