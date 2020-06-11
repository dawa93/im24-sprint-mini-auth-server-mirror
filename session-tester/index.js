const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const SHA256 = require("crypto-js/sha256");

const SESSIONS = [];
const registerdUsers = [
  { username: 'kimcoding', password: 'codestates' },
  { username: 'park', password: 'qwerty' },
]

function isAuthorized({ username, password }) {
  return registerdUsers.some(user =>
    user.username === username && user.password === password
  );
}

function hasSession(token) {
  return SESSIONS.includes(token);
}

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/login') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      let credential = querystring.parse(body);

      // HINT:
      // 로그인 시, id와 password가 body를 통해 전달됩니다.
      // console.log(credential);

      if (isAuthorized(credential)) {

        // TODO:
        // 로그인에 성공할 경우, 세션을 생성해야 합니다.
        // 서버에 세션이 생기고, 사용자에 브라우저에 토큰과 함께 쿠키를 발급하면,
        // 브라우저는 로그인 상태를 유지할 수 있게 됩니다.

        // HINT:
        // session_id를 발급합니다. session_id 값은 token으로 지정하십시오.
        let token = SHA256(credential.username).toString();

        response.write(fs.readFileSync('client/mypage.html'));
        response.end(credential.username + '님 환영합니다.');
      }
      else {

        // 로그인 실패
        response.statusCode = 401;
        response.end('unauthorized');
      }
    });
  }
  else if (request.method === 'GET' && request.url === '/') {
    let cookieObj = querystring.parse(request.headers.cookie, '; ');

    // HINT:
    // cookieObj에 쿠키 값이 담겨져 있습니다.
    // console.log(cookieObj)

    // TODO:
    // 인증 상태를 확인하여, logged_in 페이지를 응답으로 돌려주세요.
    // FILL_ME_IN에 인증 상태를 확인하는 코드를 작성하세요.

    let FILL_ME_IN = undefined;
    if (FILL_ME_IN) {
      // 이미 로그인된 경우
      response.end(fs.readFileSync('client/index_logged_in.html'));
    }
    else {
      // 로그인이 필요한 경우
      response.end(fs.readFileSync('client/index.html'));
    }

  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

console.log('open http://localhost:8080');