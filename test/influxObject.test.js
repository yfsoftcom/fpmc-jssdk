const assert = require('assert');
const { init, InfluxObject } = require("../lib/index.js");
init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });

describe('InfluxObject', function(){
  before('', function(done){
    const obj = new InfluxObject('cpu_load_short');
    obj.clear()
      .then(data => {
        done();
      })
      .catch(done)
  })

  // after('', function(done){
  //   const obj = new InfluxObject('cpu_load_short');
  //   obj.clear()
  //     .then(data => {
  //       done();
  //     })
  //     .catch(done)
  // })

  it('Create function', function(done){
    const obj = new InfluxObject('cpu_load_short');
    obj.set({
      tags: { host: 'server03', region: 'cn-beijin'},
      fields : {
        value: 0.1
      }
    })
    obj.create().then(function(o){
      console.log(o)
      done();
    }).catch(function(err){
      done(err);
    });
  });

  it('Batch Create function', function(done){
    const obj = new InfluxObject('cpu_load_short');
    obj.batch([{
      tags: { host: 'server03', region: 'cn-beijin'},
      fields : {
        value: 0.1
      }
    },{
      tags: { host: 'server04', region: 'cn-beijin'},
      fields : {
        value: 0.5
      }
    },{
      tags: { host: 'server05', region: 'cn-beijin'},
      fields : {
        value: 0.3
      }
    },{
      tags: { host: 'server06', region: 'cn-beijin'},
      fields : {
        value: 0.6
      }
    },
    ])
      .then(function(o){
      
      assert.strictEqual(o, 4, 'should be return 4, if ok')
      done();
    }).catch(function(err){
      done(err);
    });
  });

});