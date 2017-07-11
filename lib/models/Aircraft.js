import _ from 'lodash';

export default class Aircraft {
	constructor(model, totalSeats) {
		this.model = model;
		this.totalSeats = _.toNumber(totalSeats);
	}
};
