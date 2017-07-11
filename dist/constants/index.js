'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PASSENGER_TYPES = exports.MODEL_TYPES = undefined;

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MODEL_TYPES = exports.MODEL_TYPES = (0, _keymirror2.default)({
	route: null,
	aircraft: null,
	passenger: null
});

var PASSENGER_TYPES = exports.PASSENGER_TYPES = (0, _keymirror2.default)({
	general: null,
	airline: null,
	loyalty: null
});