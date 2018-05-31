var should = require("mocha").should;
var YF = require("../lib/index.js").default;
YF.init({ appkey: '123123', masterKey: '123123'});

describe('Query', function(){
  it('find function', function(done){
    var query = new YF.Query('ss_jobs');
    query.page(1,10);
    query.findAndCount().then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
