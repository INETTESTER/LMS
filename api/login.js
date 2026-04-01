import http from 'k6/http';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)

const data = new SharedArray('users', function () {
    return JSON.parse(open('../file/users-login-ok.json'));
});

export function login(scenario) {
    const user = data[scenario.iterationInTest % data.length];

    //console.log(user.encryted);

    const url = 'https://loadtest-lms.one.th/api/v1/login';

    const payload = JSON.stringify({
        encryted: user.encryted
    });

    const params = {
        headers: {
            'accept': 'application/json',
            'accept-language': 'en-US,en;q=0.9,th;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'origin': 'https://lms-dev.alldemics.com',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://lms-dev.alldemics.com/login',
            'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
            'Cookie': 'i18n_redirected=th',
        },
    };

    const response = http.post(url, payload, params);

    //console.log('Response body:', response.body);

    return response;
}