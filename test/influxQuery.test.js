
const assert = require('assert');
const { init, MGObject, InfluxQuery } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', domain: 'http://localhost:9999' });

describe('InfluxQuery', function(){
  // before('', function(done){
  //   const obj = new InfluxQuery('cpu_load_short' );
  //   obj.batch([{
  //     name: 'a1',
  //     val: 'v1',
  //   },{
  //     name: 'a2',
  //     val: 'v1',
  //   },{
  //     name: 'a3',
  //     val: 'v1',
  //   },{
  //     name: 'a4',
  //     val: 'v1',
  //   }])
  //     .then(data => {
  //       done();
  //     })
  //     .catch(done)
  // })
  it('first function', function(done){
    var query = new InfluxQuery('cpu_load_short' );
    query.first().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('query function', function(done){
    var query = new InfluxQuery('cpu_load_short' );
    query.query(`select * from cpu_load_short order by time desc`).then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('count function', function(done){
    var query = new InfluxQuery('cpu_load_short' );
    query.condition(`value < 0.91 and host='server06'`).count().then(function(data){
      console.log(data);
      assert( data > 0, 'should > 0');
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('find function', function(done){
    var query = new InfluxQuery('cpu_load_short' );
    query.select('count(*)').groupBy('host,region').sort('time-').find().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
  
})
