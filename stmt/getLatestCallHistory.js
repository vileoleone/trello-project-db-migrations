import execute from '../lib/execute'

const CALL_HISTORY_SELECT_LATEST = `SELECT * FROM call_history ORDER BY created_at DESC, id DESC LIMIT 1`

export default (mysql) => async () => (await execute(mysql, CALL_HISTORY_SELECT_LATEST, []))[0]
