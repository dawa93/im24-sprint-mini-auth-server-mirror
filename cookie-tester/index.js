const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/login') {
    response.setHeader('Set-Cookie', ['login=kimcoding']);
    response.write(fs.readFileSync('client/mypage.html'));
    request.pipe(response);
  }
  else if (request.method === 'GET' && request.url === '/') {
    response.write(fs.readFileSync('client/index.html'));
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);

console.log('open http://localhost:8080');