'use strict';

let request = require('request');

function createRouteUtil(host, port) {
	return {
		buildRequestOptions: function (req, callback) {
			let method = req.method.toUpperCase();

			if (host.indexOf('http://') <= -1 && host.indexOf('https://') <= -1) {
				host = 'http://' + host;
			}

			let options = {
				uri: host + ':' + port + req.originalUrl,
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
					if (error) {
						return res.status((response && response.statusCode) || 404).json({
							success: false,
							errors: error
						});
					}
					return res.status(response.statusCode).json({
						success: true,
						data: data ? JSON.parse(data) : null
					});
				};
			}
			let options = this.buildRequestOptions(req, callback);
			req.pipe(request(options));
		}
	};
}

module.exports = {
	catUtil: createRouteUtil('localhost', '3001'),
	ownerUtil: createRouteUtil('localhost', '3002')
};