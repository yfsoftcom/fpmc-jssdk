var should = require("should");
var YF = require("../lib/index.js").default;
var fs = require('fs');
var FormData = require('form-data');

YF.init({appkey:'123123',masterKey:'1b7e5703602b6fce1cae7364ac0f2244', endpoint:'http://localhost:9999/api'});


describe('File', function(){
  it('upload function', function(done){
    var file = new YF.File();
    var form = new FormData();
    form.append('file', fs.createReadStream('test/test.json'))
    file.upload(form).then(function(data){
      console.log(data);
      done();
    }).catch(function(err){
      done(err);
    });
  });

})
