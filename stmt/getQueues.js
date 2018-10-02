const execute = require('../lib/execute')

const QUEUES_SELECT = 'SELECT * FROM queues'

module.exports = (mysql) => () => execute(mysql, QUEUES_SELECT, [])
