import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

const AGENT_UPDATE_UNPAUSE = `UPDATE agents SET pause_at = ?, status = ?, pause_reason_id = ?, last_pause_at = ? WHERE id = ?`

export default (mysql) => (agent) => execute(mysql, AGENT_UPDATE_UNPAUSE, [
  timestampSecsToDate(agent.pauseAt),
  agent.status,
  agent.pauseReasonId,
  timestampSecsToDate(agent.lastPauseAt),
  agent.id
])
