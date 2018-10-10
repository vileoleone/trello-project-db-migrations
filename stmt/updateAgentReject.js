const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const AGENT_UPDATE_REJECT = `
  UPDATE agents SET
    talking_since = ?,
    talking_call_id = ?,
    status = ?,
    last_call_rejected_at = ?
  WHERE id = ?
`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_REJECT, [
  timestampSecsToDate(agent.talkingSince),
  agent.talkingCallId,
  agent.status,
  timestampSecsToDate(agent.lastCallRejectedAt),
  agent.id
])
