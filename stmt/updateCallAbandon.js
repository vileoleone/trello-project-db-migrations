const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const CALL_UPDATE_ABANDON = `
  UPDATE calls SET
    agent_id = ?,
    hangup_at = ?,
    hold_secs = ?,
    initial_position = ?,
    abandon_position = ?,
    abandon_key = ?,
    hangup_cause_id = ?,
    status = ?,
    reason = ?
  WHERE id = ?
`

module.exports = (mysql) => (call) => execute(mysql, CALL_UPDATE_ABANDON, [
  call.agentId,
  timestampSecsToDate(call.hangupAt),
  call.holdSecs,
  call.initialPosition,
  call.abandonPosition,
  call.abandonKey,
  call.hangupCauseId,
  call.status,
  call.reason,
  call.id
])
