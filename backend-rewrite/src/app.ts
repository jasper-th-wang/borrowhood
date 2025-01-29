import express, { Request } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import log4js from 'log4js';

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

// app.get<{}, MessageResponse>('/', (req, res) => {
//   res.json({
//     message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
//   });
// });


// app.get<{}, MessageResponse>('/testError', () => {
//   throw new Error('Test');
// });


// Configure Helmet with environment-specific CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: isDevelopment
          ? ["'self'", "https://localhost:5173", "https://localhost:8080", "ws://localhost:5173"]
          : ["'self'"],
        scriptSrc: isDevelopment
          ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]  // Needed for HMR
          : ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        styleSrc: isDevelopment
          ? ["'self'", "'unsafe-inline'"]  // Vite needs this in dev
          : ["'self'"],
      },
    },
    // Other Helmet options you might want to configure
    crossOriginEmbedderPolicy: isDevelopment ? false : true,
    crossOriginResourcePolicy: isDevelopment ? false : true,
  })
);

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
