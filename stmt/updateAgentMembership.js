import execute from '../lib/execute'

const MEMBERSHIP_UPDATE = `
  UPDATE memberships
  SET status = ?,
  penalty = ?
  WHERE agent_id = ?
  AND queue_id = ?
`

export default (mysql) => ({ agentId, queueId, penalty, status }) => execute(mysql, MEMBERSHIP_UPDATE, [status, penalty, agentId, queueId])
