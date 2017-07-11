#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.arguments('<file>').option('-s, --save <file>', 'save the report to the given file').action(function (file, options) {
	_async2.default.waterfall([function (callback) {
		_App2.default.checkIfFileExists(file, callback);
	}, function (callback) {
		_App2.default.readInputFileByLines(file, callback);
	}, function (lines, callback) {
		var commands = _App2.default.parseCommands(lines);
		var flightObject = _App2.default.formFlightObject(commands);
		var report = flightObject.computeReport();

		if (options.save) {
			_App2.default.writeReportToFile(report, options.save, callback);
		} else {
			_App2.default.printReport(report);
			callback(null);
		}
	}], function (err) {
		if (err) {
			return console.error(err);
		}

		console.log('\nThe report has been generated successfully!\n');
	});
}).parse(process.argv);