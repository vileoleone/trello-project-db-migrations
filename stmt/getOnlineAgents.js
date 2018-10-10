import execute from '../lib/execute'

const AGENTS_SELECT_ONLINE = "SELECT * FROM agents where status != 'OFFLINE'"

export default (mysql) => () => execute(mysql, AGENTS_SELECT_ONLINE, [])
