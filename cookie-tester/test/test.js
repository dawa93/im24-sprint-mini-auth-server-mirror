const request = require('supertest');
require('../index');

describe('GET /login', function () {
  it('요청에 대한 응답으로 쿠키를 설정해주어야 합니다.', (done) => {
    request('http://localhost:8080')
      .get('/login')
      .expect('set-cookie', 'login=kimcoding')
      .expect(200, done);
  });

});