import {expect} from 'chai';
import path from 'path';
import App from '../lib/App';
import _ from 'lodash';
import {Aircraft, Passenger, Route} from '../lib/models';

const MOCHS_DIR = './test/mocks';

describe('Airline summary report app', function () {
	before(function () {
		// test files paths
		this.basicCase = path.resolve(MOCHS_DIR, 'basic.txt');
		this.advancedCase = path.resolve(MOCHS_DIR, 'advanced.txt');
		this.overbookedCase = path.resolve(MOCHS_DIR, 'overbooked.txt');
		this.unprofitableCase = path.resolve(MOCHS_DIR, 'unprofitable.txt');
	});

	describe('When file received', function () {
		it('should check if the file exists', function (done) {
			App.checkIfFileExists(this.basicCase, (err) => {
				expect(err).to.be.null;
				done();
			});
		});
		
		it('should create an array of commands', function (done){
			App.readInputFileByLines(this.basicCase, (err, lines) => {
				expect(lines).to.be.an('array').that.have.lengthOf(5)
				// check for the first and the last lines
				expect(lines).to.include('add route London Dublin 100 150');
				expect(lines).to.include('add passenger loyalty Joan 100 FALSE TRUE');
				done();
			});
		});

		it('should parse a command', function () {
			const commandString = 'add passenger general Mark';
			const command = App.parseCommand(commandString);

			expect(command).to.deep.equal({ action: 'add', model: 'passenger', options: [ 'general', 'Mark' ] });
		});

		it('should form a flight object', function (done) {
			App.readInputFileByLines(this.basicCase, (err, lines) => {
				const commands = App.parseCommands(lines);
				const flightObject = App.formFlightObject(commands);

				expect(flightObject).to.have.property('aircraft').that.instanceof(Aircraft);
				expect(flightObject).to.have.property('route').that.instanceof(Route);
				expect(flightObject).to.have.property('passengers').that.have.lengthOf(3);
				done();
			});
		});
	});

	describe('When a passenger object is created', function () {
		it('should set a correct number of bags for loyalty passengers with an extra bag', function () {
			const command = App.parseCommand('add passenger loyalty Joan 100 FALSE TRUE');
			const loyaltyPassenger = new Passenger(...command.options);

			expect(loyaltyPassenger.numberOfBags).to.equal(2);
		});

		it('should set a correct number of bags for loyalty passengers without extra bags', function () {
			const command = App.parseCommand('add passenger loyalty Joan 100 FALSE FALSE');
			const loyaltyPassenger = new Passenger(...command.options);

			expect(loyaltyPassenger.numberOfBags).to.equal(1);
		});

		it('should calculate loyaltyPointsDiscount correctly when it\'s used', function () {
			const command = App.parseCommand('add passenger loyalty Joan 100 TRUE FALSE');
			const loyaltyPassenger = new Passenger(...command.options);

			expect(loyaltyPassenger.loyaltyPointsDiscount).to.equal(100);
		});

		it('should calculate loyaltyPointsDiscount correctly when it\'s not used', function () {
			const command = App.parseCommand('add passenger loyalty Joan 100 FALSE FALSE');
			const loyaltyPassenger = new Passenger(...command.options);

			expect(loyaltyPassenger.loyaltyPointsDiscount).to.equal(0);
		});

		it('should set number of bags and discount to default values for general and airline passengers', function () {
			const command1 = App.parseCommand('add passenger general James');
			const command2 = App.parseCommand('add passenger airline Trevor');
			const generalPassenger = new Passenger(...command1.options);
			const airlinePassenger = new Passenger(...command2.options);

			expect(generalPassenger.loyaltyPointsDiscount).to.equal(0);
			expect(airlinePassenger.loyaltyPointsDiscount).to.equal(0);
			expect(generalPassenger.numberOfBags).to.equal(1);
			expect(airlinePassenger.numberOfBags).to.equal(1);
		});
	});

	describe('When a flight object is created', function () {
		before(function(done) {
			App.readInputFileByLines(this.advancedCase, (err, lines) => {
				const commands = App.parseCommands(lines);
				
				this.flightObject = App.formFlightObject(commands);
				done();
			});
		});

		it('should contain a valid aircraft object', function () {
			const aircraft = this.flightObject.aircraft;

			// add aircraft Gulfstream-G550 8
			expect(aircraft.model).to.be.equal('Gulfstream-G550');
			expect(aircraft.totalSeats).to.equal(8);
		});

		it('should contain a valid route object', function () {
			const route = this.flightObject.route;

			// add route London Dublin 100 150
			expect(route.origin).to.be.equal('London');
			expect(route.desination).to.equal('Dublin');
			expect(route.costPerPassenger).to.equal(100);
			expect(route.ticketPrice).to.equal(150);
		});

		it('should contain a valid set of passengers', function () {
			const passengers = this.flightObject.passengers;
			const passengersCount = _.countBy(passengers, passenger => passenger.type);

			// add passenger general Mark
			// add passenger general Tom
			// add passenger general James
			// add passenger airline Trevor
			// add passenger loyalty Alan 50 FALSE FALSE
			// add passenger loyalty Susie 40 TRUE FALSE
			// add passenger loyalty Joan 100 FALSE TRUE
			// add passenger general Jack
			expect(passengersCount).to.deep.equal({ general: 4, airline: 1, loyalty: 3});
		});

		it('should calculate the figures in the report correctly', function () {
			const report = this.flightObject.computeReport();

			expect(report).to.deep.equal({
				passengers: 8,
				generalPassengers: 4,
				airlinePassengers: 1,
				loyaltyPassengers: 3,
				bags: 9,
				loyaltyPointsUsed: 40,
				costOfFlight: 800,
				revenueBeforeDiscounts: 1200,
				revenueAfterDiscounts: 1010,
				canFlightProceed: true
			});
		});
	});

	describe('When a flight is overbooked', function () {
		before(function(done) {
			App.readInputFileByLines(this.overbookedCase, (err, lines) => {
				const commands = App.parseCommands(lines);
				const flightObject = App.formFlightObject(commands);
				
				this.report = flightObject.computeReport();
				done();
			});
		});
		
		it('should set canFlightProceed to false in the report', function () {
			expect(this.report.canFlightProceed).to.be.false;
		});

		it('should calculate the rest of the numbers correctly', function () {
			expect(this.report).to.deep.equal({
				passengers: 9,
				generalPassengers: 5,
				airlinePassengers: 1,
				loyaltyPassengers: 3,
				bags: 10,
				loyaltyPointsUsed: 40,
				costOfFlight: 900,
				revenueBeforeDiscounts: 1350,
				revenueAfterDiscounts: 1160,
				canFlightProceed: false
			});
		});
	});

	describe('When a flight is unprofitable', function () {
		before(function(done) {
			App.readInputFileByLines(this.unprofitableCase, (err, lines) => {
				const commands = App.parseCommands(lines);
				const flightObject = App.formFlightObject(commands);
				
				this.report = flightObject.computeReport();
				done();
			});
		});
		
		it('should set canFlightProceed to false in the report', function () {
			expect(this.report.canFlightProceed).to.be.false;
		});

		it('should calculate the rest of the numbers correctly', function () {
			expect(this.report).to.deep.equal({
				passengers: 6,
				generalPassengers: 3,
				airlinePassengers: 3,
				loyaltyPassengers: 0,
				bags: 6,
				loyaltyPointsUsed: 0,
				costOfFlight: 600,
				revenueBeforeDiscounts: 900,
				revenueAfterDiscounts: 450,
				canFlightProceed: false
			});
		});
	});
});