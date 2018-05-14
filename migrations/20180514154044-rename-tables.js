
exports.up = async (db) => {
  await db.renameTable('calls_history', 'call_history')
  await db.renameTable('agents_history', 'agent_history')
}

exports.down = async (db) => {
  await db.renameTable('call_history', 'calls_history')
  await db.renameTable('agent_history', 'agents_history')
}
