'use strict';
const { Fpm } = require('yf-fpm-server');
let app = new Fpm()
let biz = app.createBiz('0.0.1');

biz.addSubModules('test',{
	foo: args => {
		return Promise.reject({errno: -3001})
	},
	bar: args => {
		return { status: 1 }
	}
})
app.addBizModules(biz);

app.run()
