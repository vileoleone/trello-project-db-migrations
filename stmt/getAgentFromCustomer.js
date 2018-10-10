const execute = require('../lib/execute')

module.exports = async (db, dbName, agentId) => {
  const sql = `
  SELECT *
  FROM ${dbName}.agents
  WHERE agents.id = ?
  `

  const result = await execute(db, sql, [agentId])
  const rawAgent = result[0]
  return {
    registration: rawAgent.id,
    name: rawAgent.name,
    password: rawAgent.password,
    queue: rawAgent.default_queue_id,
    loginExtension: rawAgent.login_extension,
    loginAt: toTimestampSecs(rawAgent.login_at),
    pauseAt: toTimestampSecs(rawAgent.pause_at),
    logoutAt: toTimestampSecs(rawAgent.logout_at),
    talkingSince: rawAgent.talking_since,
    talkingCallId: rawAgent.talking_call_id,
    lastCallAnsweredAt: toTimestampSecs(rawAgent.last_call_answered_at),
    lastCallRejectedAt: toTimestampSecs(rawAgent.last_call_rejected_at),
    lastPauseAt: toTimestampSecs(rawAgent.last_pause_at),
    status: rawAgent.status,
    pauseReasonId: rawAgent.pause_reason_id,
    active: (rawAgent.active === 1)
  }
}

const toTimestampSecs = (date) => date ? Math.floor(date.getTime() / 1000) : null
