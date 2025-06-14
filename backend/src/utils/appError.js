class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errorCode = errorCode || 'unknown_error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
