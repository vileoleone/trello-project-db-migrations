const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const CALL_UPDATE_CONNECTED = `
  UPDATE calls SET
    status = ?,
    bridged_call_id = ?,
    hold_secs = hold_secs + ?,
    ring_secs = ring_secs + ?,
    answer_at = ?
  WHERE id = ?
`

module.exports = (mysql) => (call, event) => execute(mysql, CALL_UPDATE_CONNECTED, [
  call.status,
  call.bridgedCallId,
  event.waitSecs,
  event.ringSecs,
  timestampSecsToDate(event.timestamp),
  call.id
])
