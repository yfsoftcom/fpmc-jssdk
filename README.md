# yf-fpm-client-js
> a nodejs sdk for fpm-server

# install

```bash
$ npm i yf-fpm-client-js --save
// or yarn
$ yarn add yf-fpm-client-js
```

# config

```javascript
const fpmc = require('yf-fpm-client-js');
fpmc.init({ mode: 'DEV', appkey: '123123', masterKey: '123123', domain: 'http://api.yunplus.io' });
```

# use

## Query
```javascript
var query = new YF.Query('ss_jobs');
  query.page(1,10);
  query.findAndCount()
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```

## Object
```javascript
var obj = new YF.Object('app_versions');
obj.set({
    app: 'node-client',
    version: '0.1',
    device: 'web',
    download: 'www.npmjs.com',
  })
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```
## Batch
```javascript
var batch = new YF.Batch('ss_company');
    batch.insert([
       {company: 'yunjia'},
       {company: 'yunplus'},
       {company: 'yun+'},
    ])
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```
## Function
```javascript
var func = new YF.Func('test.foo');
    func.invoke({})
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```
