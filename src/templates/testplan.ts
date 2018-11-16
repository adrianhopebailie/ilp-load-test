export function render (users: number, loops: number, messages: number, destination: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <jmeterTestPlan version="1.2" properties="5.0" jmeter="4.1-SNAPSHOT.20180511">
    <hashTree>
      <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="ILP over BTP Load Test" enabled="true">
        <stringProp name="TestPlan.comments"></stringProp>
        <boolProp name="TestPlan.functional_mode">false</boolProp>
        <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
        <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
        <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
          <collectionProp name="Arguments.arguments"/>
        </elementProp>
        <stringProp name="TestPlan.user_define_classpath"></stringProp>
      </TestPlan>
      <hashTree>
        <Arguments guiclass="ArgumentsPanel" testclass="Arguments" testname="Test Parameters" enabled="true">
          <collectionProp name="Arguments.arguments">
            <elementProp name="MESSAGES" elementType="Argument">
              <stringProp name="Argument.name">MESSAGES</stringProp>
              <stringProp name="Argument.value">\${__P(messages,${messages})}</stringProp>
              <stringProp name="Argument.desc">Number of messages to send</stringProp>
              <stringProp name="Argument.metadata">=</stringProp>
            </elementProp>
          </collectionProp>
        </Arguments>
        <hashTree/>
        <CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="Test Data" enabled="true">
          <stringProp name="delimiter">,</stringProp>
          <stringProp name="fileEncoding">UTF-8</stringProp>
          <stringProp name="filename">./users.csv</stringProp>
          <boolProp name="ignoreFirstLine">false</boolProp>
          <boolProp name="quotedData">false</boolProp>
          <boolProp name="recycle">true</boolProp>
          <stringProp name="shareMode">shareMode.all</stringProp>
          <boolProp name="stopThread">false</boolProp>
          <stringProp name="variableNames">USER,TOKEN,SERVER,PORT</stringProp>
        </CSVDataSet>
        <hashTree/>
        <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
          <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
          <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
            <boolProp name="LoopController.continue_forever">false</boolProp>
            <stringProp name="LoopController.loops">1</stringProp>
          </elementProp>
          <stringProp name="ThreadGroup.num_threads">${users}</stringProp>
          <stringProp name="ThreadGroup.ramp_time">1</stringProp>
          <boolProp name="ThreadGroup.scheduler">false</boolProp>
          <stringProp name="ThreadGroup.duration"></stringProp>
          <stringProp name="ThreadGroup.delay"></stringProp>
        </ThreadGroup>
        <hashTree>
          <eu.luminis.jmeter.wssampler.OpenWebSocketSampler guiclass="eu.luminis.jmeter.wssampler.OpenWebSocketSamplerGui" testclass="eu.luminis.jmeter.wssampler.OpenWebSocketSampler" testname="WebSocket Open Connection" enabled="true">
            <boolProp name="TLS">false</boolProp>
            <stringProp name="server">\${SERVER}</stringProp>
            <stringProp name="port">\${PORT}</stringProp>
            <stringProp name="path"></stringProp>
            <stringProp name="connectTimeout">20000</stringProp>
            <stringProp name="readTimeout">5000</stringProp>
          </eu.luminis.jmeter.wssampler.OpenWebSocketSampler>
          <hashTree/>
          <org.interledger.jmeter.samplers.AuthOverBtpSampler guiclass="org.interledger.jmeter.samplers.AuthOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.AuthOverBtpSampler" testname="Auth over BTP" enabled="true">
            <stringProp name="btpRequestId">1</stringProp>
            <stringProp name="username">\${USER}</stringProp>
            <stringProp name="token">\${TOKEN}</stringProp>
            <stringProp name="readTimeout">5000</stringProp>
          </org.interledger.jmeter.samplers.AuthOverBtpSampler>
          <hashTree/>
          <LoopController guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
            <boolProp name="LoopController.continue_forever">true</boolProp>
            <stringProp name="LoopController.loops">${loops}</stringProp>
          </LoopController>
          <hashTree>
            <LoopController guiclass="LoopControlPanel" testclass="LoopController" testname="Send Loop Controller" enabled="true">
              <boolProp name="LoopController.continue_forever">true</boolProp>
              <stringProp name="LoopController.loops">\${MESSAGES}</stringProp>
            </LoopController>
            <hashTree>
              <CounterConfig guiclass="CounterConfigGui" testclass="CounterConfig" testname="Request ID Counter" enabled="true">
                <stringProp name="CounterConfig.start">2</stringProp>
                <stringProp name="CounterConfig.end"></stringProp>
                <stringProp name="CounterConfig.incr">1</stringProp>
                <stringProp name="CounterConfig.name">REQUEST_ID</stringProp>
                <stringProp name="CounterConfig.format"></stringProp>
                <boolProp name="CounterConfig.per_user">true</boolProp>
                <boolProp name="CounterConfig.reset_on_tg_iteration">true</boolProp>
              </CounterConfig>
              <hashTree/>
              <org.interledger.jmeter.samplers.SendIlpOverBtpSampler guiclass="org.interledger.jmeter.samplers.SendIlpOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.SendIlpOverBtpSampler" testname="ILP Prepare over BTP" enabled="true">
                <stringProp name="btpRequestId">\${REQUEST_ID}</stringProp>
                <stringProp name="address">${destination}</stringProp>
                <stringProp name="amount">1</stringProp>
                <stringProp name="expiry">30000</stringProp>
                <stringProp name="condition"></stringProp>
                <stringProp name="fulfillment">\${__RandomString(64,0123456789abcdef,FULFILLMENT)}</stringProp>
                <boolProp name="deriveCondition">true</boolProp>
                <stringProp name="packetData">\${FULFILLMENT}</stringProp>
                <stringProp name="readTimeout">5000</stringProp>
              </org.interledger.jmeter.samplers.SendIlpOverBtpSampler>
              <hashTree/>
            </hashTree>
            <LoopController guiclass="LoopControlPanel" testclass="LoopController" testname="Receive Loop Controller" enabled="true">
              <boolProp name="LoopController.continue_forever">true</boolProp>
              <stringProp name="LoopController.loops">\${MESSAGES}</stringProp>
            </LoopController>
            <hashTree>
              <CounterConfig guiclass="CounterConfigGui" testclass="CounterConfig" testname="Receive ID Counter" enabled="true">
                <stringProp name="CounterConfig.start">2</stringProp>
                <stringProp name="CounterConfig.end"></stringProp>
                <stringProp name="CounterConfig.incr">1</stringProp>
                <stringProp name="CounterConfig.name">RESPONSE_ID</stringProp>
                <stringProp name="CounterConfig.format"></stringProp>
                <boolProp name="CounterConfig.per_user">true</boolProp>
                <boolProp name="CounterConfig.reset_on_tg_iteration">true</boolProp>
              </CounterConfig>
              <hashTree/>
              <org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler guiclass="org.interledger.jmeter.samplers.ReceiveIlpOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler" testname="Async ILP Fulfill over BTP" enabled="true">
                <stringProp name="btpRequestId">\${RESPONSE_ID}</stringProp>
                <stringProp name="readTimeout">5000</stringProp>
              </org.interledger.jmeter.samplers.ReceiveIlpOverBtpSampler>
              <hashTree/>
            </hashTree>
          </hashTree>
          <eu.luminis.jmeter.wssampler.CloseWebSocketSampler guiclass="eu.luminis.jmeter.wssampler.CloseWebSocketSamplerGui" testclass="eu.luminis.jmeter.wssampler.CloseWebSocketSampler" testname="WebSocket Close" enabled="true">
            <stringProp name="statusCode">1000</stringProp>
            <stringProp name="readTimeout">5000</stringProp>
          </eu.luminis.jmeter.wssampler.CloseWebSocketSampler>
          <hashTree/>
        </hashTree>
        <ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="Results" enabled="true">
          <boolProp name="ResultCollector.error_logging">true</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time>
              <latency>true</latency>
              <timestamp>true</timestamp>
              <success>true</success>
              <label>true</label>
              <code>true</code>
              <message>true</message>
              <threadName>true</threadName>
              <dataType>true</dataType>
              <encoding>false</encoding>
              <assertions>true</assertions>
              <subresults>false</subresults>
              <responseData>false</responseData>
              <samplerData>false</samplerData>
              <xml>false</xml>
              <fieldNames>true</fieldNames>
              <responseHeaders>false</responseHeaders>
              <requestHeaders>false</requestHeaders>
              <responseDataOnError>false</responseDataOnError>
              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
              <assertionsResultsToSave>0</assertionsResultsToSave>
              <bytes>true</bytes>
              <sentBytes>true</sentBytes>
              <threadCounts>true</threadCounts>
              <idleTime>true</idleTime>
              <connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>
        <ResultCollector guiclass="SummaryReport" testclass="ResultCollector" testname="Summary" enabled="true">
          <boolProp name="ResultCollector.error_logging">false</boolProp>
          <objProp>
            <name>saveConfig</name>
            <value class="SampleSaveConfiguration">
              <time>true</time>
              <latency>true</latency>
              <timestamp>true</timestamp>
              <success>true</success>
              <label>true</label>
              <code>true</code>
              <message>true</message>
              <threadName>true</threadName>
              <dataType>false</dataType>
              <encoding>false</encoding>
              <assertions>true</assertions>
              <subresults>true</subresults>
              <responseData>false</responseData>
              <samplerData>false</samplerData>
              <xml>false</xml>
              <fieldNames>true</fieldNames>
              <responseHeaders>false</responseHeaders>
              <requestHeaders>false</requestHeaders>
              <responseDataOnError>false</responseDataOnError>
              <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
              <assertionsResultsToSave>0</assertionsResultsToSave>
              <bytes>true</bytes>
              <sentBytes>true</sentBytes>
              <threadCounts>true</threadCounts>
              <idleTime>true</idleTime>
              <connectTime>true</connectTime>
            </value>
          </objProp>
          <stringProp name="filename"></stringProp>
        </ResultCollector>
        <hashTree/>
      </hashTree>
    </hashTree>
  </jmeterTestPlan>
  `
}
