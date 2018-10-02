const execute = require('../lib/execute')

const AGENT_SELECT = 'SELECT * FROM agents WHERE id = ?'

module.exports = (mysql) => async (agentId) => (await execute(mysql, AGENT_SELECT, [agentId]))[0]
