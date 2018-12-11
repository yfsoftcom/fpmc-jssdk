const assert = require('assert');
const { init, Query, DBObject, Object: Obj, ping } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });

describe('DBQuery', function(){
  it('first function', function(done){
    var query = new Query('test');
    query.first().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('count function', function(done){
    var query = new Query('test');
    query.count().then(function(data){
      assert( data > 0, 'should > 0');
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('find function', function(done){
    var query = new Query('test');
    query.page(1, 2).find().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
  it('findAndCount function', function(done){
    var query = new Query('test');
    query.select('name').page(1, 10).findAndCount().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
