'use strict';

let express = require('express');
let app = express();

// starts the server

let server = app.listen(process.env.PORT || 4000);

let allowedOrigins = ['http://localhost:3000', 'http://localhost:1841'];

app.use(function (req, res, next) {
	let origin = req.headers.origin;
	allowedOrigins.forEach(function (item) {
		if (origin.indexOf(item) > -1) {
			res.header("Access-Control-Allow-Origin", item);
			return;
		}
	});
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
	next();
});


app.use('/api/cats', require('./routes/catRoute'));
app.use('/api/owners', require('./routes/ownerRoute'));