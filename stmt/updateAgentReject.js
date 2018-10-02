const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_REJECT = `
  UPDATE agents SET
    talking_since = ?,
    talking_call_id = ?,
    status = ?,
    last_call_rejected_at = ?
  WHERE id = ?
`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_REJECT, [
  toDate(agent.talkingSince),
  agent.talkingCallId,
  agent.status,
  toDate(agent.lastCallRejectedAt),
  agent.id
])
