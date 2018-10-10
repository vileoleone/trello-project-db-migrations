import execute from '../lib/execute'

const MEMBERSHIPS_SELECT_LOGGED_IN = "SELECT * FROM memberships WHERE status <> 'OFFLINE'"

export default (mysql) => () => execute(mysql, MEMBERSHIPS_SELECT_LOGGED_IN, [])
