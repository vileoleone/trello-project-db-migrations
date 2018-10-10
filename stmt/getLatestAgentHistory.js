import execute from '../lib/execute'

const AGENT_HISTORY_SELECT_LATEST = `SELECT * FROM agent_history ORDER BY created_at DESC, id DESC LIMIT 1`

export default (mysql) => async () => (await execute(mysql, AGENT_HISTORY_SELECT_LATEST, []))[0]
