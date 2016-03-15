'use strict';

let request = require('request');

function createRouteUtil(host, port) {
	return {
		buildRequestOptions: function (req, callback) {
			let method = req.method.toUpperCase();

			if (host.indexOf("http://") <= -1 && host.indexOf("https://") <= -1) {
				host = "http://" + host;
			}

			let options = {
				uri: host + ":" + port + req.originalUrl,
				method: method,
				callback: callback
			};

			if (method == 'POST' || method == 'PUT') {
				options.json = req.body;
			}
			return options;
		},
		doRequest: function (req, res, callback) {
			if (!callback) {
				callback = function (error, response, data) {
					return res.status(response.statusCode).send(error || data);
				};
			}
			let options = this.buildRequestOptions(req, callback);
			req.pipe(request(options));
		}
	}
}

module.exports = {
	catUtil: createRouteUtil("localhost", "3001"),
	ownerUtil: createRouteUtil("localhost", "3002")
};