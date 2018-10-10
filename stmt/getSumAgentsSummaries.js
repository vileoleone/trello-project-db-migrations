import execute from '../lib/execute'

const AGENTS_SUMMARIES_SUM = `SELECT
  agent_id,
  queue_id,
  SUM(in_completed) AS in_completed,
  SUM(out_completed) AS out_completed,
  SUM(out_discarded) AS out_discarded,
  SUM(auto_completed) AS auto_completed,
  SUM(in_call_secs) AS in_call_secs,
  SUM(out_call_secs) AS out_call_secs,
  SUM(auto_call_secs) AS auto_call_secs,
  SUM(rejections) AS rejections,
  SUM(login_secs) AS login_secs,
  SUM(pause_secs) AS pause_secs,
  SUM(in_ring_secs) AS in_ring_secs,
  SUM(out_ring_secs) AS out_ring_secs
  FROM agent_summary
  WHERE period BETWEEN ? AND ?
  GROUP BY agent_id, queue_id
`

export default (mysql) => async (start, end) => execute(mysql, AGENTS_SUMMARIES_SUM, [start, end])
