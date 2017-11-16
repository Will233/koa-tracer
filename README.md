# koa-tracer
koa middleware


## useage
```
const Koa = require('koa');
const app = new Koa();
const tracer = require('./index.js');

// 在option中增加回调函数
const mytracer = tracer({
    callback: funnction (data) {
      // do somthing
      console.log(data);
    }
  });

app.use(mytracer);
app.listen(3003);

```