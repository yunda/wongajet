import keyMirror from 'keymirror';

export const MODEL_TYPES = keyMirror({
	route: null,
	aircraft: null,
	passenger: null
});

export const PASSENGER_TYPES = keyMirror({
	general: null,
	airline: null,
	loyalty: null
});
