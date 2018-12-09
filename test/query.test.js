const assert = require('assert');
const { init, DBQuery, DBObject, Object: Obj, ping } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });

describe('DBQuery', function(){
  it('find function', function(done){
    var query = new DBQuery('test');
    query.first().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
