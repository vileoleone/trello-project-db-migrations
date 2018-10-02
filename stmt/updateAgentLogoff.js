const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_LOGOFF = `UPDATE agents SET status = ?, login_at = ?, logout_at = ?, login_extension = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_LOGOFF, [
  agent.status,
  toDate(agent.loginAt),
  toDate(agent.logoutAt),
  agent.loginExtension,
  agent.id
])
