const callHistoryTable = 'call_history'

exports.up = (db) => (
  db.renameColumn(callHistoryTable, 'status', 'event')
)

exports.down = (db) => (
  db.renameColumn(callHistoryTable, 'event', 'status')
)
