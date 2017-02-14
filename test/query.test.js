var should = require("should");
var YF = require("../lib/index.js").default;
YF.init({mode:'STAGING',scope:'api',appkey:'123123',masterKey:'1b7e5703602b6fce1cae7364ac0f2244'});


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
