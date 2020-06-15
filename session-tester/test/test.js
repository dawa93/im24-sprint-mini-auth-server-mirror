const expect = require('chai').expect;
const request = require('supertest');
const SHA256 = require("crypto-js/sha256");
const app = require('../index');

describe('GET /', function () {
  it('토큰이 전혀 없을 때, index.html이 표시되어야 합니다', (done) => {
    request('http://localhost:8080')
      .get('/')
      .end((err, resp) => {
        expect(resp.text).to.include('로그인하세요!');
        done();
      });
  });

  it('토큰이 존재할 때, index_logged_in.html이 표시되어야 합니다', (done) => {
    const token = SHA256('kimcoding').toString();
    app.pushTokenForTesting(token);

    request('http://localhost:8080')
      .get('/')
      .set('cookie', `session_id=${token}`)
      .end((err, resp) => {
        expect(resp.text).to.include('로그인했어요!');
        done();
      });
  });

  it('성공적으로 로그인하면, mypage.html이 표시되어야 합니다', (done) => {
    request('http://localhost:8080')
      .post('/login')
      .send('username=park&password=qwerty')
      .end((err, resp) => {
        expect(resp.text).to.include('마이페이지');
        done();
      });
  });

  it('성공적으로 로그인하면, 브라우저에 세션 아이디(토큰)이 쿠키의 형태로 저장되어야 합니다', (done) => {
    const token = SHA256('park').toString();

    request('http://localhost:8080')
      .post('/login')
      .send('username=park&password=qwerty')
      .end((err, resp) => {
        expect(resp.header['set-cookie']).to.include(`session_id=${token}`);
        done();
      });
  });

  it('로그인에 실패하면, 에러 status code와 함께 unauthorized가 표시되어야 합니다', (done) => {
    request('http://localhost:8080')
      .post('/login')
      .send('username=park&password=wrongpassword')
      .end((err, resp) => {
        expect(resp.status).to.equal(401);
        expect(resp.text).to.equal('unauthorized');
        done();
      });
  });

});