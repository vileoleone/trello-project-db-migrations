import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

const AGENT_UPDATE_PAUSE = `UPDATE agents SET pause_at = ?, status = ?, pause_reason_id = ? WHERE id = ?`

export default (mysql) => (agent) => execute(mysql, AGENT_UPDATE_PAUSE, [
  timestampSecsToDate(agent.pauseAt),
  agent.status,
  agent.pauseReasonId,
  agent.id
])
