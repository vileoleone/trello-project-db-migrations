import execute from '../lib/execute'

const QUEUES_SUMMARIES_SUM = `SELECT
  queue_id,
  SUM(in_completed) AS in_completed,
  SUM(in_transferred) AS in_transferred,
  SUM(in_abandoned) AS in_abandoned,
  SUM(in_completed_sla) AS in_completed_sla,
  SUM(in_abandoned_sla) AS in_abandoned_sla,
  SUM(out_completed) AS out_completed,
  SUM(out_transferred) AS out_transferred,
  SUM(out_discarded) AS out_discarded,
  SUM(auto_completed) AS auto_completed,
  SUM(auto_transferred) AS auto_transferred,
  SUM(auto_discarded) AS auto_discarded,
  SUM(auto_abandoned) AS auto_abandoned,
  SUM(in_call_secs) AS in_call_secs,
  SUM(out_call_secs) AS out_call_secs,
  SUM(auto_call_secs) AS auto_call_secs,
  SUM(in_hold_secs_completed) AS in_hold_secs_completed,
  SUM(in_hold_secs_abandoned) AS in_hold_secs_abandoned,
  SUM(out_try_secs_completed) AS out_try_secs_completed,
  SUM(out_try_secs_discarded) AS out_try_secs_discarded,
  SUM(auto_hold_secs_completed) AS auto_hold_secs_completed,
  SUM(auto_hold_secs_abandoned) AS auto_hold_secs_abandoned,
  SUM(auto_try_secs_completed) AS auto_try_secs_completed,
  SUM(auto_try_secs_discarded) AS auto_try_secs_discarded
  FROM queue_summary
  WHERE period BETWEEN ? AND ?
  GROUP BY queue_id
  `

export default (mysql) => async (start, end) => execute(mysql, QUEUES_SUMMARIES_SUM, [start, end])
