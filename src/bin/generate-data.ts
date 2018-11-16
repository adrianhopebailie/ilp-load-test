import * as fs from 'fs'
import * as commander from 'commander'
import { createUserAndToken } from '../lib/generators'
import { render as renderTestplan } from '../templates/testplan'
import { render as renderConfig } from '../templates/connector'

commander
  .option('-a, --address [localhost]', 'Address to connect to from JMeter', 'localhost')
  .option('-p, --port [7768]', 'Set to 7768 to connect all users to moneyd', 7768)
  .option('-u, --users [10]', 'Users to generate', 5)
  .option('-l, --loops [10]', 'Loops of the test plan to execute', 10)
  .option('-m, --messages [10]', 'Messages to send for each loop', 100)
  .option('-c, --connector [private.moneyd.local]', 'ILP address of connector', 'private.moneyd.local')
  .option('-r, --receiver [load-test]', 'ILP address suffix of receiver', 'load-test')
  .parse(process.argv)

const SERVER = String(commander.address)
const PORT = Number(commander.port)
const CONNECTOR_ADDRESS = String(commander.connector)
const DESTINATION_ACCOUNT = String(commander.receiver)
const UNIQUE_USERS = Number(commander.users)
const LOOPS = Number(commander.loops)
const MESSAGES = Number(commander.messages)
const TEST_FILE = './ilp-load-test.jmx'
const CONFIG_FILE = './connector-config.json'
const DATA_FILE = './users.csv'

// Need some field sizes to be constant so we can do variable substitution without breaking the OER encoding
const USERNAME_SIZE = 10
const TOKEN_SIZE_BYTES = 16
const TOKEN_SIZE = TOKEN_SIZE_BYTES * 2

console.log(`Creating user data file for ${UNIQUE_USERS} unique users...`)
// TODO - Check if exists and delete/warn

// Format is ACCOUNT, ACCOUNT_HEX, TOKEN, PORT
fs.writeFileSync(DATA_FILE, '')
const users = []
for (let i = 1; i <= UNIQUE_USERS; i++) {
  const [account, token] = createUserAndToken(i, USERNAME_SIZE, TOKEN_SIZE)
  const port = (PORT === 7768) ? PORT : PORT + i
  const server = SERVER // COULD vary this later
  fs.appendFileSync(DATA_FILE, `${account},${token},${server},${port}\n`)
  users.push({ account, token, server, port })
}
console.log(`Written to ${DATA_FILE}\n`)

if (PORT !== 7768) {
  console.log(`Creating connector file for ${UNIQUE_USERS} unique BTP plugins...`)
  fs.writeFileSync(CONFIG_FILE, renderConfig(CONNECTOR_ADDRESS, DESTINATION_ACCOUNT, users))
  console.log(`Written to ${CONFIG_FILE}\n`)
} else {
  console.log(`Skipping config generation. All tests will connect via BTP on port 7768.`)
}

console.log(`Creating test plan file ${MESSAGES} messages...`)
fs.writeFileSync(TEST_FILE, renderTestplan(UNIQUE_USERS, LOOPS, MESSAGES, CONNECTOR_ADDRESS + '.' + DESTINATION_ACCOUNT))
console.log(`Written to ${TEST_FILE}\n`)
