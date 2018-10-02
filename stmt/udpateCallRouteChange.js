const execute = require('../lib/execute')

const CALL_UPDATE_ROUTECHANGE = `
  UPDATE calls SET
    trunking_id = ?
  WHERE id = ?
`

module.exports = (mysql) => ({callId, trunkingId}) => execute(mysql, CALL_UPDATE_ROUTECHANGE, [
  trunkingId,
  callId
])
