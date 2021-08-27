# fpmc-jssdk
> A js client sdk for fpm-server, Actually, It's a javascript client of the http server.

- Table of content
  - Install
  - Init
  - Usage
    - Query
    - Object
    - Batch
    - Function
    - MGQuery
    - MGObject
    - InfluxQuery
    - InfluxObject
  - Usage -> [here](https://github.com/yfsoftcom/fpmc-jssdk/wiki/Usage)
  - API -> [here](https://github.com/yfsoftcom/fpmc-jssdk/wiki/API)
  - ChangeLog -> [here](https://github.com/yfsoftcom/fpmc-jssdk/wiki/Changelog)

## install

- In Node.js

  ```bash
  $ npm i fpmc-jssdk --save
  ```
- In Browser

  ```html
  <script src="https://unpkg.com/fpmc-jssdk@latest/dist/fpmc-latest.min.js"></script>
  ```
## Init

- In Nodejs

  ```javascript
  const fpmc = require('fpmc-jssdk');
  fpmc.init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });
  ```

- In Browser

  ```javascript
  fpmc.init({ appkey: '123123', masterKey: '123123', endpoint: 'http://localhost:9999/api', v: '0.0.1' });
  ```

## Usage

  ```javascript
  const { ping, Func, DBObject, DBQuery, MGObject, MGQuery, InfluxQuery, InfluxObject } = fpmc;
  ```

**Important**: Influx Only Support[`first`,`count`, `find`, `create`, `batch`, `clear`]

### Query

  it's support `find` , `first`, `count` , `findAndCount` methods;

  - Find

    find the data of the table [ ss_jobs ], fetch the page 1 which limit 10 rows.

    ```javascript
    var query = new DBQuery('ss_jobs');
      query.page(1,10);
      query.find()
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });

    ```

  - First

    find the first data of the table [ ss_jobs ]

    ```javascript
    var query = new DBQuery('ss_jobs');
      query.first()
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });

    ```

  - Count

    count the table [ ss_jobs ]

    ```javascript
    var query = new DBQuery('ss_jobs');
      query.count()
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });

    ```

  - FindAndCount

    find and count the data of the table [ ss_jobs ], fetch the page 1 which limit 10 rows.

    ```javascript
    var query = new DBQuery('ss_jobs');
      query.page(1,10);
      query.findAndCount()
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });

    ```

### Object

  it's support `create` , `getById`, `getByCondition`, `save`, `remove` methods;

  - Create

    create a row for table [ app_versions ]

    ```javascript
    var obj = new DBObject('app_versions');
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

  - GetById

    get one row which has the id = 1 of table [ app_versions ] 

    ```javascript
    var obj = new DBObject('app_versions');
      obj.getById(1)
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });
    ```

  - GetByCondition

    get one row which patch the condition of table [ app_versions ];

    ```javascript
    var obj = new DBObject('app_versions');
      obj.getByCondition(`app = 'node-client'`)
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });
    ```

  - Save

    Update the data which id is `1` of the table [ app_versions ];

    ```javascript
    var obj = new DBObject('app_versions', { id: 1 });
      obj.save({
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

  - Remove

    Remove one data which id is `1` of the table [ app_versions ];

    ```javascript
    var obj = new DBObject('app_versions');
      obj.remove(1)
        .then(function(data){
          console.info(data);
        }).catch(function(err){
          console.error(err);
        });
    ```  

### Batch

  it's for insert an array once;

  ```javascript
  var batch = new Batch('ss_company');
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

### Function

  it's for call the user defined method;

  ```javascript
  var func = new Func('test.foo');
      func.invoke({})
      .then(function(data){
        console.info(data);
      }).catch(function(err){
        console.error(err);
      });
  ```
