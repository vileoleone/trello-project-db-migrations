const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const AGENT_UPDATE_PAUSE = `UPDATE agents SET pause_at = ?, status = ?, pause_reason_id = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_PAUSE, [
  timestampSecsToDate(agent.pauseAt),
  agent.status,
  agent.pauseReasonId,
  agent.id
])
