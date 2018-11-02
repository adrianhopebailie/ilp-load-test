import * as fs from 'fs'
import * as commander from 'commander'
import { createSuccessfulMessageExchange, createFailedMessageExchange, createAuthExchange, createUserAndToken } from '../lib/generators'
import { render as renderHeader } from '../templates/header'
import { render as renderAuth } from '../templates/auth'
import { render as renderPrepare } from '../templates/prepare'
import { render as renderFooter } from '../templates/footer'
import { render as renderConfig } from '../templates/connector'

commander
  .option('-a, --address [localhost]', 'Address to connect to from JMeter', 'localhost')
  .option('-p, --port [7768]', 'Set to 7768 to connect all users to moneyd', 7768)
  .option('-u, --users [10]', 'Users to generate', 10)
  .option('-m, --messages [10]', 'Messages to send for each test plan', 10)
  .option('-c, --connector [private.moneyd.local]', 'ILP address of connector', 'private.moneyd.local')
  .option('-r, --receiver [load-test]', 'ILP address suffix of receiver', 'load-test')
  .parse(process.argv)

const SERVER = String(commander.address)
const PORT = Number(commander.port)
const CONNECTOR_ADDRESS = String(commander.connector)
const DESTINATION_ACCOUNT = String(commander.receiver)
const UNIQUE_USERS = Number(commander.users)
const MESSAGES = Number(commander.messages)
const TEST_FILE = './ilp-load-test.jmx'
const CONFIG_FILE = './connector-config.json'
const DATA_FILE = './user.csv'

// Need some field sizes to be constant so we can do variable substitution without breaking the OER encoding
const USERNAME_SIZE = 10
const TOKEN_SIZE_BYTES = 16
const TOKEN_SIZE = TOKEN_SIZE_BYTES * 2

console.log(`Creating user data file for ${UNIQUE_USERS} unique users...`)
// TODO - Check if exists and delete/warn

// Format is ACCOUNT, ACCOUNT_HEX, TOKEN, PORT
const dataFile = fs.createWriteStream(DATA_FILE)
const users = []
for (let i = 1; i <= UNIQUE_USERS; i++) {
  const [account, token] = createUserAndToken(i, USERNAME_SIZE, TOKEN_SIZE)
  const port = (PORT === 7768) ? PORT : PORT + i
  dataFile.write(`${account},${Buffer.from(account, 'utf8').toString('hex')},${Buffer.from(token, 'utf8').toString('hex')}, ${port}\n`)
  users.push({ account, token, port })
}
dataFile.close()
console.log(`Written to ${DATA_FILE}\n`)

if (PORT !== 7768) {
  console.log(`Creating connector file for ${UNIQUE_USERS} unique BTP plugins...`)
  const configFile = fs.createWriteStream(CONFIG_FILE)
  configFile.write(renderConfig(CONNECTOR_ADDRESS, DESTINATION_ACCOUNT, users))
  configFile.close()
  console.log(`Written to ${CONFIG_FILE}\n`)
} else {
  console.log(`Skipping config generation. All tests will connect via BTP on port 7768.`)
}

console.log(`Creating test plan file ${MESSAGES} messages...`)

const file = fs.createWriteStream(TEST_FILE)
file.write(renderHeader(SERVER, String(PORT)))

// Inject JMeter variable placeholders into the hex encoded data
const dummyUsername = 'X'.padEnd(USERNAME_SIZE, 'X')
const dummyUsernameHex = Buffer.from(dummyUsername, 'utf8').toString('hex')
const dummyToken = 'T'.padEnd(TOKEN_SIZE, 'T')
const dummyTokenHex = Buffer.from(dummyToken, 'utf8').toString('hex')
const [request, response] = createAuthExchange(1, dummyUsername, dummyToken)
const requestWithJmeterVars = request.toString('hex')
  .replace(dummyUsernameHex, '${ACCOUNT_HEX}')
  .replace(dummyTokenHex, '${TOKEN}')

file.write(renderAuth(requestWithJmeterVars, response.toString('hex')))

for (let i = 2; i <= MESSAGES; i++) {
  const [request, response] = createSuccessfulMessageExchange(i, CONNECTOR_ADDRESS + '.' + DESTINATION_ACCOUNT,
    '1', new Date(Date.now() + 60000 * 60)) // Expiry in an hour
  file.write(renderPrepare(request.toString('hex'), response.toString('hex')))
}

file.write(renderFooter())
file.close()

console.log(`Written to ${TEST_FILE}\n`)
