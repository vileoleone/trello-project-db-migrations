const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const CALL_HISTORY_INSERT = 'INSERT INTO call_history (call_id, created_at, event, queue_id, agent_id, event_info) VALUES (?, ?, ?, ?, ?, ?)'

module.exports = (mysql) => (event) => execute(mysql, CALL_HISTORY_INSERT, [
  event.callId,
  timestampSecsToDate(event.timestamp),
  event.event,
  event.queue,
  event.agent,
  JSON.stringify(event)
])
