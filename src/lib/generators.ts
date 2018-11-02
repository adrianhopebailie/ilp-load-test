import { serializeIlpPacket, Type as IlpType, serializeIlpPrepare, IlpPrepare, serializeIlpFulfill, IlpFulfill, serializeIlpReject, IlpReject } from 'ilp-packet'
import { BtpResponsePacket, BtpErrorPacket, BtpMessagePacket, Type as BtpType, BtpMessage, ProtocolData, MIME_APPLICATION_OCTET_STREAM, serialize, MIME_TEXT_PLAIN_UTF8 } from 'btp-packet'
import * as crypto from 'crypto'

export function createConditionAndFulfillment (fulfillment?: Buffer): [Buffer, Buffer] {
  const preimage = fulfillment || crypto.randomBytes(32)
  const condition = crypto.createHash('sha256').update(preimage).digest()
  return [condition, preimage]
}

export function createUserAndToken (userNumber: number, usernameSize: number, tokenSize: number): [string, string] {
  return [ 'USER' + ('' + userNumber).padStart(usernameSize - 4, '0'), crypto.randomBytes(tokenSize / 2).toString('hex')]
}

export function createAuthExchange (id: number, user: string, token: string): [ Buffer, Buffer ] {
  return [
    serialize({
      requestId: id,
      type: BtpType.TYPE_MESSAGE,
      data: {
        protocolData: [{
          protocolName: 'auth',
          contentType: MIME_APPLICATION_OCTET_STREAM,
          data: Buffer.from([])
        }, {
          protocolName: 'auth_username',
          contentType: MIME_TEXT_PLAIN_UTF8,
          data: Buffer.from(user, 'utf8')
        }, {
          protocolName: 'auth_token',
          contentType: MIME_TEXT_PLAIN_UTF8,
          data: Buffer.from(token, 'utf8')
        }]
      } as BtpMessage
    } as BtpMessagePacket),
    serialize({
      requestId: id,
      type: BtpType.TYPE_RESPONSE,
      data: {
        protocolData: []
      } as BtpMessage
    } as BtpResponsePacket)
  ]
}

export function createSuccessfulMessageExchange (id: number, destination: string, amount: string, expiry?: Date): [ Buffer, Buffer ] {
  const [executionCondition, fulfillment] = createConditionAndFulfillment()
  const expiresAt = expiry || new Date(Date.now() + 30000)
  return [
    serialize({
      requestId: id,
      type: BtpType.TYPE_MESSAGE,
      data: {
        protocolData: [{
          protocolName: 'ilp',
          contentType: MIME_APPLICATION_OCTET_STREAM,
          data: serializeIlpPrepare({
            destination,
            amount,
            executionCondition,
            expiresAt,
            data: fulfillment
          } as IlpPrepare)
        } as ProtocolData]
      } as BtpMessage
    } as BtpMessagePacket),
    serialize({
      requestId: id,
      type: BtpType.TYPE_RESPONSE,
      data: {
        protocolData: [{
          protocolName: 'ilp',
          contentType: MIME_APPLICATION_OCTET_STREAM,
          data: serializeIlpFulfill({
            fulfillment,
            data: Buffer.allocUnsafe(0)
          } as IlpFulfill)
        } as ProtocolData]
      } as BtpMessage
    } as BtpResponsePacket)
  ]
}

export function createFailedMessageExchange (id: number, destination: string, amount: string, expiry?: Date, errorCode?: string): [ Buffer, Buffer ] {
  const [executionCondition, fulfillment] = createConditionAndFulfillment()
  const expiresAt = expiry || new Date(Date.now() + 30000)
  const code = errorCode || 'F00'
  return [
    serialize({
      requestId: id,
      type: BtpType.TYPE_MESSAGE,
      data: {
        protocolData: [{
          protocolName: 'ilp',
          contentType: MIME_APPLICATION_OCTET_STREAM,
          data: serializeIlpPrepare({
            destination,
            amount,
            executionCondition,
            expiresAt,
            data: fulfillment
          } as IlpPrepare)
        } as ProtocolData]
      } as BtpMessage
    } as BtpMessagePacket),
    serialize({
      requestId: id,
      type: BtpType.TYPE_RESPONSE,
      data: {
        protocolData: [{
          protocolName: 'ilp',
          contentType: MIME_APPLICATION_OCTET_STREAM,
          data: serializeIlpReject({
            message: `REJECT:${id}:REJECT`,
            triggeredBy: destination,
            code,
            data: Buffer.from(destination + ':' + amount, 'utf8')
          } as IlpReject)
        } as ProtocolData]
      } as BtpMessage
    } as BtpResponsePacket)
  ]
}
