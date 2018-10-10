import execute from '../lib/execute'

const CALLS_SELECT_ONGOING = "SELECT * FROM calls WHERE status IN ('ENQUEUED', 'DIALING', 'RINGING', 'CONNECTED')"

export default (mysql) => () => execute(mysql, CALLS_SELECT_ONGOING, [])
