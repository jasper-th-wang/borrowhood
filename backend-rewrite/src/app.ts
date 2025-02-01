import express, { Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import log4js from 'log4js';
import crypto from 'crypto';

import { loadGlobalErrorHandler } from './middleware/errorMiddleware';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import path from 'path';

require('dotenv').config();

const app = express();
const logger = log4js.getLogger('app.ts');
logger.level = 'debug';
const isDevelopment = process.env.NODE_ENV === 'development';

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', api);

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.all('*', (req, res) => {
  res.status(404).json('Page not found');
});

loadGlobalErrorHandler(app);


export default app;
