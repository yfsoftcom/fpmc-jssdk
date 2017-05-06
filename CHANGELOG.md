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