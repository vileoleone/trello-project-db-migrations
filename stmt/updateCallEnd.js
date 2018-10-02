const execute = require('../lib/execute')
const toDate = require('../lib/toDate')
const defaultToZero = require('../lib/defaultToZero')

const CALL_UPDATE_CALLEND = `
  UPDATE calls SET
    hangup_at = ?, 
    hold_secs = hold_secs + ?,
    talk_secs = talk_secs + ?,
    ring_secs = ring_secs + ?,
    initial_position = ?,
    transferred_to = ?,
    hangup_cause_id = ?,
    status = ?,
    reason = ?
  WHERE id = ?
`

module.exports = (mysql) => (call) => execute(mysql, CALL_UPDATE_CALLEND, [
  toDate(call.hangupAt),
  defaultToZero(call.holdSecs),
  defaultToZero(call.talkSecs),
  defaultToZero(call.ringSecs),
  call.initialPosition,
  call.transferredTo,
  call.hangupCauseId,
  call.status,
  call.reason,
  call.id
])
