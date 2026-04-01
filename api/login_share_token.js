import http from 'k6/http';
import { share_token } from './token.js';

export function login_share_token() {
  const url = 'https://loadtest-lms.one.th/api/v1/login/share-token';

  const payload = JSON.stringify({
    share_token: share_token
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, params);

  //console.log('Response body:', response.body);

  return response;
}