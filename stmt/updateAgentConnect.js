const execute = require('../lib/execute')

const AGENT_UPDATE_STATUS = 'UPDATE agents SET status = ? WHERE id = ?'

module.exports = (mysql) => (agent) => execute(mysql, AGENT_UPDATE_STATUS, [agent.status, agent.id])
