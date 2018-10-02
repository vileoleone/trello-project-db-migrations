const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const AGENT_UPDATE_LOGIN = `UPDATE agents SET status = ?, login_at = ?, login_extension = ? WHERE id = ?`

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_LOGIN, [
  agent.status,
  toDate(agent.loginAt),
  agent.loginExtension,
  agent.id
])
