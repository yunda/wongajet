import keyMirror from 'keymirror';
import _ from 'lodash';

import { PASSENGER_TYPES } from '../constants';

export default class Passenger {
	constructor(type, name, loyaltyPoints = 0, usingLoyaltyPoints = 'false', hasExtraBag = 'false') {
		this.type = type;
		this.name = name;
		this.loyaltyPoints = _.toNumber(loyaltyPoints);
		this.usingLoyaltyPoints = usingLoyaltyPoints.toLowerCase() === 'true';
		this.hasExtraBag = hasExtraBag.toLowerCase() === 'true';
	}

	get numberOfBags() {
		return this.type === PASSENGER_TYPES.loyalty && this.hasExtraBag ? 2 : 1
	}

	get loyaltyPointsDiscount() {
		return this.type === PASSENGER_TYPES.loyalty && this.usingLoyaltyPoints ? this.loyaltyPoints : 0;
	}
};
