'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Passenger = function () {
	function Passenger(type, name) {
		var loyaltyPoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
		var usingLoyaltyPoints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'false';
		var hasExtraBag = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'false';

		_classCallCheck(this, Passenger);

		this.type = type;
		this.name = name;
		this.loyaltyPoints = _lodash2.default.toNumber(loyaltyPoints);
		this.usingLoyaltyPoints = usingLoyaltyPoints.toLowerCase() === 'true';
		this.hasExtraBag = hasExtraBag.toLowerCase() === 'true';
	}

	_createClass(Passenger, [{
		key: 'numberOfBags',
		get: function get() {
			return this.type === _constants.PASSENGER_TYPES.loyalty && this.hasExtraBag ? 2 : 1;
		}
	}, {
		key: 'loyaltyPointsDiscount',
		get: function get() {
			return this.type === _constants.PASSENGER_TYPES.loyalty && this.usingLoyaltyPoints ? this.loyaltyPoints : 0;
		}
	}]);

	return Passenger;
}();

exports.default = Passenger;
;