const execute = require('../lib/execute')
const defaultToZero = require('../lib/defaultToZero')

const AGENT_SUMMARY_UPDATE = `
  INSERT INTO agent_summary (
    agent_id,
    queue_id,
    period,
    in_completed,
    out_completed,
    out_discarded,
    auto_completed,
    in_call_secs,
    out_call_secs,
    auto_call_secs,
    rejections,
    login_secs,
    pause_secs,
    in_ring_secs,
    out_ring_secs
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    in_completed = in_completed + VALUES(in_completed),
    out_completed = out_completed + VALUES(out_completed),
    out_discarded = out_discarded + VALUES(out_discarded),
    auto_completed = auto_completed + VALUES(auto_completed),
    in_call_secs = in_call_secs + VALUES(in_call_secs),
    out_call_secs = out_call_secs + VALUES(out_call_secs),
    auto_call_secs = auto_call_secs + VALUES(auto_call_secs),
    rejections = rejections + VALUES(rejections),
    login_secs = login_secs + VALUES(login_secs),
    pause_secs = pause_secs + VALUES(pause_secs),
    in_ring_secs = in_ring_secs + VALUES(in_ring_secs),
    out_ring_secs = out_ring_secs + VALUES(out_ring_secs)
`

module.exports = (mysql) => (summaryUpdate) => execute(mysql, AGENT_SUMMARY_UPDATE, [
  summaryUpdate.agentId,
  summaryUpdate.queueId,
  summaryUpdate.period,
  summaryUpdate.inCompleted,
  summaryUpdate.outCompleted,
  summaryUpdate.outDiscarded,
  summaryUpdate.autoCompleted,
  summaryUpdate.inCallSecs,
  summaryUpdate.outCallSecs,
  summaryUpdate.autoCallSecs,
  summaryUpdate.rejections,
  summaryUpdate.loginSecs,
  summaryUpdate.pauseSecs,
  summaryUpdate.inRingSecs,
  summaryUpdate.outRingSecs
].map(defaultToZero))
