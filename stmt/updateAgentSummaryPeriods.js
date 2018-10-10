import execute from '../lib/execute'
import defaultToZero from '../lib/defaultToZero'

export default (mysql) => (values) => {
  const valuesSql = values.map(value => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  const sql = `INSERT INTO agent_summary
    (agent_id, queue_id, period, login_secs, pause_secs, in_ring_secs, out_ring_secs, in_call_secs, out_call_secs, auto_call_secs) VALUES
    ${valuesSql.join(',')}
    ON DUPLICATE KEY UPDATE
    login_secs = login_secs + VALUES(login_secs),
    pause_secs = pause_secs + VALUES(pause_secs),
    in_ring_secs = in_ring_secs + VALUES(in_ring_secs),
    out_ring_secs = out_ring_secs + VALUES(out_ring_secs),
    in_call_secs = in_call_secs + VALUES(in_call_secs),
    out_call_secs = out_call_secs + VALUES(out_call_secs),
    auto_call_secs = auto_call_secs + VALUES(auto_call_secs)`
  return execute(mysql, sql, values.reduce((acc, val) => [
    ...acc,
    val.agentId,
    val.queueId,
    val.period,
    val.loginSecs,
    val.pauseSecs,
    val.inRingSecs,
    val.outRingSecs,
    val.inCallSecs,
    val.outCallSecs,
    val.autoCallSecs
  ], []).map(defaultToZero))
}
