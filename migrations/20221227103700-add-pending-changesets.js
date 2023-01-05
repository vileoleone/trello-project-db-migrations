
exports.up = async (db) => (
  db.addColumn('pending_settings', 'object_pending', { notNull: true, type: 'TINYINT', defaultValue: 0, length: 1, defaultValue: true })
)

exports.down = async (db) => (
  db.removeColumn('pending_settings', 'object_pending')
)
