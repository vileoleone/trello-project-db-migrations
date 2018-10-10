import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

const AGENT_UPDATE_LOGOFF = `UPDATE agents SET status = ?, login_at = ?, logout_at = ?, login_extension = ? WHERE id = ?`

export default (mysql) => (agent) => execute(mysql, AGENT_UPDATE_LOGOFF, [
  agent.status,
  timestampSecsToDate(agent.loginAt),
  timestampSecsToDate(agent.logoutAt),
  agent.loginExtension,
  agent.id
])
