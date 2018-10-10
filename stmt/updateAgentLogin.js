const execute = require('../lib/execute')
const timestampSecsToDate = require('../lib/timestampSecsToDate')

const AGENT_UPDATE_LOGIN = `UPDATE agents SET status = ?, login_at = ?, login_extension = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_LOGIN, [
  agent.status,
  timestampSecsToDate(agent.loginAt),
  agent.loginExtension,
  agent.id
])
