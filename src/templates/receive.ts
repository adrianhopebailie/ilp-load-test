export function render (requestId: number) {
  return `        <org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler guiclass="org.interledger.jmeter.samplers.ReceiveIlpOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler" testname="Async ILP Fulfill over BTP" enabled="true">
          <stringProp name="btpRequestId">${requestId}</stringProp>
          <stringProp name="readTimeout">30000</stringProp>
        </org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler>
        <hashTree>
          <eu.luminis.jmeter.assertions.BinaryContentAssertion guiclass="eu.luminis.jmeter.assertions.BinaryContentAssertionGUI" testclass="eu.luminis.jmeter.assertions.BinaryContentAssertion" testname="Binary Response Assertion" enabled="true">
            <stringProp name="compareValue">\${FULFILLMENT_${requestId}}</stringProp>
            <stringProp name="comparisonType">Contains</stringProp>
          </eu.luminis.jmeter.assertions.BinaryContentAssertion>
          <hashTree/>
        </hashTree>`
}
