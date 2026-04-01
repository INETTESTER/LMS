import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('submit_survey', function () {
  return JSON.parse(open('../file/tokens.json'));
});

export function submit_survey(scenario) {
  const token = data[scenario.iterationInTest % data.length];
  const url = 'https://loadtest-lms.one.th/api/v1/users/courses/957dd68c-db92-4395-9dfb-1aef2ee6db09/surveys';

  const payload = JSON.stringify({
    answers: [
      { question_id: 1, point: 5, question_type: 'choice' },
      { question_id: 2, point: 4, question_type: 'choice' },
      { question_id: 3, point: 3, question_type: 'choice' },
      { question_id: 4, point: 2, question_type: 'choice' },
      { question_id: 5, point: 1, question_type: 'choice' },
      { question_id: 6, point: 2, question_type: 'choice' },
      {
        question_id: 7,
        suggestion: 'ประทับใจวิทยากรที่อธิบายได้ชัดเจนและยกตัวอย่างจากสถานการณ์จริง ทำให้เข้าใจเนื้อหาได้ง่ายขึ้น รวมถึงบรรยากาศการอบรมที่เป็นกันเอง มีการแลกเปลี่ยนความคิดเห็นระหว่างผู้เข้าร่วมอบรมด้วยกัน'
      },
      {
        question_id: 8,
        suggestion: 'อยากให้เพิ่มเวลา Workshop ลงมือปฏิบัติจริงมากขึ้น เพราะเนื้อหาบางส่วนค่อนข้างเยอะทำให้ไม่ทันได้ทดลองทำเอง นอกจากนี้อยากให้มีเอกสารสรุปหลังอบรมเพื่อนำกลับไปทบทวนได้'
      }
    ]
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    },
  };

  const response = http.post(url, payload, params);

  //console.log('Response body:', response.body);

  return response;
}