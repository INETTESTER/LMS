import http from 'k6/http';
import { token } from './token.js';

export function share_token() {
  const url = 'https://loadtest-lms.one.th/api/v1/share-token';

  const params = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  const response = http.get(url, params);

  //console.log('Response body:', response.body);

  return response;
}