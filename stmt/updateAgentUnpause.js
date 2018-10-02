const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_UNPAUSE = `UPDATE agents SET pause_at = ?, status = ?, pause_reason_id = ?, last_pause_at = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_UNPAUSE, [
  toDate(agent.pauseAt),
  agent.status,
  agent.pauseReasonId,
  toDate(agent.lastPauseAt),
  agent.id
])
