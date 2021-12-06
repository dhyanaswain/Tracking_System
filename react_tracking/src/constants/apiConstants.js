// export const API_BASE_URL = process.env.REACT_APP_SERVER_URL;
export const API_BASE_URL = 'http://localhost:4000/api/v1/'
export const ACCESS_TOKEN_NAME = 'login_access_token';

export const CONFIG = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Connection': 'keep-alive'
  }
}