# 1.0.0 (2018-12-11)
BreakChange:
- Rename the package to `fpmc-jssdk`
- remove `lodash` package
- use typescript to rewrite



# 1.0.2 (2018-05-31)
BugFix:
- Cant Run In `Product` Mode
  - should sort the parameter by name
  
# 1.1.0 (2018-05-31)

Change
- replace `axios` of `node-fetch` 
- replace `dayjs` of `moment`

# 1.0.15 (2018-05-18)
Add 
- ping
```javascript
YF.ping()
    .then(function(data){
      console.log(data);
      /* receive data:
      { errno: 0,
        message: 'System online',
        starttime: 1526632288379,
        data: {},
        timestamp: 1526632288460 }
      //*/
    }).catch(function(err){
      done(err);
    });
```


# 1.0.13 (2017-06-20)

Known Issues:

- Support `updateAt` & `createAt` defined
```javascript
YF.init({ appkey: '123123', masterKey: '123123', 
  fields: {
    createAt: { column: 'created_at', type: 'timestamp', },
    updateAt: { column: 'updated_at', type: 'timestamp', }
  }});
```

# 1.0.12 (2017-05-06)

Remove

- `form-data` 

# 1.0.11 (2017-04-14)

Feature

- Support File Upload
```javascript
var FormData = require('form-data');
var fs = require('fs');
var file = new YF.File();
var form = new FormData();
form.append('file', fs.createReadStream('test/test.json'))
file.upload(form).then(function(data){
  console.log(data);
});

```

# 1.0.6 (2017-03-04)

Feature

- Object.remove() Can Called Without `get()`
- Object.getByCondition()
- improve `Object.save() `

FixBugs

- Object.getById Contains the objectId