const assert = require('assert');
const { ping } = require("../lib/index.js");

describe('Ping', function(){
  it('Ping function', function(done){
    ping('http://localhost:9999/ping')
    .then(function(data){
      assert.strictEqual(data.errno, 0, 'Result Code should be 0');
      assert.strictEqual(data.message, 'System online', 'Result Message should be system online');
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
