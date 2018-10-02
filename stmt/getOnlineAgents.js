const execute = require('../lib/execute')

const AGENTS_SELECT_ONLINE = "SELECT * FROM agents where status != 'OFFLINE'"

module.exports = (mysql) => () => execute(mysql, AGENTS_SELECT_ONLINE, [])
