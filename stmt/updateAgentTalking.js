const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_TALKING = `UPDATE agents SET status = ?, talking_call_id = ?, talking_since = ? where id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_TALKING, [
  agent.status,
  agent.talkingCallId,
  toDate(agent.talkingSince),
  agent.id
])
