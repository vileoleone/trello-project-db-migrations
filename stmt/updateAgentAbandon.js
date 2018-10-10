const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const AGENT_UPDATE_ABANDON = 'UPDATE agents SET talking_since = ?, talking_call_id = ?, status = ? WHERE id = ?'

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_ABANDON, [
  timestampSecsToDate(agent.talkingSince),
  agent.talkingCallId,
  agent.status,
  agent.id
])
