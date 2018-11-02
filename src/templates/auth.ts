export function render (requestData: string, responseData: string) {
  return `        <eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler testname="BTP auth packet" guiclass="eu.luminis.jmeter.wssampler.RequestResponseWebSocketSamplerGui" testclass="eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler" enabled="true">
          <boolProp name="createNewConnection">false</boolProp>
          <boolProp name="binaryPayload">true</boolProp>
          <stringProp name="requestData">${requestData}</stringProp>
          <stringProp name="readTimeout">6000</stringProp>
        </eu.luminis.jmeter.wssampler.RequestResponseWebSocketSampler>
        <hashTree>
        <eu.luminis.jmeter.assertions.BinaryContentAssertion guiclass="eu.luminis.jmeter.assertions.BinaryContentAssertionGUI" testclass="eu.luminis.jmeter.assertions.BinaryContentAssertion" testname="Assert is valid auth reponse" enabled="true">
          <stringProp name="compareValue">${responseData}</stringProp>
          <stringProp name="comparisonType">Equals</stringProp>
        </eu.luminis.jmeter.assertions.BinaryContentAssertion>
        <hashTree/>
      </hashTree>
`
}
