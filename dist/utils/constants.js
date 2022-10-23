"use strict";
// Module for all constants
Object.defineProperty(exports, "__esModule", { value: true });
class Constants {
}
Constants.PORT = 3000;
// Endpoints
Constants.API = '/api';
Constants.IMAGES = '/images';
// Response codes
Constants.BAD_REQUEST_STATUS_CODE = 400;
Constants.NOT_FOUND_STATUS_CODE = 404;
Constants.OK_STATUS_CODE = 200;
Constants.INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
// Response messages
Constants.BAD_REQUEST = 'Bad Request. Please check the query parameters';
Constants.NOT_FOUND = 'Not Found. Please check the filename';
Constants.INTERNAL_SERVER_ERROR = 'Internal Server Error. Please try again later';
exports.default = Constants;
