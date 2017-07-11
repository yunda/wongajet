import _ from 'lodash';
import { PASSENGER_TYPES } from './constants';

export default class Flight {
	constructor() {
		this._passengers = [];
	}

	set aircraft(aircraft) {
		this._aircraft = aircraft;
	}

	get aircraft() {
		return this._aircraft;
	}

	set route(route) {
		this._route = route;
	}

	get route() {
		return this._route;
	}

	get passengers() {
		return this._passengers;
	}

	addPassenger(passenger) {
		this._passengers.push(passenger);
	}

	_canFlightProceed(passengersCount, totalSeats, costOfFlight, revenueAfterDiscounts) {
		return passengersCount <= totalSeats && revenueAfterDiscounts > costOfFlight;
	}

	computeReport() {
		const passengers = this.passengers;
		const passengersCount = this.passengers.length;
		const totalSeats = this.aircraft.totalSeats;
		const costPerPassenger = this.route.costPerPassenger;
		const ticketPrice = this.route.ticketPrice;
		const loyaltyPointsUsed = _.sumBy(passengers, 'loyaltyPointsDiscount');
		// passengers count by type
		const {general, airline, loyalty} = _.assign({general: 0, airline: 0, loyalty: 0}, _.countBy(passengers, passenger => passenger.type));

		const costOfFlight = passengersCount * costPerPassenger;
		const revenueBeforeDiscounts = passengersCount * ticketPrice;
		const revenueAfterDiscounts = revenueBeforeDiscounts - loyaltyPointsUsed - (airline * ticketPrice);
		const canFlightProceed = this._canFlightProceed(passengersCount, totalSeats, costOfFlight, revenueAfterDiscounts);

		return {
			passengers: passengersCount,
			generalPassengers: general,
			airlinePassengers: airline,
			loyaltyPassengers: loyalty,
			bags: _.sumBy(passengers, 'numberOfBags'),
			loyaltyPointsUsed,
			costOfFlight,
			revenueBeforeDiscounts,
			revenueAfterDiscounts,
			canFlightProceed
		};
	}
};
