const execute = require('../lib/execute')
const toDate = require('../lib/toDate')

const CALL_INSERT = `INSERT INTO calls
  (id, created_at, caller_number, caller_info, direction, initial_position, queue_id, status, trunking_id, agent_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    answer_at = null,
    agent_offers = 0,
    caller_info = VALUES(caller_info),
    hold_secs = 0,
    talk_secs = 0,
    ring_secs = 0,
    initial_position = VALUES(initial_position),
    transferred_to = null,
    status = VALUES(status),
    queue_id = values(queue_id),
    agent_id = null`

module.exports = (mysql) => (call) => execute(mysql, CALL_INSERT, [
  call.id,
  toDate(call.createdAt),
  call.callerNumber,
  call.callerInfo,
  call.direction.toUpperCase(),
  call.initialPosition,
  call.queueId,
  call.status,
  call.trunkingId,
  call.agentId
])
