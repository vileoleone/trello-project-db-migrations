const execute = require('../lib/execute')

const CALLS_SELECT_ONGOING = "SELECT * FROM calls WHERE status IN ('ENQUEUED', 'DIALING', 'RINGING', 'CONNECTED')"

module.exports = (mysql) => () => execute(mysql, CALLS_SELECT_ONGOING, [])
