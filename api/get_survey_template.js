import http from 'k6/http';
import { token } from './token.js';

export function get_survey_template() {
  const url = 'https://loadtest-lms.one.th/api/v1/surveys/957dd68c-db92-4395-9dfb-1aef2ee6db09';

  const params = {
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };

  const response = http.get(url, params);

  //console.log('Response body:', response.body);

  return response;
}