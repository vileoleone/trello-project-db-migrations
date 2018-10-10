import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

const CALL_HISTORY_INSERT = 'INSERT INTO call_history (call_id, created_at, event, queue_id, agent_id, event_info) VALUES (?, ?, ?, ?, ?, ?)'

export default (mysql) => (event) => execute(mysql, CALL_HISTORY_INSERT, [
  event.callId,
  timestampSecsToDate(event.timestamp),
  event.event,
  event.queue,
  event.agent,
  JSON.stringify(event)
])
