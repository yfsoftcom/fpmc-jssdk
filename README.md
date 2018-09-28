# yf-fpm-client-js
> A nodejs sdk for fpm-server, Acturally, It's a javascript client of the http server. Here is the [API](./API.md). 

- Table of content
  - install
  - config
  - use
    - Query
    - Object
    - Batch
    - Function

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

it's support `find` , `first`, `count` , `findAndCount` methods;

```javascript
// find and count the Table [ ss_jobs ], fetch the page 1 which limit 10 rows.

var query = new fpmc.Query('ss_jobs');
  query.page(1,10);
  query.findAndCount()
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });

```

## Object

it's support `create` , `getById`, `getByCondition`, `save`, `remove` methods;

```javascript
var obj = new fpmc.Object('app_versions');
obj.set({
    app: 'node-client',
    version: '0.1',
    device: 'web',
    download: 'www.npmjs.com',
  })
    .create()
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```

## Batch

it's for insert an array once;

```javascript
var batch = new fpmc.Batch('ss_company');
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

it's for call the user defined method;

```javascript
var func = new YF.Func('test.foo');
    func.invoke({})
    .then(function(data){
      console.info(data);
    }).catch(function(err){
      console.error(err);
    });
```
