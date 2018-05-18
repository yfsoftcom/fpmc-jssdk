var should = require("should");
var YF = require("../lib/index.js").default;
YF.init({mode:'STAGING',scope:'api',appkey:'123123',masterKey:'1b7e5703602b6fce1cae7364ac0f2244'});


describe('Ping', function(){
  it('Ping function', function(done){
    YF.ping()
    .then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
})
