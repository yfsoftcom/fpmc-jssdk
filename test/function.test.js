const assert = require('assert');
const { init, Func } = require("../lib/index.js");
init({ domain: 'http://localhost:9090', serverKey: 'abc' });

describe('Function', function(){
  it('call reject function', function(done){
    var func = new Func('foo.bar');
    func.invoke({ foo: 'bar' }).then(function(data){
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
