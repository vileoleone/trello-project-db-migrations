const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const AGENT_UPDATE_CALLEND = 'UPDATE agents SET last_call_answered_at = ?, talking_since = ?, talking_call_id = ?, status = ? WHERE id = ?'

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_CALLEND, [
  timestampSecsToDate(agent.lastCallAnsweredAt),
  timestampSecsToDate(agent.talkingSince),
  agent.callId,
  agent.status,
  agent.id
])
