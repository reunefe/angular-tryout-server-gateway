'use strict';

let express = require('express');
let router = express.Router();
let routeUtil = require('./../util/routeUtil');

router.route("/")
	.get(doRequestHandler)
	.post(doRequestHandler);

router.route("/:catId")
	.get(doRequestHandler)
	.put(doRequestHandler)
	.delete(doRequestHandler);

module.exports = router;

function doRequestHandler(req, res) {
	routeUtil.catUtil.doRequest(req, res);
}