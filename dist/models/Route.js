'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function Route(origin, desination, costPerPassenger, ticketPrice) {
	_classCallCheck(this, Route);

	this.origin = origin;
	this.desination = desination;
	this.costPerPassenger = _lodash2.default.toNumber(costPerPassenger);
	this.ticketPrice = _lodash2.default.toNumber(ticketPrice);
};

exports.default = Route;
;