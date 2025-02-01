export class AppError extends Error {
  isOperational: boolean;

  cause: Error | undefined;

  constructor(message?: string, cause?: Error) {
    super(message ?? '');
    this.isOperational = true;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class ExternalServiceError extends AppError { }
export class InvalidUrlError extends AppError { }
export class HtmlDataParseError extends AppError { }