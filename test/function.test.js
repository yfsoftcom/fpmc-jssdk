const assert = require('assert');
const { init, DBObject, Object: Obj, Func } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });


describe('Function', function(){
  it('call reject function', function(done){
    var func = new Func('test.foo');
    func.invoke().then(function(data){
      done('should not be resolved~');
    }).catch(function(err){
      assert.strictEqual(err.errno, -3001, 'Reject -3001');
      done();
    });
  });

  it('call resolve function', function(done){
    var func = new Func('test.bar');
    func.invoke().then(function(data){
      assert.strictEqual(data.status, 1, 'Should execute ok~');
      done();
    }).catch(function(err){
      done(err);
    });
  });
});
