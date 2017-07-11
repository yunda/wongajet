'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flight = function () {
	function Flight() {
		_classCallCheck(this, Flight);

		this._passengers = [];
	}

	_createClass(Flight, [{
		key: 'addPassenger',
		value: function addPassenger(passenger) {
			this._passengers.push(passenger);
		}
	}, {
		key: '_canFlightProceed',
		value: function _canFlightProceed(passengersCount, totalSeats, costOfFlight, revenueAfterDiscounts) {
			return passengersCount <= totalSeats && revenueAfterDiscounts > costOfFlight;
		}
	}, {
		key: 'computeReport',
		value: function computeReport() {
			var passengers = this.passengers;
			var passengersCount = this.passengers.length;
			var totalSeats = this.aircraft.totalSeats;
			var costPerPassenger = this.route.costPerPassenger;
			var ticketPrice = this.route.ticketPrice;
			var loyaltyPointsUsed = _lodash2.default.sumBy(passengers, 'loyaltyPointsDiscount');
			// passengers count by type

			var _$assign = _lodash2.default.assign({ general: 0, airline: 0, loyalty: 0 }, _lodash2.default.countBy(passengers, function (passenger) {
				return passenger.type;
			})),
			    general = _$assign.general,
			    airline = _$assign.airline,
			    loyalty = _$assign.loyalty;

			var costOfFlight = passengersCount * costPerPassenger;
			var revenueBeforeDiscounts = passengersCount * ticketPrice;
			var revenueAfterDiscounts = revenueBeforeDiscounts - loyaltyPointsUsed - airline * ticketPrice;
			var canFlightProceed = this._canFlightProceed(passengersCount, totalSeats, costOfFlight, revenueAfterDiscounts);

			return {
				passengers: passengersCount,
				generalPassengers: general,
				airlinePassengers: airline,
				loyaltyPassengers: loyalty,
				bags: _lodash2.default.sumBy(passengers, 'numberOfBags'),
				loyaltyPointsUsed: loyaltyPointsUsed,
				costOfFlight: costOfFlight,
				revenueBeforeDiscounts: revenueBeforeDiscounts,
				revenueAfterDiscounts: revenueAfterDiscounts,
				canFlightProceed: canFlightProceed
			};
		}
	}, {
		key: 'aircraft',
		set: function set(aircraft) {
			this._aircraft = aircraft;
		},
		get: function get() {
			return this._aircraft;
		}
	}, {
		key: 'route',
		set: function set(route) {
			this._route = route;
		},
		get: function get() {
			return this._route;
		}
	}, {
		key: 'passengers',
		get: function get() {
			return this._passengers;
		}
	}]);

	return Flight;
}();

exports.default = Flight;
;