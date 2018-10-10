import execute from '../lib/execute'
import defaultToZero from '../lib/defaultToZero'

const CALL_UPDATE_REJECT = `
  UPDATE calls SET
    status = ?,
    agent_id = ?,
    ring_secs = ring_secs + ?
  WHERE id = ?
`

export default (mysql) => (callUpdate) => execute(mysql, CALL_UPDATE_REJECT, [
  callUpdate.status,
  callUpdate.agentId,
  defaultToZero(callUpdate.ringSecs),
  callUpdate.id
])
