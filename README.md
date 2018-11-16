# ilp-load-test
> Load testing tools for ILP

# Usage

This is a companion project to JMeter which is used to execute the load tests.
 - Download JMeter from https://jmeter.apache.org
 - Get the JMeter ILP Samplers from https://github.com/adrianhopebailie/jmeter-ilp-samplers
 - Use the scripts in this project to generate a test plan and test data
    - Run `build/bin/generate-data.js`
    - It will produce a file called `ilp-load-test.jmx` and `users.csv`

The test plan loads data from the `users.csv` file for each thread.

Run the test plan using JMeter

# Topologies

## moneyd local

To test a moneyd in local mode:
- generate the test plan data with port = 7768 : `node build/bin/generate-data.js`
- start moneyd using the command: `moneyd local`
- start the receiver using `node build/bin/run-test-plugin.js`

Execute the test plan. It will eventaully start failing when the balances on the local mini-accounts hit 0.

## connector with many BTP plugins

To test a connector with multiple BTP plugins:
- generate the test plan data with port = 7000 : `node build/bin/generate-data.js -p 7000`
- start the connector using the generated config: `node build/bin/run-test-connector.js`
- start the receiver using `node build/bin/run-test-plugin.js`

Execute the test plan.
