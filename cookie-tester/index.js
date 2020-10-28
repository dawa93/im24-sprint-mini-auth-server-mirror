const http = require("http");
const fs = require("fs");
const { SSL_OP_COOKIE_EXCHANGE } = require("constants");

http
  .createServer((request, response) => {
    request.on("error", (err) => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on("error", (err) => {
      console.error(err);
    });
    if (request.method === "GET" && request.url === "/login") {
      // response.end(request.url = "kimcoding");
      // console.log(request.url);
      // response.writeHead(200, {
      //   "Set-Cookie": ["login = kimcoding"],
      // });
      // console.log(SSL_OP_COOKIE_EXCHANGE);
      // document.cookie = "username=kimcoding";

      // TODO:
      // 키는 login 값은 kimcoding 으로 설정하세요.

      response.write(fs.readFileSync("client/mypage.html"));
      request.pipe(response);
    } else if (request.method === "GET" && request.url === "/") {
      response.write(fs.readFileSync("client/index.html"));
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);

console.log("open http://localhost:8080");
