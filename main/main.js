//=============================== import API =================================
import { sleep } from 'k6';
import { error_check } from '../check/check.js';
import { scenario } from 'k6/execution';
import { login } from '../api/login.js';
import { enrollment } from '../api/enrollment.js';
import { courses_landingpage } from '../api/courses_landingpage.js';
import { course_detail } from '../api/course_detail.js';
import { completed_lesson_video } from '../api/completed_lesson_video.js';
import { check_in } from '../api/check_in.js';
import { check_out } from '../api/check_out.js';
import { completed_lesson } from '../api/completed_lesson.js';
import { get_survey_template } from '../api/get_survey_template.js';
import { submit_survey } from '../api/submit_survey.js';
import { submit_rating } from '../api/submit_rating.js';
import { share_token } from '../api/share_token.js';
import { login_share_token } from '../api/login_share_token.js';



//============================================================================

export default function () {    //เรียกใช้ API ใน export default function
  // response = login(scenario)
  // response = enrollment(scenario)
  // response = courses_landingpage()
  // response = course_detail()
  // response = completed_lesson_video(scenario)
  // response = check_in(scenario)
  // response = check_out(scenario)
  // response = completed_lesson(scenario)
  // response = get_survey_template()
  // response = submit_survey(scenario)
  // response = submit_rating(scenario)
  // response = share_token()
  // response = login_share_token()


  error_check(response);
  sleep(1)
}











































































const cid = __ENV.cid || "1";
const id = __ENV.id || "1";
const projectname = __ENV.projectname || "1";
const user = __ENV.user || "1";
const durationx = __ENV.durationx || "1";
let response;
const scenariox = __ENV.scenariox || "1";
let options;
const vusx = Math.ceil(user / durationx);
if (scenariox == 1) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    discardResponseBodies: false,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
        gracefulStop: '120s',
      },
    },
  };
}
else if (scenariox == 2) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    vus: user,
    duration: durationx + 's',
    gracefulStop: '120s',
  };
}
else if (scenariox == 3) {
  options = {
    http: {
      timeout: '300s'
    },
    insecureSkipTLSVerify: true,
    scenarios: {
      example_scenario: {
        executor: 'constant-arrival-rate',
        // rate: user,
        // timeUnit: durationx+'s',
        rate: vusx,
        timeUnit: '1s',
        preAllocatedVUs: user,
        duration: durationx + 's', // ระบุระยะเวลาที่ต้องการให้ทดสอบ
        gracefulStop: '120s',
      },
    },
  };
}
else {
  options = {
    insecureSkipTLSVerify: true,
    discardResponseBodies: true,
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: vusx,
        iterations: durationx,
        maxDuration: '10m',
      },
    },
  };
}
export { options };