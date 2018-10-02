const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_ABANDON = 'UPDATE agents SET talking_since = ?, talking_call_id = ?, status = ? WHERE id = ?'

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_ABANDON, [
  toDate(agent.talkingSince),
  agent.talkingCallId,
  agent.status,
  agent.id
])
