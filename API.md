## The manual of the api of `fpm-plugin-mysql`

### Table of content

- Basic Info
- Api
  - find
  - first

#### Basic Info

> 由 `yf-fpm-server` && `fpm-plugin-mysql` 提供一些基本的数据处理功能。

本文档中定义的函数以及参数并非 `Restful`/`GraphQL` 的范式，只用于一种编码约定，配合 `yf-fpm-server` 来使用。

#### Api

- 1. 查询接口

  - 1.1 批量查询 `common.find`

    > 通过一组查询、排序、分页的条件筛选一组数据结果。

    - Arguments: 

      - `table`: 需要查询的表名称
      - `condition`: 查询的条件（可选）
      - `limit`: 需要查询的数据行数（可选，默认为10）
      - `skip`: 需要忽略的数据行数，及偏移量，多用于分页查询（可选，默认为0）
      - `sort`: 排序方式（可选，默认通过id降序）,格式为：id+ 可转换为 id asc ；id- 可转换为 id desc

        *WARNNING*: 该排序的字段不允许包含 - ，+ 如： nick+name 或者 nick-name

    - Example: 
      
      ```javascript
      // arguments
      {
        "table": "gr_api_test",
        "condition": "val like '%3%' ",
        "skip": 0,
        "sort": "val-"
      }
      // return
      {
        "errno":  0,
        "message":  "",
        "timestamp":  1453545308200,
        "data":  [
          {
            "id":  6,
            "val":  "888"
          },
          {
            "id":  5,
            "val":  "555"
          },
          {
            "id":  4,
            "val":  "444"
          },
          {
            "id":  3,
            "val":  "333"
          }
        ]
      }
      ```

  - 1.2 查询第一行符合条件的数据 `common.first`

    > 通过一组查询、排序、分页的条件筛选一行数据结果。

    - Arguments:

      - `table`: 需要查询的表名称
      - `condition`: 查询的条件（可选）
      - `skip`: 需要忽略的数据行数，及偏移量，多用于分页查询（可选，默认为0）
      - `sort`: 排序方式（可选，默认通过id降序）
    - Example: 
      
      ```javascript
      // input
      {
        "table": "gr_api_test",
        "skip": 1,
        "sort": "val-"
      }
      //return
      {
        "errno":  0,
        "message":  "",
        "timestamp":  1453545402772,
        "data":  {
          "id":  5,
          "val":  "555"
        }
      }
      ```




  - 1.3 根据ID查询一条数据 `common.get`

    > 通过ID筛选一行数据结果。

    - Arguments:

      - `table`: 需要查询的表名称
      - `id`: 数据的ID

    - Example:
      ```javascript
      // input
      {
        "table": "gr_api_test",
        "id": 6
      }
      // return
      {
        "errno":  0,
        "message":  "",
        "timestamp":  1453545014206,
        "data":  {
          "id":  6,
          "val":  "666"
        }
      }

      ```
      *WARNNING*：id不存在，接口不会抛出任何异常，但是 data 中不包含任何数据,只是一个空的数组


- 2. 删除接口

  - 2.1 通过ID删除一条数据 `common.remove`

    > 通过ID删除一条数据。

    - Arguments:
      - `table`: 需要查询的表名称
      - `id`: 数据的ID

    - Example:
      ```javascript
      //input
      {
        "table": "gr_api_test",
        "id": 5
      }
      //return
      {
        "errno":  0,
        "message":  "",
        "timestamp":  1453545461778,
        "data":  {
          "fieldCount":  0,
          "affectedRows":  1,//受影响的行数
          "insertId":  0,
          "serverStatus":  2,
          "warningCount":  0,
          "message":  "",
          "protocol41":  true,
          "changedRows":  0
        }
      }
      ```

  - 2.2 通过条件删除一组数据 `common.clear` 

    > 通过筛选条件删除一组数据。

    - Arguments:
      - `table`: 需要查询的表名称
      - `condition`: 筛选条件

    - Example:
      ```javascript
      // input
      {
        "table": "gr_api_test",
        "condition": "val like '%3%' "
      }
      // return
      {
        "errno":  0,
        "message":  "",
        "timestamp":  1453545527137,
        "data":  {
          "fieldCount":  0,
          "affectedRows":  1,//受影响的行数
          "insertId":  0,
          "serverStatus":  34,
          "warningCount":  0,
          "message":  "",
          "protocol41":  true,
          "changedRows":  0
        }
      }

      ```

- 3. 添加接口 `common.create`

  > 添加一条数据。

  - Arguments:
    - `table`: 需要查询的表名称
    - `row`: 添加的数据

  - Example:
    ```javascript
    //input
    {
      "table": "gr_api_test",
      "row": {"val": "666"}
    }
    //return
    {
      "errno":  0,
      "message":  "",
      "timestamp":  1453544939011,
      "data":  {
        "fieldCount":  0,
        "affectedRows":  1,//受影响的行数
        "insertId":  6,//标示新的数据的ID编号
        "serverStatus":  2,
        "warningCount":  0,
        "message":  "",
        "protocol41":  true,
        "changedRows":  0
      }
    }
    ```

- 4. 更新接口 `common.update`

  > 添加一条数据。

  - Arguments:
    - `table`: 需要查询的表名称
    - `row`: 修改的数据
    - `condition`: 需要修改的数据的过滤条件
  
  - Example:
    ```javascript
    //input
    {
      "table": "gr_api_test",
      "condition": "val like '%6%' ",
      "row": {"val": "777"}
    }
    //return
    {
      "errno":  0,
      "message":  "",
      "timestamp":  1453545190578,
      "data":  {
        "fieldCount":  0,
        "affectedRows":  1,//受影响的行数
        "insertId":  0,
        "serverStatus":  34,
        "warningCount":  0,
        "message":  "<Enregistrements correspondants:  0  Modifiés:  0  Warnings:  0",
        "protocol41":  true,
        "changedRows":  0
      }
    }
    ```