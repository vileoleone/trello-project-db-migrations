const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_HISTORY_INSERT = 'INSERT INTO agent_history (agent_id, created_at, event, queue_id, event_info) VALUES (?, ?, ?, ?, ?)'

module.exports = (mysql) => (event) => execute(mysql, AGENT_HISTORY_INSERT, [
  event.agent,
  toDate(event.timestamp),
  event.event,
  event.queue,
  JSON.stringify(event)
])
