const assert = require('assert');
const { init, DBObject, Object: Obj, Func } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });


describe('Function', function(){
  it('call reject function', function(done){
    var func = new Func('test.foo');
    func.invoke().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('call resolve function', function(done){
    var func = new Func('test.bar');
    func.invoke().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
});
