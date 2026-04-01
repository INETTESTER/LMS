import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('completed_lesson', function () {
  return JSON.parse(open('../file/tokens.json'));
});

export function completed_lesson(scenario) {
  const token = data[scenario.iterationInTest % data.length];
  const url = 'https://loadtest-lms.one.th/api/v1/users/lessons/8f3dd5ac-b0e4-4337-8897-98bb37992d6c/completed';

  const payload = null; // ไม่มี body

  const params = {
    headers: {
      'Authorization': 'Bearer ' + token.access_token,
    },
  };

  const response = http.post(url, payload, params);

  //console.log('Response body:', response.body);

  return response;
}