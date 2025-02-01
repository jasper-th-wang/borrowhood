import { Application, NextFunction, Request, Response } from 'express';
import { ExternalServiceError, InvalidUrlError, HtmlDataParseError } from '../api/models/app-exception-model';
import { StatusCodes } from 'http-status-codes';

const getStatusFromStatusCode = (statusCode: number): string => {
  return `${statusCode}`.startsWith('4') ? 'fail' : 'error';
};

const logError = (error: Error): void => {
  console.log('\n\n------ begin: ------');
  console.log('ERROR: ', error);
  console.log('------ end: ------\n\n');
};

type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;
const errorHandlerFactory = <T>(errorType: new (...args: any[]) => T, statusCode: StatusCodes, productionMessage: string): ErrorHandler => {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof errorType)) {
      return next(err);
    }
    logError(err);

    if (process.env.NODE_ENV === 'development') {
      res.status(statusCode).json({
        status: getStatusFromStatusCode(statusCode),
        message: err.message,
        error: err,
        stack: err.stack,
      });
    } else {
      res.status(statusCode).json({
        status: getStatusFromStatusCode(statusCode),
        message: productionMessage,
      });
    }
  };

};

// Handles development error
// sends back the error message, and additional information about the error
const handleErrorByEnvironment = (err: Error, req: Request, res: Response) => {
  logError(err);
  if (process.env.NODE_ENV === 'development') {
    const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
      status: getStatusFromStatusCode(statusCode),
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    // Sends a generic message to the client about the error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};


export const loadGlobalErrorHandler = (app: Application) => {
  app.use(errorHandlerFactory(InvalidUrlError, StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid url, please provide a valid url.'));
  app.use(errorHandlerFactory(HtmlDataParseError, StatusCodes.UNPROCESSABLE_ENTITY, 'Unable to process document from the given url.'));
  app.use(errorHandlerFactory(ExternalServiceError, StatusCodes.SERVICE_UNAVAILABLE, 'Cannot reach the given url.'));
  app.use(handleErrorByEnvironment);
};