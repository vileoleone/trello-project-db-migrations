const execute = require('../lib/execute')

const MEMBERSHIPS_SELECT_LOGGED_IN = "SELECT * FROM memberships WHERE status <> 'OFFLINE'"

module.exports = (mysql) => () => execute(mysql, MEMBERSHIPS_SELECT_LOGGED_IN, [])
