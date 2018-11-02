export function render (requestData: string, responseData: string) {
  return `        <eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler testname="ILP Prepare (Success)" enabled="true" guiclass="eu.luminis.jmeter.wssampler.RequestResponseWebSocketSamplerGui" testclass="eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler">
          <boolProp name="createNewConnection">false</boolProp>
          <boolProp name="binaryPayload">true</boolProp>
          <stringProp name="requestData">${requestData}</stringProp>
          <stringProp name="readTimeout">6000</stringProp>
        </eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler>
        <hashTree>
        <eu.luminis.jmeter.assertions.BinaryContentAssertion testname="Assert is valid ILP Fulfillment" enabled="true" guiclass="eu.luminis.jmeter.assertions.BinaryContentAssertionGUI" testclass="eu.luminis.jmeter.assertions.BinaryContentAssertion">
          <stringProp name="compareValue">${responseData}</stringProp>
          <stringProp name="comparisonType">Equals</stringProp>
        </eu.luminis.jmeter.assertions.BinaryContentAssertion>
        <hashTree/>
      </hashTree>
`
}
