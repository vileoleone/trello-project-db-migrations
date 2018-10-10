import execute from '../lib/execute'

const AGENT_UPDATE_STATUS = 'UPDATE agents SET status = ? WHERE id = ?'

export default (mysql) => (agent) => execute(mysql, AGENT_UPDATE_STATUS, [agent.status, agent.id])
