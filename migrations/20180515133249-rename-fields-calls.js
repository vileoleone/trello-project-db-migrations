const callsTable = 'calls'

exports.up = async (db) => {
  await db.renameColumn(callsTable, 'status', 'last_event')
  await db.renameColumn(callsTable, 'queue', 'last_queue')
}

exports.down = async (db) => {
  await db.renameColumn(callsTable, 'last_event', 'status')
  await db.renameColumn(callsTable, 'last_queue', 'queue')
}
