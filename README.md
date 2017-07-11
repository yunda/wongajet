# Wonga Jet Reports Generator

A simple program that produces flight summary reports based on flight, route and passenger data.

### How to install

First of all you need to have [Node.js](https://nodejs.org/en/) installed on you machine. I used v8.1.0 on this project. There is a great tool to manage your node version in case if you need to update it: [nvm](https://github.com/creationix/nvm).

Next step is to install all of the dependancies:

```
npm install
```

Once it's completed successfully install this command line tool globally by running:
```
npm install -g
```
This will make `wongajet` command available.

### Usage

To view the report in the console as a table simply run:
```
wongajet /path/to/your/inputfile.txt
```

If you want to save a report as a json file simply add `-s` flag and a path to the resulting file:

```
wongajet /path/to/your/inputfile.txt -s /path/to/your/report.json
```

Feel free to use files which I used for testing. They are located in `test/mocks`

For example:

```
wongajet test/mocks/basic.txt

wongajet test/mocks/basic.txt -s test/mocks/basic.json
```

### Tests

Speaking of tests, you can find them in test folder and run by executing `npm test`
