import _ from 'lodash';

export default class Route {
	constructor(origin, desination, costPerPassenger, ticketPrice) {
		this.origin = origin;
		this.desination = desination;
		this.costPerPassenger = _.toNumber(costPerPassenger);
		this.ticketPrice = _.toNumber(ticketPrice);
	}
};
