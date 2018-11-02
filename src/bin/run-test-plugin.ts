import * as ildcp from 'ilp-protocol-ildcp'
import AbstractBtpPlugin from 'ilp-plugin-btp'
import { deserializeIlpPrepare, serializeIlpFulfill } from 'ilp-packet'

const ACCOUNT = 'load-test'
const TOKEN = 'load-test'
const server = `btp+ws://${ACCOUNT}:${TOKEN}@localhost:7768`

async function run () {
  console.log(`Connecting TestPlugin to ${server}...`)
  const plugin = new AbstractBtpPlugin({ server })
  plugin.registerDataHandler((data) => {
    const incoming = deserializeIlpPrepare(data)
    return Promise.resolve(
      serializeIlpFulfill({
        fulfillment: incoming.data,
        data: Buffer.allocUnsafe(0)
      })
    )
  })
  await plugin.connect()
  const ildcpResp = await ildcp.fetch(plugin.sendData.bind(plugin))
  console.log(`Listening for packets at ${ildcpResp.clientAddress}...`)
}

run()
