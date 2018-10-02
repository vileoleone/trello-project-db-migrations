const execute = require('../lib/execute')

const AGENT_HISTORY_SELECT_LATEST = `SELECT * FROM agent_history ORDER BY created_at DESC, id DESC LIMIT 1`

module.exports = (mysql) => async () => (await execute(mysql, AGENT_HISTORY_SELECT_LATEST, []))[0]
