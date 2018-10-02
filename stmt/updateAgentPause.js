const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_PAUSE = `UPDATE agents SET pause_at = ?, status = ?, pause_reason_id = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_PAUSE, [
  toDate(agent.pauseAt),
  agent.status,
  agent.pauseReasonId,
  agent.id
])
