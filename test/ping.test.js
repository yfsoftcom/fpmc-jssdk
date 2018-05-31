var should = require("mocha").should;
var YF = require("../lib/index.js").default;
YF.init({ appkey: '123123', masterKey: '123123'});


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
