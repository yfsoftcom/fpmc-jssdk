var should = require("should");
var YF = require("../lib/index.js").default;
YF.init({mode:'STAGING',scope:'api',appkey:'123123',masterKey:'1b7e5703602b6fce1cae7364ac0f2244'});


describe('Function', function(){
  it('call function', function(done){
    var func = new YF.Func('system.show');
    func.invoke({}).then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });
    //
    //it('getById', function(done){
    //    var a = new AE.Object('gr_test');
    //    a.getById(17).then(function(data){
    //        console.log(data);
    //        data.save({'name':'55555'}).then(function(data){
    //            done();
    //        });
    //    }).catch(function(err){
    //        done(err);
    //    });
    //});
    //
    //it('save with json', function(done){
    //    var a = new AE.Object('gr_test');
    //    a.set({name:"333"});
    //    a.create().then(function(data){
    //        console.log(data);
    //        data.set('name','444');
    //        data.save().then(function(d){
    //            done();
    //        }).catch(function(err){
    //            done(err);
    //        });
    //    }).catch(function(err){
    //        done(err);
    //    });
    //});
});
