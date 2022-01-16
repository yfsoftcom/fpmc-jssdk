
const assert = require('assert');
const { init, MGObject, MGQuery } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999' });

describe('MGQuery', function(){
  before('', function(done){
    const obj = new MGObject('testDB', 'test');
    obj.batch([{
      name: 'a1',
      val: 'v1',
    },{
      name: 'a2',
      val: 'v1',
    },{
      name: 'a3',
      val: 'v1',
    },{
      name: 'a4',
      val: 'v1',
    }])
      .then(data => {
        done();
      })
      .catch(done)
  })
  it('first function', function(done){
    var query = new MGQuery('testDB', 'test');
    query.first().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('count function', function(done){
    var query = new MGQuery('testDB', 'test');
    query.count().then(function(data){
      assert( data > 0, 'should > 0');
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('find function', function(done){
    var query = new MGQuery('testDB', 'test');
    query.page(1, 2).find().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
  it('findAndCount function', function(done){
    var query = new MGQuery('testDB', 'test');
    query.select('name').page(1, 10).findAndCount().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
