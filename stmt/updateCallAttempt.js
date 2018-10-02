const execute = require('../lib/execute')

const CALL_UPDATE_ATTEMPT = `
  UPDATE calls SET
    agent_id = ?,
    agent_offers = agent_offers + 1
  WHERE id = ?
`

module.exports = (mysql) => (call) => execute(mysql, CALL_UPDATE_ATTEMPT, [call.agentId, call.id])
