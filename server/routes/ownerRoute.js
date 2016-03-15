'use strict';

let express = require('express');
let router = express.Router();
let routeUtil = require('./../util/routeUtil');

router.route("/")
	.get(doRequestHandler)
	.post(doRequestHandler);

router.route("/:ownerId")
	.get(doRequestHandler)
	.put(doRequestHandler)
	.delete(doRequestHandler);

module.exports = router;

function doRequestHandler(req, res, next) {
	// Impossible to pass directly to method on route. More than 3 options will not work and 3 options is always the next-method
	routeUtil.ownerUtil.doRequest(req, res);
}