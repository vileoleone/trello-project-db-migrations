import execute from '../lib/execute'

const MEMBERSHIP_UPDATE_PENALTY = `
  UPDATE memberships
  SET penalty = ?
  WHERE agent_id = ?
  AND queue_id = ?
`

export default (mysql) => ({ agentId, queueId, penalty }) => execute(mysql, MEMBERSHIP_UPDATE_PENALTY, [penalty, agentId, queueId])
