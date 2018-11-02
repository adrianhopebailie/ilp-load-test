import { createApp } from 'ilp-connector'
const config = require('../../connector-config.json')
const connector = createApp(config)
connector.listen()
