import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('video', function () {
  return JSON.parse(open('../file/tokens.json'));
});

export function completed_lesson_video(scenario) {
  const token = data[scenario.iterationInTest % data.length];
  const url = 'https://loadtest-lms.one.th/api/v1/users/lessons/72fcd2a6-18b9-49d3-8129-6a43b718cf3e/completed';

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