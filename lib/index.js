#!/usr/bin/env node
import program from 'commander';
import async from 'async';

import App from './App';

program
	.arguments('<file>')
	.option('-s, --save <file>', 'save the report to the given file')
	.action(function (file, options) {
		async.waterfall([
			(callback) => {
				App.checkIfFileExists(file, callback);
			},
			(callback) => {
				App.readInputFileByLines(file, callback);
			},
			(lines, callback) => {
				const commands = App.parseCommands(lines);
				const flightObject = App.formFlightObject(commands);
				const report = flightObject.computeReport();

				if (options.save) {
					App.writeReportToFile(report, options.save, callback);
				} else {
					App.printReport(report);
					callback(null);
				}
			}
		], (err) => {
			if (err) {
				return console.error(err);
			}

			console.log('\nThe report has been generated successfully!\n');
		});
	})
	.parse(process.argv);
