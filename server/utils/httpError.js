class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
    }
}
  
const appError = (statusCode, message) => {
    return new HttpError(statusCode, message);
};
  
module.exports = {
    HttpError,
    appError
};
  