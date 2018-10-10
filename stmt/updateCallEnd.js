import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'
import defaultToZero from '../lib/defaultToZero'

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

export default (mysql) => (call) => execute(mysql, CALL_UPDATE_CALLEND, [
  timestampSecsToDate(call.hangupAt),
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
