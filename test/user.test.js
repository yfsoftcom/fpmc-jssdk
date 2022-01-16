const assert = require('assert');
const { init, User } = require("../lib/index.js");
init({ domain: 'http://localhost:9091', serverKey: 'abc' });

describe('User', () => {
  it('call login function', async () => {
    const user = new User();
    const loginInfo = await user.login({
      user: 'foo', password: 'bar',
    })
    assert(loginInfo.access_token !== undefined, 'should return the access token')
    assert(loginInfo.token_type === 'Bearer', 'should be Bearer')
    assert(loginInfo.scope === 'api', 'should be api')
  });
});
