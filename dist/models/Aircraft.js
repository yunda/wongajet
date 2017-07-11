'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Aircraft = function Aircraft(model, totalSeats) {
	_classCallCheck(this, Aircraft);

	this.model = model;
	this.totalSeats = _lodash2.default.toNumber(totalSeats);
};

exports.default = Aircraft;
;