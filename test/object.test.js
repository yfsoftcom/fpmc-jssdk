var should = require("mocha").should;
var YF = require("../lib/index.js").default;
YF.init({ appkey: '123123', masterKey: '123123'});


describe('Create', function(){
  it('Batch function', function(done){
    var obj = new YF.Object('app_versions');
    obj.set({
      app: 'node-client',
      version: '0.1',
      device: 'web',
      download: 'www.npmjs.com',
    })
    obj.create().then(function(o){
      console.log(o)
      done();
    }).catch(function(err){
      done(err);
    });
  });

});
// describe('Object', function(){
//   it('Object function', function(done){
//     var obj = new YF.Object('ss_jobs');
//     obj.getById(1).then(function(o){
//       console.log(o.get())
//       done();
//     }).catch(function(err){
//       done(err);
//     });
//   });

//   it('Object getByCondition', function(done){
//     var obj = new YF.Object('fpm_template');
//     obj.getByCondition("name='test'").then(function(o){
//       console.log(o.get())
//       done();
//     }).catch(function(err){
//       done(err);
//     });
//   })

// })

// describe('Batch', function(){
//   it('Batch function', function(done){
//     var batch = new YF.Batch('ss_company');
//     batch.insert([
//       {company: 'yunjia'},
//       {company: 'yunplus'},
//       {company: 'yun+'},
//     ]).then(function(o){
//       console.log(o)
//       done();
//     }).catch(function(err){
//       done(err);
//     });
//   });

// })
