import execute from '../lib/execute'

const MEMBERSHIP_UPDATE_STATUS = `
  UPDATE memberships
  SET status = ?
  WHERE agent_id = ?
  AND queue_id = ?
`

export default (mysql) => ({ agentId, queueId, status }) => execute(mysql, MEMBERSHIP_UPDATE_STATUS, [status, agentId, queueId])
