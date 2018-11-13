export function render (requestId: number, address: string, amount: number, expiry: number) {
  return `        <org.interledger.jmeter.samplers.SendIlpOverBtpSampler guiclass="org.interledger.jmeter.samplers.SendIlpOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.SendIlpOverBtpSampler" testname="ILP Prepare over BTP" enabled="true">
          <stringProp name="btpRequestId">${requestId}</stringProp>
          <stringProp name="address">${address}</stringProp>
          <stringProp name="amount">${amount}</stringProp>
          <stringProp name="expiry">${expiry}</stringProp>
          <stringProp name="condition"></stringProp>
          <stringProp name="fulfillment">\${__RandomString(64,0123456789abcdef,FULFILLMENT_${requestId})}</stringProp>
          <boolProp name="deriveCondition">true</boolProp>
          <stringProp name="packetData">\${FULFILLMENT_${requestId}}</stringProp>
          <stringProp name="readTimeout">30000</stringProp>
        </org.interledger.jmeter.samplers.SendIlpOverBtpSampler>
        <hashTree/>`
}
