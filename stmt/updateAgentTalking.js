import execute from '../lib/execute'
import timestampSecsToDate from '../lib/timestampSecsToDate'

const AGENT_UPDATE_TALKING = `UPDATE agents SET status = ?, talking_call_id = ?, talking_since = ? where id = ?`

export default (mysql) => (agent) => execute(mysql, AGENT_UPDATE_TALKING, [
  agent.status,
  agent.talkingCallId,
  timestampSecsToDate(agent.talkingSince),
  agent.id
])
