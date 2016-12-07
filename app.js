// Please define your sakuraIotWsUri
// const sakuraIotWsUri = "wss://api.sakura.io/ws/v1/****"

const sakuraWs = new WebSocket(sakuraIotWsUri)

sakuraWs.onmessage = event => {
  dataJson = JSON.parse(event.data)
  console.log(event.data)
  if (dataJson.payload && dataJson.payload.channels) {
    const channels = dataJson.payload.channels

    const panelVolt = valueFromChannels(channels, 0)
    const chargeAmp = valueFromChannels(channels, 1)
    const batteryVolt = valueFromChannels(channels, 2)
    const chargeWatt = valueFromChannels(channels, 3)
    updateView(panelVolt, chargeAmp, batteryVolt, chargeWatt)
  }
}

const valueFromChannels = (channels, channel) => {
  const candidates = channels.filter((c) => {return c.channel == channel})
  if (candidates.length > 0) {
    return candidates[0].value
  }
}

const updateView = (panelVolt, chargeAmp, batteryVolt, chargeWatt) => {
  $('#panel-volt').html(panelVolt)
  $('#charge-amp').html(chargeAmp)
  $('#battery-volt').html(batteryVolt)
  $('#charge-watt').html(chargeWatt)
}
