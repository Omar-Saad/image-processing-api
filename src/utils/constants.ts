// Module for all constants

class Constants {
  public static readonly PORT: number = 3000;
  // Endpoints
  public static readonly API: string = '/api';
  public static readonly IMAGES: string = '/images';

  // Response codes
  public static readonly BAD_REQUEST_STATUS_CODE: number = 400;
  public static readonly NOT_FOUND_STATUS_CODE: number = 404;
  public static readonly OK_STATUS_CODE: number = 200;
  public static readonly INTERNAL_SERVER_ERROR_STATUS_CODE: number = 500;
  // Response messages
  public static readonly BAD_REQUEST: string =
    'Bad Request. Please check the query parameters';
  public static readonly NOT_FOUND: string =
    'Not Found. Please check the filename';
  public static readonly INTERNAL_SERVER_ERROR: string =
    'Internal Server Error. Please try again later';
}

export default Constants;
