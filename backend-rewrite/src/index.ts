import app from './app';
require('dotenv').config();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception: ', err.message);
  console.log('Closing server now...');
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Closing server now...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
});