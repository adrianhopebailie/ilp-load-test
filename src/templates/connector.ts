export function render (ilpAddress: string, receiverAddress: string, accountData: {account: string, token: string, server: string, port: number}[]) {

  const accounts = {}
  accountData.map(({ account, token, port }) => {
    accounts[account] = {
      plugin: 'ilp-plugin-btp',
      relation: 'peer',
      assetCode: 'USD',
      assetScale: 9,
      sendRoutes: false,
      receiveRoutes: false,
      options: {
        listener: {
          port,
          secret: token
        }
      }
    }
  })
  accounts[receiverAddress] = {
    plugin: 'ilp-plugin-btp',
    relation: 'child',
    assetCode: 'USD',
    assetScale: 9,
    sendRoutes: false,
    receiveRoutes: false,
    options: {
      listener: {
        port: 7768,
        secret: 'load-test'
      }
    }
  }

  return JSON.stringify({
    store: 'memdown',
    backend: 'one-to-one',
    adminApi: false,
    ilpAddress,
    accounts
  }, null, 2)
}
