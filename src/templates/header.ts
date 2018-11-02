export function render (server: string, port: string) {
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
      <CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="Users" enabled="true">
        <stringProp name="filename">./user.csv</stringProp>
        <stringProp name="fileEncoding">UTF-8</stringProp>
        <stringProp name="variableNames">ACCOUNT, ACCOUNT_HEX, TOKEN, PORT</stringProp>
        <boolProp name="ignoreFirstLine">false</boolProp>
        <stringProp name="delimiter">,</stringProp>
        <boolProp name="quotedData">false</boolProp>
        <boolProp name="recycle">true</boolProp>
        <boolProp name="stopThread">false</boolProp>
        <stringProp name="shareMode">shareMode.all</stringProp>
      </CSVDataSet>
      <hashTree/>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1</stringProp>
        <stringProp name="ThreadGroup.ramp_time">1</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
      </ThreadGroup>
      <hashTree>
        <eu.luminis.jmeter.wssampler.OpenWebSocketSampler guiclass="eu.luminis.jmeter.wssampler.OpenWebSocketSamplerGui" testclass="eu.luminis.jmeter.wssampler.OpenWebSocketSampler" testname="Open Connection" enabled="true">
          <boolProp name="TLS">false</boolProp>
          <stringProp name="server">${server}</stringProp>
          <stringProp name="port">\${PORT}</stringProp>
          <stringProp name="path"></stringProp>
          <stringProp name="connectTimeout">20000</stringProp>
          <stringProp name="readTimeout">6000</stringProp>
        </eu.luminis.jmeter.wssampler.OpenWebSocketSampler>
        <hashTree/>
`
}
