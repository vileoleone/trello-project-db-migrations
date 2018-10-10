import execute from '../lib/execute'

const AGENT_SELECT = 'SELECT * FROM agents WHERE id = ?'

export default (mysql) => async (agentId) => (await execute(mysql, AGENT_SELECT, [agentId]))[0]
