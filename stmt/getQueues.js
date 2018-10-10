import execute from '../lib/execute'

const QUEUES_SELECT = 'SELECT * FROM queues'

export default (mysql) => () => execute(mysql, QUEUES_SELECT, [])
