exports.up = (db) => (
  db.runSql('UPDATE queue_properties SET value = ? WHERE name = ? AND queue_id IS NULL', ['wav49', 'monitor-format'])
)
