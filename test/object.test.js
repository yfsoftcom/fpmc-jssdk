var should = require("should");
var YF = require("../lib/index.js").default;
YF.init({mode:'STAGING',scope:'api',appkey:'123123',masterKey:'1b7e5703602b6fce1cae7364ac0f2244'});


describe('Object', function(){
  it('Object function', function(done){
    var obj = new YF.Object('ss_jobs');
    obj.getById(1).then(function(o){
      console.log(o.get())
      done();
    }).catch(function(err){
      done(err);
    });
  });

})

describe('Batch', function(){
  it('Batch function', function(done){
    var batch = new YF.Batch('ss_company');
    batch.insert([
      {company: 'yunjia'},
      {company: 'yunplus'},
      {company: 'yun+'},
    ]).then(function(o){
      console.log(o)
      done();
    }).catch(function(err){
      done(err);
    });
  });

})
