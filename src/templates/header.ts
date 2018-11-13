export function render (threads: number) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <jmeterTestPlan version="1.2" properties="5.0" jmeter="4.1-SNAPSHOT.20180511">
    <hashTree>
      <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
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
        <CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="User Data" enabled="true">
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
          <stringProp name="ThreadGroup.num_threads">${threads}</stringProp>
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
            <stringProp name="readTimeout">20000</stringProp>
          </eu.luminis.jmeter.wssampler.OpenWebSocketSampler>
          <hashTree/>
          <org.interledger.jmeter.samplers.AuthOverBtpSampler guiclass="org.interledger.jmeter.samplers.AuthOverBtpSamplerGui" testclass="org.interledger.jmeter.samplers.AuthOverBtpSampler" testname="Auth over BTP" enabled="true">
            <stringProp name="btpRequestId">1</stringProp>
            <stringProp name="username">\${USER}</stringProp>
            <stringProp name="token">\${TOKEN}</stringProp>
            <stringProp name="readTimeout">10000</stringProp>
          </org.interledger.jmeter.samplers.AuthOverBtpSampler>
          <hashTree/>
`
}
